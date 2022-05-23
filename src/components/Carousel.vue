<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue';

import { useAppColor } from '@/stores/app.js';
import { debounce } from '@/utilities/delay.js';

const appColorStore = useAppColor();
const emits = defineEmits([ 'rotate' ]);
const props = defineProps(
  {
    overlay: {
      type: Boolean,
      default: false
    },
    overrideIndex: {
      type: Number,
      default: undefined
    },
    rotate: {
      type: Boolean,
      default: false
    },
    rotationTime: {
      type: Number,
      default: 8000
    }
  }
);
const navigationHovered = inject('navigationHovered');

const root = ref();
const images = ref();

const activeImageIndex = ref(0);
const corkInlineSize = ref(0);
const hovered = ref(false);
const inlineSize = ref(0);
const mouseX = ref(0);
const preventScrollDebounce = ref(false);
const rotation = ref(false);

const imageElements = computed(() => images.value?.querySelectorAll(':scope > :not(:last-child)') ?? []);

const rootResizeObserver = new ResizeObserver(entries => inlineSize.value = entries[0].contentBoxSize.inlineSize ?? entries[0].contentBoxSize[0].inlineSize);

let rotationStandby = false;
let rotationTimeout = null;

const clearRotationTimeout = () => {
  rotation.value = false;
  rotationStandby = false;

  clearTimeout(rotationTimeout);
  rotationTimeout = false;
};

const mouseover = event => {
  if(root.value)
    mouseX.value = event.clientX - root.value.offsetLeft;
};

const nextImage = () => {
  rotation.value = false;
  rotationStandby = false;
  preventScrollDebounce.value = true;

  if(activeImageIndex.value >= imageElements.value.length - 1)
    return void (activeImageIndex.value = 0);

  activeImageIndex.value++;
};

const previousImage = () => {
  rotation.value = false;
  rotationStandby = false;
  preventScrollDebounce.value = true;

  if(activeImageIndex.value <= 0)
    return void (activeImageIndex.value = imageElements.value.length - 1);

  activeImageIndex.value--;
};

const scroll = debounce(
  () => {
    if(preventScrollDebounce.value)
      return void (preventScrollDebounce.value = false);

    for(let index in imageElements.value) {
      const value = imageElements.value[index];

      index = Number(index);

      if(Math.abs(images.value.scrollLeft - value.offsetLeft) <= 0.5 * value.offsetWidth) {
        if(activeImageIndex.value != index)
          activeImageIndex.value = index;
          
        clearRotationTimeout();
        setRotationTimeout();

        break;
      }
    }
  },
  50
);

const setRotationTimeout = (duration = props.rotationTime + 50) => {
  if(typeof props.overrideIndex == 'number')
    return;

  rotationTimeout = setTimeout(
    () => {
      rotation.value = true;
      rotationTimeout = null;
    },
    duration
  );
}

watch(
  activeImageIndex,
  (value, oldValue) => {
    if(value != oldValue) {
      emits('rotate', { index: value, target:  imageElements.value[value] });
      images.value?.scrollTo({ behavior: 'smooth', left: imageElements.value[value]?.offsetLeft ?? 0 });
    }
  }
);

watch(
  hovered,
  value => {
    if(!value && rotationStandby) {
      clearRotationTimeout();
      setRotationTimeout(1000);
    }
  }
);

watch(
  [ hovered, rotation, () => props.rotate ],
  ([ hoveredValue, rotationValue, rotateValue ]) => {
    if(hoveredValue) {
      rotation.value = false;
      rotationStandby = true;
      return;
    }

    if(rotationValue && rotateValue) {
      rotation.value = false;
      nextImage();
    }
  }
);

watch(
  () => props.overrideIndex,
  value => {
    if(typeof value == 'number') {
      clearRotationTimeout();

      if(value >= 0 && value < imageElements.value.length)
        activeImageIndex.value = value;
    }
  }
);

onMounted(
  () => {
    rootResizeObserver.observe(root.value);

    setRotationTimeout();

    setTimeout(
      () => {
        console.log(inlineSize.value, imageElements.value[imageElements.value.length - 1].offsetWidth);
        corkInlineSize.value = inlineSize.value > imageElements.value[imageElements.value.length - 1].offsetWidth ? (inlineSize.value - imageElements.value[imageElements.value.length - 1].offsetWidth) : 0;
      },
      50
    );
  }
);
</script>

<template>
<div
  data-component="Carousel"
  ref="root"
  :style="{
    '--Carousel-background-color': appColorStore.background,
    '--Carousel-inline-size': `${inlineSize}px`,
    '--Carousel-text-color': appColorStore.text
  }"
  @mousemove="mouseover"
  @mouseleave="hovered = false;"
  @mouseover="hovered = true;"
>
  <div class="overlay" :data-active="navigationHovered || undefined" v-if="overlay"></div>
  <div
    class="images"
    ref="images"
    @scroll="
      clearRotationTimeout();
      scroll();
    "
    @wheel="
      preventScrollDebounce = false;
    "
    @touchmove="
      preventScrollDebounce = false;
    "
  >
    <slot></slot>

    <div class="images__cork" :style="{ 'inline-size': `${corkInlineSize}px` }"></div>
  </div>

  <div class="controls">
    <button
      class="controls__button"
      data-left
      :data-hidden="(!hovered || mouseX >= root.offsetWidth / 2) || undefined"
      @click="previousImage"
    >
      <span class="feather" :class="`feather-chevron-${activeImageIndex == 0 ? 'right' : 'left'}`"></span>
    </button>

    <button
      class="controls__button"
      :data-hidden="(!hovered || mouseX < root.offsetWidth / 2) || undefined"
      data-right
      @click="nextImage"
    >
      <span class="feather" :class="`feather-chevron-${activeImageIndex == imageElements.length - 1 ? 'left' : 'right'}`"></span>
    </button>
  </div>
</div>
</template>

<style lang="scss" scoped>
[data-component="Carousel"] {
  block-size: 100%;
  inline-size: 100%;

  .controls {
    block-size: 100%;
    inline-size: 100%;
    inset-block-start: 0;
    inset-inline-start: 0;
    pointer-events: none;
    position: absolute;
    z-index: 3;

    & > * {
      pointer-events: auto;
    }
  }

  .controls__button {
    background-color: hsl(var(--Carousel-text-color));
    border: none;
    border-radius: 0;
    color: hsl(var(--Carousel-background-color));
    cursor: pointer;
    font-size: 2em;
    inset-block-start: calc(50% - 0.75em);
    padding-block: 0.25em;
    padding-inline: 0.35em;
    position: absolute;
    transition-property: opacity;

    &[data-left] {
      inset-inline-start: 0.75em;
    }

    &[data-right] {
      inset-inline-end: 0.75em;
    }

    &[data-hidden] {
      opacity: 0;
    }
  }

  .overlay {
    block-size: 100%;
    background-color: hsl(var(--Carousel-background-color));
    inline-size: 100%;
    inset-block-start: 0;
    inset-inline-start: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition-property: opacity;
    z-index: 2;

    &[data-active] {
      opacity: 0.5;
    }
  }

  .images {
    block-size: 100%;
    inline-size: 100%;
    overflow: auto hidden;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    z-index: 1;
    white-space: nowrap;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .images__cork {
    block-size: 0;
  }
}
</style>

<style lang="scss">
[data-component="Carousel"] {
  .images {
    & > * {
      display: inline-block;
      block-size: 100%;
      scroll-snap-align: start;
    }

    & > .home-image {
      align-items: flex-end;
      cursor: pointer;
      display: inline-flex;
      inline-size: var(--Carousel-inline-size);
      justify-content: flex-start;
      padding: 0;

      .home-image__background {
        block-size: 100%;
        inline-size: 100%;
        inset-block-start: 0;
        inset-inline-start: 0;
        object-fit: cover;
        object-position: center;
        position: absolute;
        z-index: 1;
      }

      .home-image__text {
        background-color: hsl(var(--Carousel-text-color));
        color: hsl(var(--Carousel-background-color));
        font-size: 1.25em;
        padding: 0.75em;
      }

      .home-image__text__group {
        color: hsl(var(--Carousel-background-color) / 0.5);
        font-weight: 300;
      }

      .home-image__text__detail {
        font-weight: 300;
      }
    }

    & > .preview-image {
      inline-size: auto;
      max-inline-size: var(--Carousel-inline-size);

      &:not(:first-child) {
        margin-inline-start: 1.5em;
      }

      .preview-image__background {
        block-size: 100%;
        inline-size: auto;
      }

      .preview-image__content {
        position: absolute;
      }
    }
  }
}
</style>
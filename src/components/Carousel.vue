<script setup>
import { computed, onActivated, onMounted, reactive, ref, watch } from 'vue';
import { debounce, throttle, tick } from '../utilities/timing.js';

const emits = defineEmits([ 'rotate' ]);
const props = defineProps(
  {
    autoRotate: {
      type: Boolean,
      default: false
    },
    autoRotationTime: {
      type: Number,
      default: 5000
    },
    columns: {
      type: Boolean,
      default: false
    },
    cork: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    }
  }
);

const preview = ref();
const root = ref();
const scroller = ref();
const scrollerCork = ref();

const autoRotationEngage = ref(false);
const autoRotationOverride = ref(false);
const activeItemIndex = ref(-1);
const controlsDisabled = ref(false);
const items = reactive([]);
const nextButtonFocused = ref(false);
const nextButtonHovered = ref(false);
const preventIndexDetection = ref(false);
const previewCorkSize = ref(0);
const previewHovered = ref(false);
const previousButtonFocused = ref(false);
const previousButtonHovered = ref(false);
const scrollerBlockSize = ref(0);
const scrollerCorkSize = ref(0);
const scrollerInlineSize = ref(0);
const scrollerHovered = ref(false);
const scrollerMousePositionX = ref(0);
const thumbnails = reactive([]);

const previewResizeObserver = new ResizeObserver(
  entries => {
    const lastThumbnailRect = thumbnails[thumbnails.length - 1]?.getBoundingClientRect();

    if(!lastThumbnailRect)
      return;

    const targetRect = entries[0].target.getBoundingClientRect();
    const inset = props.columns ? 'top' : 'left';
    const size = props.columns ? 'height' : 'width';
    const lastThumbnailReachedRect = [ ...thumbnails ].find(
      thumbnail => {
        const rect = thumbnail.getBoundingClientRect();

        return rect[inset] >= lastThumbnailRect[inset] + lastThumbnailRect[size] - targetRect[size] - 1;
      }
    ).getBoundingClientRect();

    previewCorkSize.value = lastThumbnailReachedRect[inset] - (lastThumbnailRect[inset] + lastThumbnailRect[size] - targetRect[size]);
  }
);
const scrollerResizeObserver = new ResizeObserver(
  entries => {
    const targetRect = entries[0].target.getBoundingClientRect();
    const lastItemRect = items[items.length - 1]?.getBoundingClientRect();

    scrollerBlockSize.value = targetRect.height;
    scrollerInlineSize.value = targetRect.width;

    if(!lastItemRect)
      return;

    if(props.cork)
      scrollerCorkSize.value = targetRect.width - lastItemRect.width;
    else {
      const lastItemReachedRect = [ ...items ].find(
        item => {
          const rect = item.getBoundingClientRect();

          return rect.left >= lastItemRect.left + lastItemRect.width - targetRect.width - 1;
        }
      ).getBoundingClientRect();

      scrollerCorkSize.value = lastItemReachedRect.left - (lastItemRect.left + lastItemRect.width - targetRect.width);
    }
  }
);

const nextItem = () => {
  if(!items.length)
    return;

  preventIndexDetection.value = true;

  if(activeItemIndex.value == items.length - 1)
    return void (activeItemIndex.value = 0);

  if(!props.cork) {
    const itemRect = items[activeItemIndex.value + 1].getBoundingClientRect();
    const scrollerRect = scroller.value.getBoundingClientRect();
    const scrollerCorkRect = scrollerCork.value.getBoundingClientRect();

    if(itemRect.left > scrollerCorkRect.right - scrollerRect.width)
      return void (activeItemIndex.value = 0);

    if(itemRect.left >= scrollerCorkRect.right - scrollerRect.width && itemRect.right <= scrollerCorkRect.right - scrollerRect.width)
      return void (activeItemIndex.value = items.length - 1);
  }

  return void activeItemIndex.value++;
};

const previousItem = () => {
  if(!items.length)
    return;
  
  preventIndexDetection.value = true;

  if(activeItemIndex.value == 0)
    return void (activeItemIndex.value = items.length - 1);

  if(!props.cork && activeItemIndex.value == items.length - 1) {
    const scrollerRect = scroller.value.getBoundingClientRect();
    const scrollerCorkRect = scrollerCork.value.getBoundingClientRect();
    const searchIndex = [ ...items.entries() ].reverse().find(
      entry => {
        const rect = entry[1].getBoundingClientRect();

        return rect.left < scrollerCorkRect.right - scrollerRect.width;
      }
    )?.[0];
    
    return void (activeItemIndex.value = searchIndex ?? 0);
  }

  return void activeItemIndex.value--;
};

const rotate = () => {
  autoRotationEngage.value = false;

  if(props.autoRotate && !(nextButtonFocused.value || nextButtonHovered.value || previewHovered.value || previousButtonFocused.value || previousButtonHovered.value || scrollerHovered.value))
    nextItem();
};

const rotateLong = debounce(
  () => {
    autoRotationOverride.value = false;
    rotate();
  },
  props.autoRotationTime
);

const rotateShort = debounce(
  () => {
    if(!(autoRotationOverride.value || autoRotationEngage.value))
      rotate();
  }
  ,
  props.autoRotationTime / 5
);

const nextButton_onblur = () => nextButtonFocused.value = false;

const nextButton_onclick = () => nextItem();

const nextButton_onfocus = () => nextButtonFocused.value = false;

const nextButton_onmouseleave = () => nextButtonHovered.value = false;

const nextButton_onmouseover = () => nextButtonHovered.value = true;

const preview_onclick = event => {
  if(event.target.parentElement == preview.value) {
    const index = [ ...thumbnails ].findIndex(thumbnail => thumbnail == event.target);

    if(index >= 0)
      activeItemIndex.value = index;
  }
};

const preview_onmouseleave = () => previewHovered.value = false;

const preview_onmouseover = () => previewHovered.value = true;

const previousButton_onblur = () => previousButtonFocused.value = false;

const previousButton_onclick = () => previousItem();

const previousButton_onfocus = () => previousButtonFocused.value = false;

const previousButton_onmouseleave = () => previousButtonHovered.value = false;

const previousButton_onmouseover = () => previousButtonHovered.value = true;

const scroller_onmouseleave = () => scrollerHovered.value = false;

const scroller_onmousemove = throttle(event => scrollerMousePositionX.value = event.clientX - scroller.value.getBoundingClientRect().left, 50);

const scroller_onmouseover = () => scrollerHovered.value = true;

const scroller_onscroll = debounce(
  () => {
    if(props.autoRotate) {
      autoRotationEngage.value = true;
      rotateLong();
    }

    if(preventIndexDetection.value) {
      preventIndexDetection.value = false;
      return;
    }

    if(scrollerCork.value.getBoundingClientRect().right == scroller.value.getBoundingClientRect().right)
      return void (activeItemIndex.value = items.length - 1);

    for(const index in [ ...items ]) {
      const item = items[index];

      if(Math.abs(item.getBoundingClientRect().left - scroller.value.getBoundingClientRect().left) <= 1) {
        const indexAsNumber = Number(index);

        if(!props.cork) {
          const itemRect = items[indexAsNumber].getBoundingClientRect();
          const scrollerRect = scroller.value.getBoundingClientRect();
          const scrollerCorkRect = scrollerCork.value.getBoundingClientRect();

          if(Math.abs(scrollerCorkRect.right - itemRect.left) <= scrollerRect.width + 1)
            activeItemIndex.value = items.length - 1;
          else
            activeItemIndex.value = indexAsNumber;
        }
        else
          activeItemIndex.value = indexAsNumber;

        autoRotationOverride.value = true;
        break;
      }
    }
  },
  100
);

const scroller_ontouch = () => preventIndexDetection.value = false;

const scroller_onwheel = () => preventIndexDetection.value = false;

watch(
  items,
  current => {
    if(activeItemIndex.value < 0) {
      activeItemIndex.value = 0;
    } else if(activeItemIndex.value >= items.length) {
      activeItemIndex.value = items.length - 1;
    }

    if(current.length && activeItemIndex >= 0) {
      emits('rotate', { index: activeItemIndex.value, target: current[activeItemIndex.value] });
    }
  },
  { deep: true }
)

watch(
  activeItemIndex,
  (current, previous) => {
    if(!items[current]) {
      activeItemIndex.value = -1;
      return;
    }

    if(current != previous) {
      emits('rotate', { index: current, target: items[current] });
      scroller.value.scrollTo(
        {
          behavior: 'smooth',
          left: (items[current]?.getBoundingClientRect().left - items[0]?.getBoundingClientRect().left) ?? 0
        }
      );

      if(!preview.value)
        return;

      const inset = props.columns ? 'top' : 'left';

      thumbnails[previous]?.removeAttribute('data-active');
      thumbnails[current]?.setAttribute('data-active', '');
      preview.value.scrollTo(
        {
          behavior: 'smooth',
          [inset]: (thumbnails[current]?.getBoundingClientRect()[inset] - thumbnails[0]?.getBoundingClientRect()[inset]) ?? 0
        }
      );
    }
  }
);

watch(
  [ items, () => props.cork ],
  ([itemsCurrent, corkCurrent]) => {
    if(!scroller.value)
      return;

    requestAnimationFrame(
      () => {
        const scrollerRect = scroller.value.getBoundingClientRect();
        const lastItemRect = itemsCurrent[itemsCurrent.length - 1]?.getBoundingClientRect();

        if(!lastItemRect)
          return;

        {
          const firstItemRect = itemsCurrent[0].getBoundingClientRect();

          controlsDisabled.value = firstItemRect.left >= scrollerRect.left - 1 && lastItemRect.right <= scrollerRect.right + 1;
        }

        if(corkCurrent)
          scrollerCorkSize.value = scrollerRect.width - lastItemRect.width;
        else {
          const lastItemReachedRect = [ ...itemsCurrent ].find(
            item => {
              const rect = item.getBoundingClientRect();

              return rect.left >= lastItemRect.left + lastItemRect.width - scrollerRect.width - 1;
            }
          ).getBoundingClientRect();

          scrollerCorkSize.value = lastItemReachedRect.left - (lastItemRect.left + lastItemRect.width - scrollerRect.width);
        }
      }
    );
  },
  { deep: true }
);

watch(
  thumbnails,
  current => {
    if(!preview.value)
      return;

    requestAnimationFrame(
      () => {
        const previewRect = preview.value.getBoundingClientRect();
        const lastThumbnailRect = current[current.length - 1]?.getBoundingClientRect();

        if(!lastThumbnailRect)
          return;

        const inset = props.columns ? 'top' : 'left';
        const size = props.columns ? 'height' : 'width';
        const lastThumbnailReachedRect = [ ...current ].find(
          thumbnail => {
            const rect = thumbnail.getBoundingClientRect();

            return rect[inset] >= lastThumbnailRect[inset] + lastThumbnailRect[size] - previewRect[size] - 1;
          }
        )?.getBoundingClientRect();

        previewCorkSize.value = lastThumbnailReachedRect[inset] - (lastThumbnailRect[inset] + lastThumbnailRect[size] - previewRect[size]);
      }
    );
  },
  { deep: true }
);

watch(
  [
    nextButtonFocused,
    nextButtonHovered,
    previewHovered,
    previousButtonFocused,
    previousButtonHovered,
    scrollerHovered
  ],
  () => {
    if(autoRotationOverride.value)
      return rotateLong();

    rotateShort();
  }
);

onMounted(
  () => {
    activeItemIndex.value = 0;
    scrollerResizeObserver.observe(scroller.value);

    if(preview.value) {
      previewResizeObserver.observe(preview.value);
    }

    if(props.autoRotate) {
      autoRotationEngage.value = true;
      rotateLong();
    }
  }
);

tick(
  () => {
    items.splice(0, items.length, ...(scroller.value?.querySelectorAll(':scope > :not(:last-child)') ?? []));
    thumbnails.splice(0, thumbnails.length, ...(preview.value?.querySelectorAll(':scope > :not(:last-child)') ?? []));
  },
  100
)();
</script>

<template>
<div
  data-component="Carousel"
  :data-columns="props.columns || undefined"
  :data-next-button-focused="nextButtonFocused || undefined"
  :data-next-button-hovered="nextButtonHovered || undefined"
  :data-next-button-visible="nextButtonHovered || nextButtonFocused || scrollerMousePositionX >= (scroller?.getBoundingClientRect().width ?? 0) / 2 && scrollerHovered || undefined"
  :data-preview="props.preview || undefined"
  :data-preview-hovered="previewHovered || undefined"
  :data-previous-button-focused="previousButtonFocused || undefined"
  :data-previous-button-hovered="previousButtonHovered || undefined"
  :data-previous-button-visible="previousButtonHovered || previousButtonFocused || scrollerMousePositionX < (scroller?.getBoundingClientRect().width ?? 0) / 2 && scrollerHovered || undefined"
  :data-scroller-hovered="scrollerHovered || undefined"
  ref="root"
  :style="{
    '--Carousel-preview-cork-size': `${previewCorkSize}px`,
    '--Carousel-scroller-cork-size': `${scrollerCorkSize}px`,
  }"
>
  <div class="controls" v-if="!controlsDisabled">
    <button
      class="controls__button controls__button--previous"
      @blur="previousButton_onblur"
      @click="previousButton_onclick"
      @focus="previousButton_onfocus"
      @mouseleave="previousButton_onmouseleave"
      @mouseover="previousButton_onmouseover"
    >
      <span class="feather" :class="`feather-chevron${activeItemIndex == 0 ? 's-right' : '-left'}`"></span>
    </button>

    <button
      class="controls__button controls__button--next"
      @blur="nextButton_onblur"
      @click="nextButton_onclick"
      @focus="nextButton_onfocus"
      @mouseleave="nextButton_onmouseleave"
      @mouseover="nextButton_onmouseover"
    >
      <span class="feather" :class="`feather-chevron${activeItemIndex == items.length - 1 ? 's-left' : '-right' }`"></span>
    </button>
  </div>

  <div
    class="scroller"
    ref="scroller"
    @mouseleave="scroller_onmouseleave"
    @mousemove="scroller_onmousemove"
    @mouseover="scroller_onmouseover"
    @scroll="scroller_onscroll"
    @touch="scroller_ontouch"
    @wheel="scroller_onwheel"
  >
    <slot/>

    <div class="scroller__cork" ref="scrollerCork"></div>
  </div>

  <div
    class="preview"
    ref="preview"
    @click="preview_onclick"
    @mouseleave="preview_onmouseleave"
    @mouseover="preview_onmouseover"
    v-if="props.preview"
  >
    <slot name="preview"/>

    <div class="preview__cork"></div>
  </div>
</div>
</template>

<style lang="scss">
[data-component="Carousel"] {
  & > .preview,
  & > .scroller {
    & > * {
      display: inline-block;
      scroll-snap-align: start;
    }
  }

  & > .preview {
    & > * {
      block-size: 100%;
      inline-size: auto;
      max-inline-size: 100%;
      transition-property: outline;

      &:not(:last-child, :nth-last-child(2)) {
        margin-inline-end: 1em;
      }

      &[data-active] {
        outline-color: currentColor;
        outline-offset: -0.2em;
        outline-style: solid;
        outline-width: 0.2em;
      }
    }
  }

  &[data-columns] {
    & > .preview {
      & > * {
        block-size: auto;
        inline-size: 100%;
        margin-inline-end: 0;
        max-block-size: 100%;
        max-inline-size: auto;
        
        &:not(:last-child, :nth-last-child(2)) {
          margin-block-end: 1em;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
[data-component="Carousel"] {
  block-size: 100%;
  display: grid;
  grid-template-columns: [ main-start ] 100% [ main-end ];
  grid-template-rows: [ controls-start scroller-start ] 100% [controls-end scroller-end];
  inline-size: 100%;

  & > .controls {
    align-items: center;
    display: flex;
    grid-area: controls / main;
    inline-size: 100%;
    justify-content: space-between;
    pointer-events: none;
    z-index: 1;

    & > * {
      pointer-events: initial;
    }

    & > .controls__button {
      background-color: var(--_controls-background-color, hsl(var(--theme-color-text)));
      border: none;
      border-radius: 0;
      color: var(--_controls-color, hsl(var(--theme-color-background)));
      cursor: pointer;
      font-size: medium;
      opacity: 0;
      padding-block: 0.65em;
      padding-inline: 0.85em;
      transition-property: background-color, color, opacity;

      &:hover {
        background-color: var(--_hover--controls-background-color, var(--_controls-color, hsl(var(--theme-color-background))));
        color: var(--_hover--controls-color, var(--_controls-background-color, hsl(var(--theme-color-text))));
      }

      &.controls__button--previous {
        margin-inline-start: 1.5em;
      }

      &.controls__button--next {
        margin-inline-end: 1.5em;
      }
    }
  }

  & > .scroller {
    grid-area: scroller / main;
    overflow: auto hidden;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > .scroller__cork {
      block-size: 1px;
      inline-size: var(--Carousel-scroller-cork-size);
    }
  }

  & > .preview {
    block-size: 100%;
    grid-area: preview / main;
    inline-size: var(--Carousel-scroller-inline-size);
    overflow: auto hidden;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > .preview__cork {
      block-size: 1px;
      inline-size: var(--Carousel-preview-cork-size);
    }
  }

  &[data-next-button-visible] {
    & > .controls {
      & > .controls__button--next {
        opacity: 1;
      }
    }
  }

  &[data-previous-button-visible] {
    & > .controls {
      & > .controls__button--previous {
        opacity: 1;
      }
    }
  }

  &[data-preview] {
    grid-template-rows: [controls-start scroller-start] auto [controls-end scroller-end] 1em [preview-start] 7.5em [preview-end];
  }

  &[data-columns] {
    grid-template-columns: [ controls-start scroller-start ] auto [ controls-end scroller-end ];
    grid-template-rows: [ main-start ] 1fr [main-end];

    & > .controls {
      grid-area: main / scroller;
    }

    & > .scroller {
      grid-area: main / scroller;
    }

    & > .preview {
      block-size: var(--Carousel-scroller-block-size);
      grid-area: main / preview;
      inline-size: 100%;
      white-space: normal;
      overflow: hidden auto;
      scroll-snap-type: y mandatory;

      & > .preview__cork {
        block-size: var(--Carousel-preview-cork-size);
        inline-size: 1px;
      }
    }

    &[data-preview] {
      grid-template-columns: [preview-start] 7.5em [preview-end] 1em [scroller-start] auto [scroller-end];
    }
  }
}
</style>

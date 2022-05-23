<script>
export default { inheritAttrs: false };
</script>

<script setup>
import { computed, onMounted, reactive, ref, useAttrs } from 'vue';
import { RouterLink, useLink } from 'vue-router';

import RectObserver from '../polyfill/rect-observer.js';

import NavigationLink from './NavigationLink.vue';

let emit = defineEmits([ 'navigate' ]);
let props = defineProps(
  {
    ...RouterLink.props,
    backgroundColor: {
      type: String,
      default: 'hsl(var(--theme-color-background))'
    },
    menu: {
      type: Array,
      default: []
    },
    mobile: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: 'hsl(var(--theme-color-text))'
    },
  }
);
let attrs = useAttrs();
let { navigate, href, isActive, isExactActive } = useLink(props);

let handle = ref();
let position = reactive(
  {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
);
let opened = ref(false);
let hovered = ref(false);

let external = computed(() => typeof props.to == 'string' && props.to.startsWith('http'));

let handleRectObserver = new RectObserver(
  entries => {
    position.left = entries[0].rect.left;
    position.right = entries[0].rect.right;
    position.top = entries[0].rect.top;
    position.bottom = entries[0].rect.bottom;
  }
);
let closeTimeoutId = null;

const close = () => {
  closeTimeoutId = setTimeout(
    () => {
      closeTimeoutId = null;
      opened.value = false;
    },
    200
  );
};

const navigateLink = (event) => {
  if(external.value)
    return;

  event.preventDefault();
  emit('navigate');
  navigate();
};

const open = () => {
  clearTimeout(closeTimeoutId);
  closeTimeoutId = null;
  opened.value = true;
};

onMounted(
  () => {
    if(isActive.value)
      emit('navigate');

    handleRectObserver.observe(handle.value);
  }
);
</script>

<template>
<a
  data-component="NavigationLinkGroup"
  :data-active="isActive || undefined"
  :data-exact-active="isExactActive || undefined"
  :data-hovered="hovered || undefined"
  :data-opened="opened || undefined"
  :href="href"
  ref="handle"
  :style="{
    '--NavigationLinkGroup-background-color': props.backgroundColor,
    '--NavigationLinkGroup-text-color': props.textColor
  }"
  :target="external ? '__blank' : undefined"
  @click="navigateLink"
  @mouseover="
    hovered = true;
    open();
  "
  @mouseleave="
    hovered = false;
    close();
  "
  v-bind="attrs"
>
  <slot/>

  <Teleport to="body">
    <div
      data-component-teleport="NavigationLinkGroup"
      :data-opened="opened || undefined"
      :style="{
        '--NavigationLinkGroup-text-color': props.textColor,
        left: `calc(${position.left + (position.right - position.left) / 2}px - 7em)`,
        top: `calc(${position.bottom}px + 0.4em)`
      }"
      @mouseover="open();"
      @mouseleave="close();"
      v-if="!mobile"
    >
      <NavigationLink
        :text-color="props.backgroundColor"
        v-bind="item.props"
        v-for="item in props.menu"
      >
        <span :class="item.icon ? 'icon' : 'text'" v-html="item.icon ?? item.text"></span>
      </NavigationLink>
    </div>
  </Teleport>
</a>

<div class="menu" v-if="mobile">
  <NavigationLink
    :text-color="props.textColor"
    v-bind="item.props"
    v-for="item in props.menu"
  >
    <span :class="item.icon ? 'icon' : 'text'" v-html="item.icon ?? item.text"></span>
  </NavigationLink>
</div>
</template>

<style lang="scss" scoped>
[data-component="NavigationLinkGroup"] {
  align-items: center;
  color: var(--NavigationLinkGroup-text-color);
  display: inline-flex;
  padding: 0.5em;
  text-decoration: none;

  :slotted(.text) {
    &::before {
      border-block-start: 1px solid var(--NavigationLinkGroup-text-color);
      content: "";
      inline-size: 100%;
      inset-block-end: -4px;
      inset-inline-start: 0;
      position: absolute;
      opacity: 0;
      transition-property: opacity;
    }
  }

  :slotted(.icon) {
    aspect-ratio: 1 / 1;
    block-size: 1.25em;
    fill: var(--NavigationLinkGroup-text-color);
  }

  &[data-active],
  &[data-hovered] {
    :slotted(.text::before) {
      opacity: 1;
    }
  }

  & ~ .menu {
    align-items: baseline;
    color: var(--NavigationLinkGroup-text-color);
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    padding-block: 0.5em 1em;
    padding-inline: 1.5em 0.5em;
  }
}
</style>

<style lang="scss">
[data-component-teleport="NavigationLinkGroup"] {
  background-color: var(--NavigationLinkGroup-text-color);
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  max-inline-size: 14em;
  opacity: 0;
  padding-block: 1em;
  padding-inline: 0.75em;
  pointer-events: none;
  position: fixed;
  transition-property: opacity;
  z-index: 3000;

  &::before {
    border-block: 0.4em solid transparent;
    border-inline: 0.6em solid transparent;
    border-block-end-color: var(--NavigationLinkGroup-text-color);
    content: "";
    inset-block-end: calc(100% + 1px);
    inset-inline-start: calc(50% - 0.6em);
    position: absolute;
  }

  &[data-opened] {
    opacity: 1;
    pointer-events: initial;
  }
}
</style>

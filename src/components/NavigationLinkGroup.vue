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
    color: {
      type: String,
      default: 'hsl(var(--theme-color-text))'
    },
    menu: {
      type: Array,
      default: []
    }
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
  :data-active="active || undefined"
  :data-exact-active="isExactActive || undefined"
  :data-hovered="hovered || undefined"
  :data-opened="opened || undefined"
  :href="href"
  ref="handle"
  :style="{ '--NavigationLink-color': props.color }"
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
        left: `calc(${position.left + (position.right - position.left) / 2}px - 7em)`,
        top: `calc(${position.bottom}px + 0.4em)`
      }"
      @mouseover="open();"
      @mouseleave="close();"
    >
      <NavigationLink
        v-bind="item.props"
        v-for="item in props.menu"
      >
        <span :class="item.icon ? 'icon' : 'text'" v-html="item.icon ?? item.text"></span>
      </NavigationLink>
    </div>
  </Teleport>
</a>
</template>

<style lang="scss" scoped>
[data-component="NavigationLinkGroup"] {
  align-items: center;
  color: var(--NavigationLink-color);
  display: inline-flex;
  padding: 0.5em;
  text-decoration: none;

  :slotted(.text) {
    &::before {
      border-block-start: 1px solid var(--NavigationLink-color);
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
    fill: var(--NavigationLink-color);
  }

  &[data-active],
  &[data-hovered] {
    :slotted(.text::before) {
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
[data-component-teleport="NavigationLinkGroup"] {
  background-color: hsl(var(--theme-color-text));
  color: hsl(var(--theme-color-background));
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

  &::before {
    border-block: 0.4em solid transparent;
    border-inline: 0.6em solid transparent;
    border-block-end-color: hsl(var(--theme-color-text));
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

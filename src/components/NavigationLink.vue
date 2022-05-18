<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useLink } from 'vue-router';

let emit = defineEmits([ 'navigate' ]);
let props = defineProps(
  { 
    ...RouterLink.props,
    color: {
      type: String,
      default: 'hsl(var(--theme-color-text))'
    }
  }
);
let { navigate, href, isActive, isExactActive } = useLink(props);

let hovered = ref(false);

let external = computed(() => typeof props.to == 'string' && props.to.startsWith('http'));

const navigateLink = (event) => {
  if(external.value)
    return;

  event.preventDefault();
  emit('navigate');
  navigate();
}

onMounted(() => isActive && emit('navigate'));
</script>

<template>
<a
  data-component="NavigationLink"
  :data-active="isActive || undefined"
  :data-exact-active="isExactActive || undefined"
  :data-hovered="hovered || undefined"
  :href="href"
  :style="{ '--NavigationLink-color': props.color }"
  :target="external ? '__blank' : undefined"
  @click="navigateLink"
  @mouseover="hovered = true;"
  @mouseleave="hovered = false;"
>
  <slot/>
</a>
</template>

<style lang="scss" scoped>
[data-component="NavigationLink"] {
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

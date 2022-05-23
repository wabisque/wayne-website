<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import Carousel from '@/components/Carousel.vue';

const route = useRoute();

const current = ref(0);
</script>

<template>
<div data-view="Images">
  <Carousel
    @rotate="
      current = $event.index;
    "
    :override-index="current"
  >
    <img
      class="preview-image"
      :src="item"
      v-for="item in route.meta.payload"
    >
  </Carousel>
</div>
</template>

<style lang="scss" scoped>
[data-view="Images"] {
  block-size: 100%;
  grid-area: content-view / fullbleed;
  inline-size: 100%;
  overflow: hidden;
}
</style>

<script setup>
import { useRoute } from 'vue-router';

import { useAppColor } from '@/stores/app.js';

import Carousel from '@/components/Carousel.vue';
import NavigationLink from '@/components/NavigationLink.vue';

const appColorStore = useAppColor();

const route = useRoute();

const rotate = event => {
  appColorStore.$reset();

  if(event.target.dataset.appBackgroundColor)
    appColorStore.background = event.target.dataset.appBackgroundColor;

  if(event.target.dataset.appTextColor)
    appColorStore.text = event.target.dataset.appTextColor;
}
</script>

<template>
<div data-view="Home">
  <Carousel
    class="carousel"
    overlay
    rotate
    @rotate="rotate"
  >
    <NavigationLink
      class="home-image"
      :data-app-background-color="item.backgroundColor || undefined"
      :data-app-text-color="item.textColor || undefined"
      :to="item.to"
      v-for="item in route.meta.payload"
    >
      <img :alt="item.to.name" class="home-image__background" :src="item.src">

      <div class="home-image__text">
        <span class="home-image__text__group">{{ item.to.name.split('-')[0].toUpperCase() }} / </span>
        <span class="home-image__text__detail">{{ item.to.name.split('-')[1].toUpperCase() }}</span>
      </div>
    </NavigationLink>
  </Carousel>
</div>
</template>

<style lang="scss" scoped>
[data-view="Home"] {
  block-size: 100%;
  grid-area: fullbleed;
  inline-size: 100%;
  overflow: hidden;
}
</style>
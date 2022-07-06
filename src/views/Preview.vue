
<script setup>
import { inject } from 'vue';
import Carousel from '../components/Carousel.vue';
import { useApp } from '../stores/app';

const appStore = useApp();

const isMobileMode = inject('App_isMobileMode');

const image_onclick = image => {
  appStore.viewerImage = image;
  appStore.viewerActive = true;
};
</script>

<template>
<div class=":view--preview">
  <template v-if="isMobileMode">
    <img
      alt=""
      class="image"
      :src="image"
      v-for="image in $route.meta.images"
    >
  </template>

  <Carousel
    class="carousel"
    cork
    v-else
  >
    <img
      alt=""
      class="carousel__image"
      :src="image"
      @click="() => image_onclick(image)"
      v-for="image in $route.meta.images"
    >
  </Carousel>
</div>
</template>

<style lang="scss">
.\:view--preview {
  & > .carousel {
    & > .scroller {
      & > .carousel__image {
        block-size: 100%;
        cursor: pointer;
        inline-size: auto;
        max-inline-size: 100%;

        &:not(:first-of-type) {
          margin-inline-start: 0.75em;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.\:view--preview {
  grid-column: fullbleed;

  & > .image {
    inline-size: 100%;

    &:not(:first-of-type) {
      margin-block-start: 5em;
    }
  }

  & > .carousel {
    block-size: 100%;
    inline-size: 100%;
  }

  @media screen and (min-width: 770px) {
    grid-column: main;
  }
}
</style>

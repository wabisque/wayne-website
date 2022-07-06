
<script setup>
import { inject } from 'vue';
import { useApp } from '../stores/app';
import Carousel from '../components/Carousel.vue';

const appStore = useApp();

const isMobileMode = inject('App_isMobileMode');
const navigationHovered = inject('App_navigationHovered');

const carousel_onrotate = event => {
  appStore.description = event.target.dataset.description;
  appStore.colors.background = event.target.dataset.background;
  appStore.colors.text = event.target.dataset.text;
};
</script>

<template>
<div
  class=":view--home"
  :style="{
    '--background-color': appStore.colors.background
  }"
>
  <div
    class="shadow"
    :class="{
      ':active': navigationHovered && !isMobileMode
    }"
  ></div>

  <Carousel
    auto-rotate
    class="carousel"
    @rotate="carousel_onrotate"
  >
    <RouterLink
      class="carousel__item"
      :data-background="image.background"
      :data-description="image.description"
      :data-text="image.text"
      :to="image.to ?? $route"
      v-for="image in $route.meta.images"
    >
      <img
        class="carousel__item__image"
        loading="lazy"
        :src="image.src"
      >
    </RouterLink>
  </Carousel>
</div>
</template>

<style lang="scss">
.\:view--home {
  & > .carousel {
    & > .controls {
      @media screen and (min-width: 770px) {
        margin-inline: auto;
        max-inline-size: min(160ch, 90%);
      }
    }

    & > .scroller {
      & > .carousel__item {
        block-size: 100%;
        inline-size: 100%;

        & > .carousel__item__image {
          block-size: 100%;
          inline-size: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.\:view--home {
  block-size: 100vh;
  display: grid;
  grid-template-columns: [fullbleed-start] 100% [fullbleed-end];
  grid-template-rows: [fullbleed-start] 100% [fullbleed-end];
  grid-area: fullbleed;

  & > .shadow {
    background-color: hsl(var(--background-color));
    grid-area: fullbleed;
    opacity: 0;
    pointer-events: none;
    transition-property: background-color, opacity;
    z-index: 1;

    &.\:active {
      opacity: 0.35;
    }
  }

  & > .carousel {
    grid-area: fullbleed;
  }
}
</style>

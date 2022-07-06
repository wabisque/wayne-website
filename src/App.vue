<script setup>
import { computed, provide, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import Carousel from './components/Carousel.vue';
import { useApp } from './stores/app';

const route = useRoute();
const appStore = useApp();

const asideOpened = ref(false);
const navigationHovered = ref(false);
const screenWidth = ref(innerWidth);

const fitScreen = computed(() => [ ...route.matched ].reverse().find(match => 'fitScreen' in match.meta)?.meta.fitScreen === true);
const isMobileMode = computed(() => screenWidth.value < 770);

const link_onclick = () => asideOpened.value = false;

const viewCloseButton_onclick = () => appStore.viewerActive = false;

provide('App_isMobileMode', isMobileMode);
provide('App_navigationHovered', navigationHovered);

watch(
  route,
  () => {
    appStore.$reset();
    asideOpened.value = false;
  },
);

watch([ fitScreen, isMobileMode ], ([ currentFitScreen, currentIsMobileMode ]) => document.getElementById('app').classList.toggle(':fit-screen', currentFitScreen && !currentIsMobileMode));

watch(isMobileMode, () => asideOpened.value = false);

addEventListener('resize', () => screenWidth.value = innerWidth);
</script>

<template>
<svg style="display: none;">
  <symbol id="svg-symbols--facebook" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </symbol>

  <symbol id="svg-symbols--instagram" viewBox="0 0 24 24">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </symbol>

  <symbol id="svg-symbols--twitter" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </symbol>
</svg>


<div
  class="overlay"
  :style="{
    '--specified-background-color': appStore.colors.background,
    '--specified-text-color': appStore.colors.text
  }"
>
  <div
    class="overlay__content"
    data-teleport-target="overlay"
  ></div>
</div>


<div
  class="viewer"
  :class="{
    ':active': appStore.viewerActive && appStore.viewerImage
  }"
>
  <img
    alt=""
    class="viewer__image"
    :src="appStore.viewerImage"
  >

  <button
    class="viewer__close-button"
    @click="viewCloseButton_onclick"
  >
    <span class="feather feather-x"></span>
  </button>
</div>

<div
  class="aside"
  :class="{
    ':open': asideOpened
  }"
  v-if="isMobileMode"
>
  <div class="aside__menu">
    <RouterLink
      class="aside__menu__item"
      :to="{ name: 'Photo' }"
      @click="link_onclick"
    >+ photo</RouterLink>

    <div class="aside__menu__sub-menu">
      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'PhotoWeddings' }"
        @click="link_onclick"
      >weddings</RouterLink>

      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'PhotoEvents' }"
        @click="link_onclick"
      >events</RouterLink>

      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'PhotoPortraits' }"
        @click="link_onclick"
      >portraits</RouterLink>

      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'PhotoFashion' }"
        @click="link_onclick"
      >fashion</RouterLink>

      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'PhotoFood' }"
        @click="link_onclick"
      >food</RouterLink>

      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'PhotoProduct' }"
        @click="link_onclick"
      >products</RouterLink>
    </div>

    <RouterLink
      class="aside__menu__item"
      :to="{ name: 'Faqs' }"
      @click="link_onclick"
    >faqs</RouterLink>

    <RouterLink
      class="aside__menu__item"
      :to="{ name: 'About' }"
      @click="link_onclick"
    >about</RouterLink>

    <RouterLink
      class="aside__menu__item"
      :to="{ name: 'Contact' }"
      @click="link_onclick"
    >+ contact</RouterLink>

    <div class="aside__menu__sub-menu">
      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'ContactBookings' }"
        @click="link_onclick"
      >bookings</RouterLink>

      <RouterLink
        class="aside__menu__sub-menu__item"
        :to="{ name: 'ContactCustomerService' }"
        @click="link_onclick"
      >customer service</RouterLink>
    </div>

    <div class="aside__menu__icon-menu">
      <a
        class="aside__menu__icon-menu__item"
        href="javascript:void(0);"
        @click="link_onclick"
      >
        <svg class="aside__menu__icon-menu__item__icon" viewBox="0 0 24 24">
          <use href="#svg-symbols--instagram"></use>
        </svg>
      </a>

      <a
        class="aside__menu__icon-menu__item"
        href="javascript:void(0);"
        @click="link_onclick"
      >
        <svg class="aside__menu__icon-menu__item__icon" viewBox="0 0 24 24">
          <use href="#svg-symbols--facebook"></use>
        </svg>
      </a>

      <a
        class="aside__menu__icon-menu__item"
        href="javascript:void(0);"
        @click="link_onclick"
      >
        <svg class="aside__menu__icon-menu__item__icon" viewBox="0 0 24 24">
          <use href="#svg-symbols--twitter"></use>
        </svg>
      </a>
    </div>
  </div>
</div>

<div
  class="navigation"
  :class="{
    ':aside--open': asideOpened
  }"
  :style="{
    '--background-color': appStore.colors.background,
    '--text-color': appStore.colors.text
  }"
  @mouseleave="navigationHovered = false;"
  @mouseover="navigationHovered = true;"
>
  <div class="navigation__brand"></div>

  <div class="navigation__menu">
    <button
      class="navigation__menu__item navigation__menu__item--hamburger"
      @click="asideOpened = !asideOpened && isMobileMode;"
      v-if="isMobileMode"
    >
      <span class="navigation__menu__item__icon feather feather-menu"></span>
    </button>

    <template v-else>
      <RouterLink
        class="navigation__menu__item"
        :to="{ name: 'Photo' }"
        v-dropdown:hover.medium="[
          {
            type: 'link',
            text: 'weddings',
            to: { name: 'PhotoWeddings' }
          },
          {
            type: 'link',
            text: 'events',
            to: { name: 'PhotoEvents' }
          },
          {
            type: 'link',
            text: 'protraits',
            to: { name: 'PhotoPortraits' }
          },
          {
            type: 'link',
            text: 'fashion',
            to: { name: 'PhotoFashion' }
          },
          {
            type: 'link',
            text: 'food',
            to: { name: 'PhotoFood' }
          },
          {
            type: 'link',
            text: 'product',
            to: { name: 'PhotoProduct' }
          },
        ]"
      >
        + photo
      </RouterLink>

      <RouterLink
        class="navigation__menu__item"
        :to="{ name: 'Faqs' }"
      >
        faqs
      </RouterLink>

      <RouterLink
        class="navigation__menu__item"
        :to="{ name: 'About' }"
      >
        about
      </RouterLink>

      <RouterLink
        class="navigation__menu__item"
        :to="{ name: 'Contact' }"
        v-dropdown:hover.medium="[
          {
            type: 'link',
            text: 'bookings',
            to: { name: 'ContactBookings' }
          },
          {
            type: 'link',
            text: 'customer service',
            to: { name: 'ContactCustomerService' }
          },
        ]"
      >
        + contact
      </RouterLink>

      <a
        class="navigation__menu__item navigation__menu__item--icon-item"
        href="javascript:void(0);"
      >
        <svg class="navigation__menu__item__icon" viewBox="0 0 24 24">
          <use href="#svg-symbols--instagram"></use>
        </svg>
      </a>

      <a
        class="navigation__menu__item navigation__menu__item--icon-item"
        href="javascript:void(0);"
      >
        <svg class="navigation__menu__item__icon" viewBox="0 0 24 24">
          <use href="#svg-symbols--facebook"></use>
        </svg>
      </a>

      <a
        class="navigation__menu__item navigation__menu__item--icon-item"
        href="javascript:void(0);"
      >
        <svg class="navigation__menu__item__icon" viewBox="0 0 24 24">
          <use href="#svg-symbols--twitter"></use>
        </svg>
      </a>
    </template>
  </div>
</div>

<RouterView #default="{ Component }">
  <Transition name="router-view-transition">
    <component
      class="router-view"
      :is="Component"
      :key="`${route.name}|${route.fullPath}`"
    ></component>
  </Transition>
</RouterView>

<div
  class="description"
  :style="{
    '--background-color': appStore.colors.text,
    '--text-color': appStore.colors.background,
  }"
  v-html="appStore.description"
  v-if="!!appStore.description"
></div>
</template>

<style lang="scss">
@import "@/assets/icons/feather-icons/style.css";
</style>

<style lang="scss">
@import "@/assets/styles/theme.scss";
</style>

<style lang="scss">
@import "@/assets/styles/base.scss";
</style>

<style lang="scss">
.\:block--text-input {
  align-items: start;
  display: inline-flex;
  flex-direction: column;
  margin-block-end: 0.5em;
  margin-inline-end: 0.5em;

  & > .error {
    display: none;
  }

  & > .input {
    background-color: hsl(var(--theme-color-mute) / 0.05);
    border: 1px solid hsl(var(--theme-color-mute) / 0.5);
    border-radius: 0.35em;
    font-family: inherit;
    font-size: inherit;
    inline-size: 100%;
    margin: 0;
    outline: 3px solid transparent;
    outline-offset: 0;
    padding-block: 0.65em;
    padding-inline: 0.85em;
    transition-property: background-color, border, color, outline-color, outline-offset, padding;
    z-index: 1;

    &::placeholder {
      opacity: 0;
    }
  }

  & > .label {
    color: hsl(var(--theme-color-mute) / 0.5);
    font-size: smaller;
    inset-block-start: calc(1em + var(--error-offset, 0px));
    inset-inline-start: 1em;
    pointer-events: none;
    position: absolute;
    transition-property: color, inset;
    z-index: 2;
  }

  & > .input {
    &:focus {
      border-color: hsl(var(--theme-color-blue));
      outline-color: hsl(var(--theme-color-blue) / 0.4);
      outline-offset: 1px;
      padding-block: 1.1em 0.2em;

      & ~ .label {
        color: hsl(var(--theme-color-mute));
        font-weight: 600;
        inset-block-start: calc(0.15em + var(--error-offset, 0px));
      }
    }

    &:not(:placeholder-shown) {
      padding-block: 1.1em 0.2em;
      
      & ~ .label {
        color: hsl(var(--theme-color-mute));
        font-weight: 600;
        inset-block-start: calc(0.15em + var(--error-offset, 0px));
      }
    }
  }

  & > .error {
    &:not(:empty) {
      display: block;
      background-color: hsl(var(--theme-color-red));
      color: hsl(var(--theme-color-light));
      padding-block: 0.15em;
      padding-inline: 0.35em;
      margin-block-end: 0.35em;

      &::before {
        content: "\ea11  ";
        font-family: 'Feather-Icons';
        font-size: smaller;
      }

      & ~ .input {
        border-color: hsl(var(--theme-color-red));

        &:focus {
          outline-color: hsl(var(--theme-color-red) / 0.4);
        }
      }

      & ~ .label {
        --error-offset: 2.25em;

        color: hsl(var(--theme-color-red));
      }
    }
  }
}

.\:block--button {
  background-color: hsl(var(--theme-color-blue));
  border: 1px solid hsl(var(--theme-color-blue));
  border-radius: 1.5em;
  color: hsl(var(--theme-color-light));
  margin-block-end: 0.5em;
  margin-inline-end: 0.5em;
  outline: 3px solid transparent;
  outline-offset: 0;
  padding-block: 0.65em;
  padding-inline: 1.5em;
  transition-property: background-color, border, color, filter, outline-color, outline-offset;

  &:hover,
  &:focus {
    outline-color: hsl(var(--theme-color-blue) / 0.4);
    outline-offset: 1px;
  }

  &:hover {
    filter: hue-rotate(15deg);
  }
}
</style>

<style lang="scss">
[data-dropdown-directive] {
  inset-block-start: var(--block-offset);
  inset-inline-start: var(--inline-offset);
  opacity: 0;
  padding: 0.35em;
  pointer-events: none;
  position: absolute;
  transition-property: opacity, transform;

  & > .menu {
    background-color: hsl(var(--specified-text-color));
    border-radius: var(--theme-border-radius-medium);

    &::after {
      border-block: 0.5em solid transparent;
      border-inline: 0.5em solid transparent;
      content: "";
      position: absolute;

    }

    & > .menu__wrapper {
      overflow: auto;

      & > .menu__wrapper__content {
        align-items: stretch;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding-block: 0.35em;
        z-index: 1;

        & > .menu__wrapper__content__item {
          & > .menu__wrapper__content__item__handle {
            align-items: center;
            background-color: var(--background, transparent);
            color: var(--color, hsl(var(--specified-background-color)));
            display: flex;
            gap: 0.35em;
            padding-block: 0.35em;
            padding-inline: 1em;
            text-decoration: none;

            & > * {
              pointer-events: none;
            }

            &:hover {
              background-color: var(--hover-background, hsl(var(--specified-background-color) / 0.1));
            }
          }

          &[data-dropdown-directive-item-type="heading"] {
            font-size: medium;
            font-weight: bold;
            padding-block: 0.5em;
            padding-inline: 1em;
            text-decoration: underline;
          }

          &[data-dropdown-directive-item-type="link"] {
            & > .menu__wrapper__content__item__handle {
              &.router-link-active {
                text-decoration: underline;
                text-underline-offset: 0.35em;
              }
            }
          }
        }
      }
    }
  }

  &.\:align--top {
    transform: translateY(-0.5em);

    & > .menu {
      &::after {
        border-block-end-color: hsl(var(--specified-text-color));
        inset-block-start: 100%;
        inset-inline-start: calc(50% - 0.5em + var(--pointer-offset));
      }

      & > .menu__wrapper {
        max-block-size: calc(var(--target-top) - 0.7em);
        max-inline-size: calc(100vw - 0.7em);
      }
    }
  }

  &.\:align--right {
    transform: translateX(0.5em);

    & > .menu {
      &::after {
        border-inline-end-color: hsl(var(--specified-text-color));
        inset-inline-end: 100%;
        inset-block-start: calc(50% - 0.5em + var(--pointer-offset));
      }

      & > .menu__wrapper {
        max-block-size: calc(100vh - 0.7em);
        max-inline-size: calc(100vw - var(--target-right) - 0.7em);
      }
    }
  }

  &.\:align--bottom {
    transform: translateY(0.5em);

    & > .menu {
      &::after {
        border-block-end-color: hsl(var(--specified-text-color));
        inset-block-end: 100%;
        inset-inline-start: calc(50% - 0.5em + var(--pointer-offset));
      }

      & > .menu__wrapper {
        block-size: 100%;
        max-block-size: calc(100vh - var(--target-bottom) - 0.7em);
        max-inline-size: 100vw;
      }
    }
  }

  &.\:align--left {
    transform: translateX(-0.5em);
    
    & > .menu {
      &::after {
        border-inline-start-color: hsl(var(--specified-text-color));
        inset-inline-end: 100%;
        inset-block-start: calc(50% - 0.5em + var(--pointer-offset));
      }

      & > .menu__wrapper {
        max-block-size: calc(100vh - 0.7em);
        max-inline-size: calc(var(--target-left) - 0.7em);
      }
    }
  }

  &.\:size--medium {
    & > .menu {
      min-inline-size: 16em;
    }
  }

  &.\:size--large {
    & > .menu {
      min-inline-size: 26em;
    }
  }

  &.\:open {
    opacity: 1;
    transform: none;
    
    & > .menu {
      pointer-events: auto;
    }
  }
}
</style>

<style lang="scss">
.router-view-transition-enter-active,
.router-view-transition-leave-active {
  transition-property: opacity;
  transition-duration: 400ms;
}

.router-view-transition-enter-from,
.router-view-transition-leave-to {
  opacity: 0;
}

#app {
  display: grid;
  grid-template-columns: [fullbleed-start] 1fr [main-start] 90% [main-end] 1fr [fullbleed-end];
  grid-template-rows: [fullbleed-start navigation-start] auto [navigation-end] 5em [main-start] 1fr [main-end] 5em [ description-start] auto [description-end fullbleed-end];
  min-block-size: 100vh;

  & > .viewer {
    background-color: hsl(var(--theme-color-background));
    grid-area: fullbleed;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity;
    z-index: 1100;
    
    & > .viewer__image {
      block-size: calc(100vh - 0.35em);
      inline-size: calc(100% - 11em);
      inset-block-start: 0.15em;
      margin-block: 0;
      margin-inline: 5.5em;
      object-fit: contain;
      object-position: center;
      position: sticky;
    }

    & > .viewer__close-button {
      background-color: hsl(var(--theme-color-text));
      border: none;
      border-radius: 0;
      color: hsl(var(--theme-color-background));
      cursor: pointer;
      font-size: medium;
      inset-block-start: 1em;
      inset-inline-end: 1em;
      padding-block: 0.65em;
      padding-inline: 0.85em;
      position: fixed;
      transition-property: background-color, color, opacity;
    }

    &.\:active {
      opacity: 1;
      pointer-events: auto;
    }
  }

  & > .overlay {
    grid-area: fullbleed;
    pointer-events: none;
    z-index: 1000;

    & > .overlay__content {
      block-size: 100vh;
      inset-block-start: 0;
      position: sticky;

      :where(& > *) {
        pointer-events: auto;
      }
    }
  }

  & > .aside {
    grid-area: fullbleed;
    pointer-events: none;
    z-index: 200;

    & > .aside__menu {
      align-items: start;
      background-color: hsl(var(--theme-color-background));
      block-size: 100vh;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      inset-block-start: 0;
      opacity: 0;
      overflow: hidden auto;
      padding-block: 1.5em;
      padding-inline: 1em;
      pointer-events: auto;
      position: sticky;
      transform: translateX(100%);
      transition-property: opacity, transform;

      & > .aside__menu__item {
        font-size: medium;
        padding: 0.35em;
        text-decoration: none;
      }

      & > .aside__menu__sub-menu {
        align-items: start;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding-inline-start: 1.15em;

        & > .aside__menu__sub-menu__item {
          font-size: medium;
          padding: 0.35em;
          text-decoration: none;
        }
      }

      & > .aside__menu__icon-menu {
        align-items: stretch;
        display: flex;
        gap: 0.5em;

        & > .aside__menu__icon-menu__item {
          padding: 0.35em;

          & > .aside__menu__icon-menu__item__icon {
            fill: hsl(var(--theme-color-text));
            inline-size: 1.75em;
          }
        }
      }
    }

    &.\:open {
      & > .aside__menu {
        opacity: 1;
        transform: none;
      }
    }
  }

  & > .navigation {
    align-items: start;
    display: flex;
    gap: 1.5em;
    grid-area: navigation / fullbleed;
    justify-content: space-between;
    padding: 0.75em;
    z-index: 300;

    & > .navigation__brand {
      aspect-ratio: 1 / 1;
      background-color: #0088ff;
      inline-size: 6em;
      transition-property: opacity;
    }

    & > .navigation__menu {
      align-items: stretch;
      display: flex;
      gap: 0.5em;

      & > .navigation__menu__item {
        background-color: transparent;
        border: none;
        color: hsl(var(--text-color));
        cursor: pointer;
        padding: 0.35em;

        &.navigation__menu__item--hamburger {
          position: fixed;
          inset-block-start: 0.75em;
          inset-inline-end: 0.75em;
        }

        & > .navigation__menu__item__icon {
          font-size: x-large;
        }
      }
    }

    &.\:aside--open {
      pointer-events: none;

      & > .navigation__brand {
        opacity: 0;
      }

      & > .navigation__menu {
        & > .navigation__menu__item {
          color: hsl(var(--theme-color-text));
          pointer-events: auto;
        }
      }
    }
  }

  & > .description {
    background-color: hsl(var(--background-color));
    color: hsl(var(--text-color));
    font-size: medium;
    grid-area: description / fullbleed;
    padding-block: 0.5em;
    padding-inline: 1.5em;
    text-transform: uppercase;
    z-index: 100;
  }

  :where(& > .router-view) {
    grid-area: main;
    overflow: hidden auto;
  }

  &.\:fit-screen {
    block-size: 100vh;
  }

  @media screen and (min-width: 770px) {
    grid-template-columns: [fullbleed-start] 1fr [main-start] min(160ch, 90%) [main-end] 1fr [fullbleed-end];
    grid-template-rows: [fullbleed-start] 3em [navigation-start] auto [navigation-end] 1fr [main-start] min(60ch, 50%) [main-end] 1fr [ description-start] auto [description-end fullbleed-end];

    & > .navigation {
      grid-column: main;
      padding-inline: 0;

      & > .navigation__menu {
        gap: 0.75em;

        & > .navigation__menu__item {
          text-underline-offset: 0.35em;
          text-decoration-color: transparent;
          transition-property: color, fill, text-decoration-color;

          &.navigation__menu__item--icon-item {
            fill: hsl(var(--text-color));

            & > .navigation__menu__item__icon {
              inline-size: 0.9em;
            }
          }

          &:hover,
          &.router-link-active {
            text-decoration-color: currentColor;
          }
        }
      }
    }

    & > .description {
      grid-column: main;
      justify-self: start;
    }

    @media screen and (min-height: 800px) {
      grid-template-rows: [fullbleed-start] 3em [navigation-start] auto [navigation-end] 1fr [main-start] min(60ch, 50%) [main-end] 1fr [ description-start] auto [description-end] 3em [fullbleed-end];
    }
  }
}
</style>

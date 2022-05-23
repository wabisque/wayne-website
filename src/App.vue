<script setup>
import { onMounted, provide, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import { useAppColor } from '@/stores/app.js';

import NavigationLink from './components/NavigationLink.vue';
import NavigationLinkGroup from './components/NavigationLinkGroup.vue';

const appColorStore = useAppColor();

const route = useRoute();

const navigation = ref();
const asideOpened = ref(false);
const mobileMode = ref(innerWidth < 770);
const navigationBlockSize = ref(0);
const navigationHovered = ref(false);

const app = document.querySelector('#app');
const navigationResizeObserver = new ResizeObserver((entries) => navigationBlockSize.value = entries[0].borderBoxSize.inlineSize ?? entries[0].borderBoxSize[0].blockSize);

onMounted(() => navigationResizeObserver.observe(navigation.value));

addEventListener('resize', () => (mobileMode.value = innerWidth < 770));

provide('mobileMode', mobileMode);
provide('navigationBlockSize', navigationBlockSize);
provide('navigationHovered', navigationHovered);

watch(mobileMode, () => asideOpened.value = false);

watch(route, () => appColorStore.$reset());

watch(navigationBlockSize, value => app.style.setProperty('--App-navigation-block-size', `${value}px`));
</script>

<template>
  <div
    class="navigation"
    :data-ignored="asideOpened || undefined"
    ref="navigation"
    :style="{
      '--App-color-background': appColorStore.background,
      '--App-color-text': appColorStore.text,
    }"
    @mouseover="
      navigationHovered = true;
    "
    @mouseleave="
      navigationHovered = false;
    "
  >
    <Transition name="navigation__brand">
      <component
        class="navigation__brand"
        :data-hidden="asideOpened || undefined"
        href="javascript:void(0);"
        :is="asideOpened ? 'div' : 'a'"
      >
        <div class="navigation__brand__logo"></div>
      </component>
    </Transition>

    <div class="navigation__menu">
      <button
        class="navigation__menu__hamburger"
        @click="asideOpened = !asideOpened"
        v-if="mobileMode"
      >
        <span class="navigation__menu__hamburger__icon feather feather-menu"></span>
      </button>

      <template v-else>
        <NavigationLinkGroup
          :background-color="`hsl(${appColorStore.background})`"
          :menu="[
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: { name: 'Photos-Weddings' }
              },
              text: 'weddings'
            },
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: { name: 'Photos-Events' }
              },
              text: 'events'
            },
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: { name: 'Photos-Portraits' }
              },
              text: 'portraits'
            },
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: { name: 'Photos-Fashion' }
              },
              text: 'fashion'
            },
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: { name: 'Photos-Food' }
              },
              text: 'food'
            },
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: { name: 'Photos-Product' }
              },
              text: 'product'
            },
          ]"
          :text-color="`hsl(${appColorStore.text})`"
          to="/"
        >
          <span class="text">+ photos</span>
        </NavigationLinkGroup>

        <NavigationLink :text-color="`hsl(${appColorStore.text})`" to="/">
          <span class="text">faq's</span>
        </NavigationLink>

        <NavigationLink :text-color="`hsl(${appColorStore.text})`" to="/">
          <span class="text">about</span>
        </NavigationLink>

        <NavigationLinkGroup
          :background-color="`hsl(${appColorStore.background})`"
          :menu="[
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: '/'
              },
              text: 'bookings'
            },
            {
              props: {
                color: 'hsl(var(--theme-color-background))',
                to: '/'
              },
              text: 'customer service'
            }
          ]"
          :text-color="`hsl(${appColorStore.text})`"
          to="/"
        >
          <span class="text">+ contact</span>
        </NavigationLinkGroup>

        <NavigationLink :text-color="`hsl(${appColorStore.text})`" to="/">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        </NavigationLink>

        <NavigationLink :text-color="`hsl(${appColorStore.text})`" to="/">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </NavigationLink>

        <NavigationLink :text-color="`hsl(${appColorStore.text})`" to="/">
          <svg class="icon" role="img" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </NavigationLink>
      </template>
    </div>
  </div>

  <div class="aside" :data-opened="asideOpened || undefined" v-if="mobileMode">
    <NavigationLinkGroup
      :menu="[
        {
          props: { to: '/' },
          text: 'weddings'
        },
        {
          props: { to: '/' },
          text: 'events'
        },
        {
          props: { to: '/' },
          text: 'portraits'
        },
        {
          props: { to: '/' },
          text: 'fashion'
        },
        {
          props: { to: '/' },
          text: 'food'
        },
        {
          props: { to: '/' },
          text: 'product'
        },
      ]"
      mobile
      to="/"
    >
      <span class="text">+ photos</span>
    </NavigationLinkGroup>

    <NavigationLink to="/">
      <span class="text">faq's</span>
    </NavigationLink>

    <NavigationLink to="/">
      <span class="text">about</span>
    </NavigationLink>

    <NavigationLinkGroup
      :menu="[
        {
          props: { to: '/' },
          text: 'bookings'
        },
        {
          props: { to: '/' },
          text: 'customer service'
        }
      ]"
      mobile
      to="/"
    >
      <span class="text">+ contact</span>
    </NavigationLinkGroup>

    <div class="aside__externals">
      <NavigationLink to="/">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      </NavigationLink>

      <NavigationLink to="/">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </NavigationLink>

      <NavigationLink to="/">
        <svg class="icon" role="img" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </NavigationLink>
    </div>
  </div>

  <RouterView class="router-view" />
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
#app {
  block-size: 100vh;
  display: grid;
  grid-template-columns: [fullbleed-start] auto [navigation-start] min(5%, 10ch) [main-start] 80% [main-end] min(5%, 10ch) [navigation-end] auto [fullbleed-end];
  grid-template-rows: [fullbleed-start navigation-start] auto [view-start navigation-end] 1fr [content-view-start] min(calc(80% - var(--App-navigation-block-size, 0px)), 60ch) [content-view-end] 1fr [view-end fullbleed-end];
  inline-size: 100%;
  overflow: hidden;
}

.navigation {
  align-items: center;
  display: flex;
  grid-area: navigation;
  justify-content: space-between;
  padding-block: 1em;
  z-index: 2000;

  &[data-ignored] {
    pointer-events: none;
  }
}

.navigation__brand[data-hidden] {
  pointer-events: none;

  .navigation__brand__logo {
    opacity: 0;
  }
}

.navigation__brand-enter-active,
.navigation__brand-leave-active {
  transition-property: opacity;
}

.navigation__brand-leave-active {
  position: absolute;
}

.navigation__brand-enter-from,
.navigation__brand-leave-to {
  opacity: 0;
}

.navigation__brand__logo {
  aspect-ratio: 1 / 1;
  background-color: #0088ff;
  block-size: 5em;
}

.navigation__menu {
  align-items: stretch;
  display: flex;
  gap: 1em;

  & > * {
    pointer-events: auto;
  }
}

.navigation__menu__hamburger {
  align-items: center;
  background-color: unset;
  border: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  padding: 0.5em;
}

.navigation__menu__hamburger__icon {
  font-size: 1.25em;
}

.aside {
  align-items: baseline;
  background-color: hsl(var(--theme-color-background));
  display: flex;
  flex-direction: column;
  grid-area: fullbleed;
  opacity: 0;
  overflow: hidden auto;
  padding-block: 1.5em;
  padding-inline: 1em 4.5em;
  transform: translateX(100%);
  transition-property: opacity, transform;
  z-index: 1000;

  &[data-opened] {
    opacity: 1;
    transform: none;
  }
}

.aside__externals {
  align-items: stretch;
  display: flex;
  gap: 0.5em;
  padding-block-start: 0.75em;
}

.router-view {
  grid-area: main / view;
}
</style>

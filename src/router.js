import { createRouter, createWebHistory } from 'vue-router';

let routes = [
  {
    name: 'Home',
    path: '/',
    component: async () => await import('@/views/Home.vue'),
    meta: {
      payload: [
        {
          backgroundColor: 'var(--theme-color-dark)',
          src: '/wayne-website/images/1.jpg',
          textColor: 'var(--theme-color-light)',
          to: { name: 'Photos-Weddings' }
        },
        {
          backgroundColor: 'var(--theme-color-dark)',
          src: '/wayne-website/images/2.jpg',
          textColor: 'var(--theme-color-light)',
          to: { name: 'Photos-Events' }
        },
        {
          backgroundColor: 'var(--theme-color-dark)',
          src: '/wayne-website/images/3.jpg',
          textColor: 'var(--theme-color-light)',
          to: { name: 'Photos-Portraits' }
        },
        {
          backgroundColor: 'var(--theme-color-dark)',
          src: '/wayne-website/images/4.jpg',
          textColor: 'var(--theme-color-light)',
          to: { name: 'Photos-Fashion' }
        },
        {
          backgroundColor: 'var(--theme-color-dark)',
          src: '/wayne-website/images/5.jpg',
          textColor: 'var(--theme-color-light)',
          to: { name: 'Photos-Food' }
        },
        {
          backgroundColor: 'var(--theme-color-dark)',
          src: '/wayne-website/images/6.jpg',
          textColor: 'var(--theme-color-light)',
          to: { name: 'Photos-Product' }
        }
      ]
    }
  },
  {
    name: 'Photos-Weddings',
    path: '/photos/weddings',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        '/wayne-website/images/1.jpg',
        '/wayne-website/images/2.jpg',
        '/wayne-website/images/3.jpg',
        '/wayne-website/images/4.jpg',
        '/wayne-website/images/5.jpg',
        '/wayne-website/images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Events',
    path: '/photos/events',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        '/wayne-website/images/1.jpg',
        '/wayne-website/images/2.jpg',
        '/wayne-website/images/3.jpg',
        '/wayne-website/images/4.jpg',
        '/wayne-website/images/5.jpg',
        '/wayne-website/images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Portraits',
    path: '/photos/portraits',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        '/wayne-website/images/1.jpg',
        '/wayne-website/images/2.jpg',
        '/wayne-website/images/3.jpg',
        '/wayne-website/images/4.jpg',
        '/wayne-website/images/5.jpg',
        '/wayne-website/images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Fashion',
    path: '/photos/fashion',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        '/wayne-website/images/1.jpg',
        '/wayne-website/images/2.jpg',
        '/wayne-website/images/3.jpg',
        '/wayne-website/images/4.jpg',
        '/wayne-website/images/5.jpg',
        '/wayne-website/images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Food',
    path: '/photos/food',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        '/wayne-website/images/1.jpg',
        '/wayne-website/images/2.jpg',
        '/wayne-website/images/3.jpg',
        '/wayne-website/images/4.jpg',
        '/wayne-website/images/5.jpg',
        '/wayne-website/images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Product',
    path: '/photos/product',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        '/wayne-website/images/1.jpg',
        '/wayne-website/images/2.jpg',
        '/wayne-website/images/3.jpg',
        '/wayne-website/images/4.jpg',
        '/wayne-website/images/5.jpg',
        '/wayne-website/images/6.jpg'
      ]
    }
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

import { createRouter, createWebHistory } from 'vue-router';

let routes = [
  {
    name: 'Home',
    path: '/',
    component: async () => await import('@/views/Home.vue'),
    meta: {
      payload: [
        {
          src: 'images/1.jpg',
          to: { name: 'Photos-Weddings' }
        },
        {
          src: 'images/2.jpg',
          to: { name: 'Photos-Events' }
        },
        {
          src: 'images/3.jpg',
          to: { name: 'Photos-Portraits' }
        },
        {
          src: 'images/4.jpg',
          to: { name: 'Photos-Fashion' }
        },
        {
          src: 'images/5.jpg',
          to: { name: 'Photos-Food' }
        },
        {
          src: 'images/6.jpg',
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
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Events',
    path: '/photos/events',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Portraits',
    path: '/photos/portraits',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Fashion',
    path: '/photos/fashion',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Food',
    path: '/photos/food',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg'
      ]
    }
  },
  {
    name: 'Photos-Product',
    path: '/photos/product',
    component: async () => await import('@/views/Images.vue'),
    meta: {
      payload: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg'
      ]
    }
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

import { createRouter, createWebHistory } from 'vue-router';

let routes = [
  {
    name: 'Home',
    path: '/',
    component: async () => await import('@/views/Home.vue'),
    meta: {
      payload: [
        {
          src: '/wayne-website/images/1.jpg',
          to: { name: 'Photos-Weddings' }
        },
        {
          src: '/wayne-website/images/2.jpg',
          to: { name: 'Photos-Events' }
        },
        {
          src: '/wayne-website/images/3.jpg',
          to: { name: 'Photos-Portraits' }
        },
        {
          src: '/wayne-website/images/4.jpg',
          to: { name: 'Photos-Fashion' }
        },
        {
          src: '/wayne-website/images/5.jpg',
          to: { name: 'Photos-Food' }
        },
        {
          src: '/wayne-website/images/6.jpg',
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

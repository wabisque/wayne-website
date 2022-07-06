
import About from '../views/About.vue';
import Bookings from '../views/Bookings.vue';
import Container from '../views/Container.vue';
import Faq from '../views/Faq.vue';
import Home from '../views/Home.vue';
import Preview from '../views/Preview.vue';
import Service from '../views/Service.vue';

export default [
  {
    name: 'Photo',
    path: '/photo',
    component: Container,
    redirect: { name: 'PhotoIndex' },
    meta: { fitScreen: true },
    children: [
      {
        name: 'PhotoIndex',
        path: 'index',
        component: Home,
        meta: {
          images: [
            {
              src: '/wayne-website/images/1.jpg',
              description: '<span style="opacity: 0.5">photo /</span> <span>weddings</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'PhotoWeddings' }
            },
            {
              src: '/wayne-website/images/2.jpg',
              description: '<span style="opacity: 0.5">photo /</span> <span>events</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'PhotoEvents' }
            },
            {
              src: '/wayne-website/images/3.jpg',
              description: '<span style="opacity: 0.5">photo /</span> <span>portraits</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'PhotoPortraits' }
            },
            {
              src: '/wayne-website/images/4.jpg',
              description: '<span style="opacity: 0.5">photo /</span> <span>fashion</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'PhotoFashion' }
            },
            {
              src: '/wayne-website/images/5.jpg',
              description: '<span style="opacity: 0.5">photo /</span> <span>food</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'PhotoFood' }
            },
            {
              src: '/wayne-website/images/6.jpg',
              description: '<span style="opacity: 0.5">photo /</span> <span>product</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'PhotoProduct' }
            },
          ]
        }
      },
      {
        name: 'PhotoWeddings',
        path: 'weddings',
        component: Preview,
        meta: {
          images: [
            '/wayne-website/images/1.jpg',
            '/wayne-website/images/2.jpg',
            '/wayne-website/images/3.jpg',
            '/wayne-website/images/4.jpg',
            '/wayne-website/images/5.jpg',
            '/wayne-website/images/6.jpg',
          ]
        }
      },
      {
        name: 'PhotoEvents',
        path: 'events',
        component: Preview,
        meta: {
          images: [
            '/wayne-website/images/1.jpg',
            '/wayne-website/images/2.jpg',
            '/wayne-website/images/3.jpg',
            '/wayne-website/images/4.jpg',
            '/wayne-website/images/5.jpg',
            '/wayne-website/images/6.jpg',
          ]
        }
      },
      {
        name: 'PhotoPortraits',
        path: 'portraits',
        component: Preview,
        meta: {
          images: [
            '/wayne-website/images/1.jpg',
            '/wayne-website/images/2.jpg',
            '/wayne-website/images/3.jpg',
            '/wayne-website/images/4.jpg',
            '/wayne-website/images/5.jpg',
            '/wayne-website/images/6.jpg',
          ]
        }
      },
      {
        name: 'PhotoFashion',
        path: 'fashion',
        component: Preview,
        meta: {
          images: [
            '/wayne-website/images/1.jpg',
            '/wayne-website/images/2.jpg',
            '/wayne-website/images/3.jpg',
            '/wayne-website/images/4.jpg',
            '/wayne-website/images/5.jpg',
            '/wayne-website/images/6.jpg',
          ]
        }
      },
      {
        name: 'PhotoFood',
        path: 'food',
        component: Preview,
        meta: {
          images: [
            '/wayne-website/images/1.jpg',
            '/wayne-website/images/2.jpg',
            '/wayne-website/images/3.jpg',
            '/wayne-website/images/4.jpg',
            '/wayne-website/images/5.jpg',
            '/wayne-website/images/6.jpg',
          ]
        }
      },
      {
        name: 'PhotoProduct',
        path: 'product',
        component: Preview,
        meta: {
          images: [
            '/wayne-website/images/1.jpg',
            '/wayne-website/images/2.jpg',
            '/wayne-website/images/3.jpg',
            '/wayne-website/images/4.jpg',
            '/wayne-website/images/5.jpg',
            '/wayne-website/images/6.jpg',
          ]
        }
      }
    ]
  },
  {
    name: 'Faqs',
    path: '/faqs',
    component: Faq,
    meta: {
      questions: [
        {
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
          answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, nulla? Doloribus eveniet possimus totam? Asperiores repudiandae corrupti rerum eveniet magni perferendis amet quo et eos unde voluptatibus, perspiciatis fuga quam, porro distinctio. Sit quaerat alias, ab optio velit nisi maxime! Inventore aperiam commodi placeat fugiat accusantium, aspernatur maiores. Illo, expedita.',
          image: '',
        },
        {
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
          answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, nulla? Doloribus eveniet possimus totam? Asperiores repudiandae corrupti rerum eveniet magni perferendis amet quo et eos unde voluptatibus, perspiciatis fuga quam, porro distinctio. Sit quaerat alias, ab optio velit nisi maxime! Inventore aperiam commodi placeat fugiat accusantium, aspernatur maiores. Illo, expedita.',
          image: '/wayne-website/images/1.jpg',
        },
        {
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
          answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, nulla? Doloribus eveniet possimus totam? Asperiores repudiandae corrupti rerum eveniet magni perferendis amet quo et eos unde voluptatibus, perspiciatis fuga quam, porro distinctio. Sit quaerat alias, ab optio velit nisi maxime! Inventore aperiam commodi placeat fugiat accusantium, aspernatur maiores. Illo, expedita.',
          image: '',
        },
        {
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
          answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, nulla? Doloribus eveniet possimus totam? Asperiores repudiandae corrupti rerum eveniet magni perferendis amet quo et eos unde voluptatibus, perspiciatis fuga quam, porro distinctio. Sit quaerat alias, ab optio velit nisi maxime! Inventore aperiam commodi placeat fugiat accusantium, aspernatur maiores. Illo, expedita.',
          image: '',
        },
        {
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
          answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, nulla? Doloribus eveniet possimus totam? Asperiores repudiandae corrupti rerum eveniet magni perferendis amet quo et eos unde voluptatibus, perspiciatis fuga quam, porro distinctio. Sit quaerat alias, ab optio velit nisi maxime! Inventore aperiam commodi placeat fugiat accusantium, aspernatur maiores. Illo, expedita.',
          image: '/wayne-website/images/2.jpg',
        },
        {
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
          answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, nulla? Doloribus eveniet possimus totam? Asperiores repudiandae corrupti rerum eveniet magni perferendis amet quo et eos unde voluptatibus, perspiciatis fuga quam, porro distinctio. Sit quaerat alias, ab optio velit nisi maxime! Inventore aperiam commodi placeat fugiat accusantium, aspernatur maiores. Illo, expedita.',
          image: '',
        },
      ]
    },
  },
  {
    name: 'About',
    path: '/about',
    component: About,
    meta: {
      image: '/wayne-website/images/3.jpg'
    }
  },
  {
    name: 'Contact',
    path: '/contact',
    component: Container,
    redirect: { name: 'ContactIndex' },
    children: [
      {
        name: 'ContactIndex',
        path: 'index',
        component: Home,
        meta: {
          fitScreen: true,
          images: [
            {
              src: '/wayne-website/images/4.jpg',
              description: '<span style="opacity: 0.5">contact /</span> <span>bookings</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'ContactBookings' }
            },
            {
              src: '/wayne-website/images/5.jpg',
              description: '<span style="opacity: 0.5">contact /</span> <span>customer support</span>',
              background: 'var(--theme-color-dark)',
              text: 'var(--theme-color-light)',
              to: { name: 'ContactCustomerService' }
            },
          ]
        }
      },
      {
        name: 'ContactBookings',
        path: 'bookings',
        component: Bookings
      },
      {
        name: 'ContactCustomerService',
        path: 'customer-service',
        component: Service,
        meta: {
          image: '/wayne-website/images/6.jpg'
        }
      }
    ]
  }
];

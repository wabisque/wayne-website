import { createRouter, createWebHistory } from 'vue-router';

let routes = [
  // {
  //   name: 'Home',
  //   path: '/',
  // }
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

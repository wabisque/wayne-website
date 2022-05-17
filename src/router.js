import { createRouter, createWebHistory } from 'vue-router';

let routes = [ ];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

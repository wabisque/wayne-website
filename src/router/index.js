import { createRouter, createWebHistory } from 'vue-router';

import { routerGuard } from './guard';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (_to, _from, savedPosition) => {
    if (savedPosition) {
      return { ...savedPosition};
    }

    return { top: 0 };
  },
});

routerGuard(router);

export default router;


/**
 * @param {import('vue-router').Router} router
 */
export const routerGuard = router => {
  router.beforeEach(
    (to, from, next) => {
      if(to.matched.length)
        return next(true);

      if(from.matched.length)
        return next(false);

    return next({ name: 'Photo' });
    }
  )
};

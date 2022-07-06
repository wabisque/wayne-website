import dropdown from './dropdown';

/**
 * @param {import('vue').App} app
 */
export default app => {
  app.directive(dropdown.name, dropdown.directive);
};

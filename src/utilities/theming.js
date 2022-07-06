export const createColorTheme = (theme = {}) => {
  const element = document.createElement('style');
  let buffer = {};

  element.setAttribute('data-theme', 'color');
  element.setAttribute('type', 'text/css');

  const apply = () => document.head.append(element);

  const clear = () => {
    buffer = {};
    update({});
  };

  const remove = () => element.remove();

  const update = (config = theme) => {
    const result = {};

    for(const key in config) {
      const value = config[key];

      if(!(value && (typeof value == 'string' || typeof value == 'object'))) {
        continue;
      }

      if(typeof value == 'string') {
        result[`${key}-light`] = value;
        result[`${key}-dark`] = value;
        continue;
      }

      if(!(Object.keys(value).some(subKey => [ 'light', 'dark' ].includes(subKey)) && Object.values(value).some(subValue => subValue && typeof subValue == 'string'))) {
        continue;
      }

      result[`${key}-light`] = value.light || value.dark;
      result[`${key}-dark`] = value.dark || value.light;
    }

    for(const key in result) {
      const value = result[key];
      const ref = /^\$\((.+)\)$/g.test(value) ? value.replace(/^\$\((.+)\)$/g, '$1') : null;

      if(ref) {
        result[key] = `var(--theme-color-${ref})`;
        continue;
      }
    }

    buffer = {
      ...buffer,
      ...Object.fromEntries(Object.entries(result).map(entry => [ `--theme-color-${entry[0]}`, entry[1] ]))
    };

    element.innerHTML = 
`:root {
  ${Object.entries(buffer).map(entry => `${entry[0]}: ${entry[1]};`).join('\n  ')}

  ${Object.keys(buffer).filter(key => /-light$/g.test(key)).map(key => `${key.replace(/-light$/g, '')}: var(${key});`).join('\n  ')}
}

@media (prefers-color-scheme: dark) {
  :root {
    ${Object.keys(buffer).filter(key => /-dark$/g.test(key)).map(key => `${key.replace(/-dark$/g, '')}: var(${key});`).join('\n    ')}
  }
}

[color-schem="light"] {
  ${Object.keys(buffer).filter(key => /-light$/g.test(key)).map(key => `${key.replace(/-light$/g, '')}: var(${key});`).join('\n  ')}
}

[color-scheme="dark"] {
  ${Object.keys(buffer).filter(key => /-dark$/g.test(key)).map(key => `${key.replace(/-dark$/g, '')}: var(${key});`).join('\n  ')}
}`;

    
  };

  update();
  apply();

  return {
    apply,
    clear,
    remove,
    update
  };
};

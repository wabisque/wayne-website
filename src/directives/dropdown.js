import { watch } from 'vue';

import router from '../router';
import BoundingRectObserver from '../utilities/bounding-rect-observer';
import { debounce, tick } from '../utilities/timing';

const aligns = [ 'bottom', 'top', 'left', 'right' ];
const sizes = [ 'auto', 'medium', 'large' ];
const triggers = [ 'click', 'focus', 'hover' ];

const itemTypes = [ 'action', 'link', 'heading' ];
const itemValidationRules = {
  action: data => !!data.text,
  link: data => !!data.route && !!data.text,
  heading: data => !!data.text
};

const directiveUidGenerator = (function*() {
  let current = 0;

  while(true) {
    yield current;
    current++;
  }
})();

/**
 * @param {{ text: String, type?: 'action' | 'link' | 'heading', icon?: String, to?: Object | String, onclick?: Function, background?: String, color?: String, hoverBackground?: String, hoverColor?: String }} data
 * @returns {HTMLElement?}
 */
const createItem = (data) => {
  if(!(data && typeof data == 'object')) {
    return null;
  }

  const cleanedData = {
    type: itemTypes.includes(data.type) ? data.type : itemTypes[0],
    onclick: typeof data.onclick == 'function' ? data.onclick : undefined,
    route: data.to ? router.resolve(data.to) : undefined,
    text: data.text && typeof data.text == 'string' ? data.text : undefined,
    icon: data.icon && typeof data.icon == 'string' ? data.icon : undefined,
    capitalize: data.capitalize === true,
    background: data.background && typeof data.background == 'string' ? data.background : undefined,
    color: data.color && typeof data.color == 'string' ? data.color : undefined,
    hoverBackground: data.hoverBackground && typeof data.hoverBackground == 'string' ? data.hoverBackground : undefined,
    hoverColor: data.hoverColor && typeof data.hoverColor == 'string' ? data.hoverColor : undefined,
  };

  if(!itemValidationRules[cleanedData.type](cleanedData)) {
    return null;
  }

  let item;
  let handle;
  let text;
  let icon;

  if(cleanedData.type == 'action') {
    item = document.createElement('div');
    handle = document.createElement('a');
    text = document.createElement('span');

    handle.href = 'javascript:void(0);';

    if(cleanedData.onclick) {
      handle.addEventListener('click', cleanedData.onclick);
    }

    item.appendChild(handle);

    if(cleanedData.icon) {
      icon = document.createElement('span');
      icon.classList.toggle('feather', true);
      icon.classList.toggle(`feather-${cleanedData.icon}`, true);
      handle.appendChild(icon);
    }

    text.textContent = cleanedData.text;
    handle.appendChild(text);
  } else if(cleanedData.type == 'link') {
    item = document.createElement('div');
    handle = document.createElement('a');
    text = document.createElement('span');

    handle.href = cleanedData.route.href;
    handle.dataset.external = !cleanedData.route.matched.length;
    handle.dataset.to = JSON.stringify(data.to ?? null);
    
    if(!cleanedData.route.matched.length) {
      handle.setAttribute('target', '__blank');
    }
    
    handle.addEventListener('click', handle_onclick);
    item.appendChild(handle);

    if(cleanedData.icon) {
      icon = document.createElement('span');
      icon.classList.toggle('feather', true);
      icon.classList.toggle(`feather-${cleanedData.icon}`, true);
      handle.appendChild(icon);
    }

    text.textContent = cleanedData.text;
    handle.appendChild(text);
  } else if(cleanedData.type == 'heading') {
    item = document.createElement('div');
    item.textContent = text;
  }

  item.dataset.dropdownDirectiveItemType = cleanedData.type;
  item.classList.toggle('menu__wrapper__content__item', true);

  if(cleanedData.capitalize) {
    item.style.setProperty('text-transform', 'capitalize');
  }

  if(cleanedData.color) {
    item.style.setProperty('--color', cleanedData.color);
  }

  if(cleanedData.background) {
    item.style.setProperty('--background', cleanedData.background);
  }

  if(cleanedData.hoverBackground) {
    item.style.setProperty('--hover-background', cleanedData.hoverBackground);
  }

  if(cleanedData.hoverColor) {
    item.style.setProperty('--hover-color', cleanedData.hoverColor);
  }

  handle?.classList.toggle('menu__wrapper__content__item__handle', true);
  icon?.classList.toggle('menu__wrapper__content__item__handle__icon', true);
  text?.classList.toggle('menu__wrapper__content__item__handle__text', true);

  return item;
};

/**
 * @param {HTMLElement} item
 * @param {{ type?: 'action' | 'link' | 'heading', icon?: String, text: String, to?: Object | String, onclick?: Function }} data
 * @param {{ type?: 'action' | 'link' | 'heading', icon?: String, text: String, to?: Object | String, onclick?: Function }} [oldData = {}]
 * @returns {HTMLElement?}
 */
const updateItem = (item, data, oldData = {}) => {
  if(!(data && typeof data == 'object')) {
    return null;
  }

  const cleanedData = {
    type: itemTypes.includes(data.type) ? data.type : itemTypes[0],
    onclick: typeof data.onclick == 'function' ? data.onclick : undefined,
    route: data.to ? router.resolve(data.to) : undefined,
    icon: data.icon && typeof data.icon == 'string' ? data.icon : undefined,
    text: data.text && typeof data.text == 'string' ? data.text : undefined,
    capitalize: data.capitalize === true,
    background: data.background && typeof data.background == 'string' ? data.background : undefined,
    color: data.color && typeof data.color == 'string' ? data.color : undefined,
    hoverBackground: data.hoverBackground && typeof data.hoverBackground == 'string' ? data.hoverBackground : undefined,
    hoverColor: data.hoverColor && typeof data.hoverColor == 'string' ? data.hoverColor : undefined,
  };
  const cleanedOldData = {
    type: itemTypes.includes(oldData.type) ? oldData.type : itemTypes[0],
    onclick: typeof oldData.onclick == 'function' ? oldData.onclick : undefined,
  };

  if(!itemValidationRules[cleanedData.type](cleanedData)) {
    return null;
  }

  let handle = item.querySelector(':scope .menu__wrapper__content__item__handle');
  let icon = item.querySelector(':scope .menu__wrapper__content__item__handle__icon');
  let text = item.querySelector(':scope .menu__wrapper__content__item__handle__text');

  item.dataset.dropdownDirectiveItemType = cleanedData.type;

  if([ 'action', 'link' ].includes(cleanedOldData.type && handle)) {
    handle.removeEventListener('click', cleanedOldData.onclick);
    handle.removeEventListener('click', handle_onclick);
  }

  if(cleanedData.type == 'action') {
    if(!handle) {
      handle = document.createElement('a');
      text = document.createElement('span');
    }

    if(cleanedData.onclick) {
      handle.addEventListener('click', cleanedData.onclick);
    }

    if(cleanedData.icon && !icon) {
      icon = document.createElement('span');
      icon.classList.toggle('menu__wrapper__content__item__handle__icon', true);
      icon.classList.toggle('feather', true);
      icon.classList.toggle(`feather-${cleanedData.icon}`, true);
    } else if(!cleanedData.icon && icon) {
      icon.remove();
    } else if(cleanedData.icon && icon) {
      icon.classList.replace(icon.classList.item(2), `feather-${cleanedData.icon}`);
    }

    text.textContent = cleanedData.text;
  } else if(cleanedData.type == 'link') {
    if(!handle) {
      handle = document.createElement('a');
      text = document.createElement('span');
    }

    handle.addEventListener('click', handle_onclick);
    handle.href = cleanedData.route.href;
    handle.dataset.external = !cleanedData.route.matched.length;
    handle.dataset.to = JSON.stringify(data.to ?? null);

    if(!cleanedData.route.matched.length) {
      handle.setAttribute('target', '__blank');
    } else {
      handle.removeAttribute('target');
    }

    if(cleanedData.icon && !icon) {
      icon = document.createElement('span');
      icon.classList.toggle('menu__wrapper__content__item__handle__icon', true);
      icon.classList.toggle('feather', true);
      icon.classList.toggle(`feather-${cleanedData.icon}`, true);
    } else if(!cleanedData.icon && icon) {
      icon.remove();
    } else if(cleanedData.icon && icon) {
      icon.classList.replace(icon.classList.item(2), `feather-${cleanedData.icon}`);
    }

    text.textContent = cleanedData.text;
  } else if(cleanedData.type == 'heading') {
    if(handle) {
      handle.remove();
    }

    item.textContent = cleanedData.text;
  }

  if(cleanedData.capitalize) {
    item.style.setProperty('text-transform', 'capitalize');
  } else {
    item.style.removeProperty('text-transform');
  }

  if(cleanedData.color) {
    item.style.setProperty('--color', cleanedData.color);
  } else {
    item.style.removeProperty('--color');
  }

  if(cleanedData.background) {
    item.style.setProperty('--background', cleanedData.background);
  } else {
    item.style.removeProperty('--background');
  }

  if(cleanedData.hoverBackground) {
    item.style.setProperty('--hover-background', cleanedData.hoverBackground);
  } else {
    item.style.removeProperty('--hover-background');
  }

  if(cleanedData.hoverColor) {
    item.style.setProperty('--hover-color', cleanedData.hoverColor);
  } else {
    item.style.removeProperty('--hover-color');
  }

  return item;
};

/**
 * @param {HTMLElement} el
 */
const observerCallback = el => {
  const dropdown = document.querySelector(`[data-dropdown-directive="${el?.dataset.dropdownDirectiveUid}"]`);

  if(!(el && dropdown)) {
    return;
  }

  const elRect = el.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();

  let blockOffset = Number(el.dataset.dropdownDirectiveBlockOffset);
  let inlineOffset = Number(el.dataset.dropdownDirectiveInlineOffset);
  let pointerOffset = Number(el.dataset.dropdownDirectivePointerOffset);

  switch(el.dataset.dropdownDirectiveAlignment) {
    case 'top': {
      blockOffset = elRect.top - dropdownRect.height;
      break;
    }
    case 'right': {
      inlineOffset = elRect.right;
      break;
    }
    case 'bottom': {
      blockOffset = elRect.bottom;
      break;
    }
    case 'left': {
      inlineOffset = elRect.left - dropdownRect.width;
      break;
    }
  }

  if([ 'top', 'bottom' ].includes(el.dataset.dropdownDirectiveAlignment)) {
    inlineOffset = elRect.left + elRect.width / 2 - dropdownRect.width / 2;
  } else {
    blockOffset = elRect.top + elRect.height / 2 - dropdownRect.height / 2;
  }

  pointerOffset = 0;

  if(!(elRect.top < 0 || elRect.right > innerWidth || elRect.bottom > innerHeight || elRect.left < 0)) {
    if([ 'top', 'bottom' ].includes(el.dataset.dropdownDirectiveAlignment)) {
      pointerOffset = inlineOffset;
      inlineOffset = inlineOffset < 0 ? 0 : (inlineOffset > innerWidth ? innerWidth : inlineOffset);
      pointerOffset = pointerOffset - inlineOffset;
    } else {
      pointerOffset = blockOffset;
      blockOffset = blockOffset < 0 ? 0 : (blockOffset > innerHeight ? innerHeight : blockOffset);
      pointerOffset = pointerOffset - blockOffset;
    }
  }

  el.dataset.dropdownDirectiveBlockOffset = blockOffset;
  el.dataset.dropdownDirectiveInlineOffset = inlineOffset;
  dropdown.style.setProperty('--block-offset', `${blockOffset}px`);
  dropdown.style.setProperty('--inline-offset', `${inlineOffset}px`);
  dropdown.style.setProperty('--pointer-offset', `${pointerOffset}px`);
  dropdown.style.setProperty('--target-bottom', `${elRect.bottom}px`);
  dropdown.style.setProperty('--target-left', `${elRect.left}px`);
  dropdown.style.setProperty('--target-right', `${elRect.right}px`);
  dropdown.style.setProperty('--target-top', `${elRect.top}px`);
};

/**
 * @param {import('vue').DirectiveBinding} binding
 */
const refresh = (el, binding) => {
  const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);
  const content = dropdown.querySelector('.menu__wrapper__content')
  const items = [ ...content.querySelectorAll('.menu__wrapper__content__item') ];

  const align = Object.entries(binding.modifiers).find(entry => aligns.includes(entry[0]))?.[0] ?? aligns[0];
  const size = Object.entries(binding.modifiers).find(entry => sizes.includes(entry[0]))?.[0] ?? sizes[0];
  const trigger =  triggers.includes(binding.arg) ? binding.arg : triggers[0];

  for(const value of aligns) {
    dropdown.classList.toggle(`:align--${value}`, false);
  }

  for(const value of sizes) {
    dropdown.classList.toggle(`:size--${value}`, false);
  }

  el.dataset.dropdownDirectiveAlignment = align;
  el.dataset.dropdownDirectiveTrigger = trigger;
  dropdown.classList.toggle(`:align--${align}`, true);
  dropdown.classList.toggle(`:size--${size}`, true);

  for(const item of items) {
    item.remove();
  }

  if(!Array.isArray(binding.value)) {
    return;
  }
  
  const length = Math.max(binding.value.length, items.length);
  const deleted = [];

  for(let index = 0; index < length; index++) {
    const data = binding.value?.[index];
    const oldData = binding.oldValue?.[index];
    let item = items[index];

    item = item ? updateItem(item, data, oldData) : createItem(data);

    if(!item) {
      deleted.push(items[index]);
      continue;
    }

    items[index] = item;
  }

  for(const item of items) {
    if(deleted.includes(item)) {
      item.remove();
      continue;
    }

    content.appendChild(item);
  }
};

const el_onblur = (event, hoverDebounce) => {
  const el = event.target.closest('[data-dropdown-directive-uid]');
  const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

  if(el.dataset.dropdownDirectiveTrigger == 'focus') {
    hoverDebounce();
    dropdown.classList.toggle(':open', false);
  }
};

const el_onclick = (event, hoverDebounce) => {
  const el = event.target.closest('[data-dropdown-directive-uid]');
  const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

  if(el.dataset.dropdownDirectiveTrigger == 'click') {
    hoverDebounce();
    dropdown.classList.toggle(':open');
  }
};

const el_onfocus = (event, hoverDebounce) => {
  const el = event.target.closest('[data-dropdown-directive-uid]');
  const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

  if(el.dataset.dropdownDirectiveTrigger == 'focus') {
    hoverDebounce();
    dropdown.classList.toggle(':open', true);
  }
};

const el_onmouseleave = (event, hoverDebounce) => {
  const el = event.target.closest('[data-dropdown-directive-uid]');
  const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

  hoverDebounce(el, dropdown);
}

const el_onmouseover = (event, hoverDebounce) => {
  const el = event.target.closest('[data-dropdown-directive-uid]');
  const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

  if(el.dataset.dropdownDirectiveTrigger == 'hover') {
    hoverDebounce();
    dropdown.classList.toggle(':open', true);
  }
};

const handle_onclick = event => {
  const external = event.target.dataset.external == 'true' ? true : false;
  
  if(external) {
    return;
  }

  event.preventDefault();
  router.push(event.target.getAttribute('href'));
};

const menu_onmouseleave = (event, hoverDebounce) => {
  const dropdown = event.target.closest('[data-dropdown-directive]');
  const el = document.querySelector(`[data-dropdown-directive-uid="${dropdown.dataset.dropdownDirective}"]`);
  
  hoverDebounce(el, dropdown);
}

const menu_onmouseover = (event, hoverDebounce) => {
  const dropdown = event.target.closest('[data-dropdown-directive]');
  const el = document.querySelector(`[data-dropdown-directive-uid="${dropdown.dataset.dropdownDirective}"]`);

  if(el.dataset.dropdownDirectiveTrigger == 'hover') {
    hoverDebounce();
    dropdown.classList.toggle(':open', true);
  }
};

export default {
  name: 'dropdown',
  /**
   * @type {import('vue').Directive}
   */
  directive: {
    created: (el, binding) => {
      const dropdown = document.createElement('div');
      const menu = document.createElement('div');
      const wrapper = document.createElement('div');
      const content = document.createElement('div');

      const uid = directiveUidGenerator.next().value;

      const elObserver = new BoundingRectObserver(entries => observerCallback(el));
      const dropdownObserver = new ResizeObserver(entries => observerCallback(el));

      const hoverDebounce = debounce(
        (el, dropdown) => {
          if(el instanceof HTMLElement && dropdown instanceof HTMLElement && el.dataset.dropdownDirectiveTrigger == 'hover') {
            dropdown.classList.toggle(':open', false);
          }
        },
        100
      );
  
      menu.classList.add('menu');
      dropdown.appendChild(menu);

      wrapper.classList.add('menu__wrapper');
      menu.appendChild(wrapper);

      content.classList.add('menu__wrapper__content');
      wrapper.appendChild(content);
    
      el.dataset.dropdownDirectiveUid = uid;
      dropdown.dataset.dropdownDirective = uid;
      dropdown.style.setProperty('display', 'none');
      document.body.appendChild(dropdown);

      elObserver.observe(el);
      dropdownObserver.observe(dropdown);

      el.addEventListener('blur', event => el_onblur(event, hoverDebounce));
      el.addEventListener('click', event => el_onclick(event, hoverDebounce));
      el.addEventListener('focus', event => el_onfocus(event, hoverDebounce));
      el.addEventListener('mouseleave', event => el_onmouseleave(event, hoverDebounce));
      el.addEventListener('mouseover', event => el_onmouseover(event, hoverDebounce));
      menu.addEventListener('mouseleave', event => menu_onmouseleave(event, hoverDebounce));
      menu.addEventListener('mouseover', event => menu_onmouseover(event, hoverDebounce));

      refresh(el, binding);

      watch(
        router.currentRoute,
        current => {
          const handles = [ ...content.querySelectorAll(':scope > .menu__wrapper__content__item[data-dropdown-directive-item-type="link"] > .menu__wrapper__content__item__handle') ];

          for(const handle of handles) {
            handle.classList.toggle('router-link-active', false);
            handle.classList.toggle('router-link-exact-active', false);

            if(!current.matched.length) {
              continue;
            }

            const route = router.resolve(JSON.parse(handle.dataset.to));

            handle.classList.toggle('router-link-active', current.matched.some(match => match.name == route.name && match.path == route.path));
            handle.classList.toggle('router-link-exact-active', current.matched.at(-1).name == route.name && current.matched.at(-1).path == route.path);
          }
        }
      );
    },
    mounted: (el, binding) => {
      const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

      document.querySelector('[data-teleport-target="overlay"]').appendChild(dropdown);
      dropdown.style.removeProperty('display');

      refresh(el, binding);
    },
    unmounted: (el, binding) => {
      const dropdown = document.querySelector(`[data-dropdown-directive="${el.dataset.dropdownDirectiveUid}"]`);

      document.body.appendChild(dropdown);
      dropdown.style.setProperty('display', 'none');

      refresh(el, binding);
    },
    updated: (el, binding) => {
      refresh(el, binding);
    }
  }
};

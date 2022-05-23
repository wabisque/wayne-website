import { defineStore } from 'pinia';

export const useAppColor = defineStore(
  'appColor',
  {
    state: () => ({ background: 'var(--theme-color-background)', text: 'var(--theme-color-text)' }),
  }
);

import { defineStore } from 'pinia';

export const useApp = defineStore(
  'app/index',
  {
    state: () => ({
      description: '',
      colors: {
        background: 'var(--theme-color-background)',
        text: 'var(--theme-color-text)'
      },
      viewerImage: '',
      viewerActive: false
    })
  }
);

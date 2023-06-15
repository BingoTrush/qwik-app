import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), vue(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import './src/global.less';`
        },
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    optimizeDeps: {
      exclude: [
        '@std\/vui'
      ]
    }
  };
});

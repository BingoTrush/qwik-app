import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import vue2 from '@vitejs/plugin-vue2'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), vue2(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    css: {
      // 预处理器配置项
      preprocessorOptions: {
        less: {
          additionalData: `@import './src/global.less';`
        },
      },
    },
    server: {
      hmr: {
        overlay: false
      }
    }
  };
});

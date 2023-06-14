import { component$ } from '@builder.io/qwik';
import { QwikCityProvider } from '@builder.io/qwik-city'
import './global.css';

// @ts-ignore
import App from './vue/components/app.vue';

import { qwikify$ } from './vue/qwikify';

export const VueApp = qwikify$(App)

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
          <VueApp/>
      </body>
    </QwikCityProvider>
  );
});

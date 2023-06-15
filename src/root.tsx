import { component$ } from '@builder.io/qwik';
import { QwikCityProvider } from '@builder.io/qwik-city'
// import './global.css';

import '@std/theme/src/var.css';

// @ts-ignore
import App from './app.vue';

import { qwikify$ } from './vue/qwikify';

export const VueApp = qwikify$(App)

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body data-theme="maps-std-light">
          <VueApp client:visible/>
      </body>
    </QwikCityProvider>
  );
});

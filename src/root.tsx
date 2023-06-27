import { component$ } from '@builder.io/qwik';
import { QwikCityProvider } from '@builder.io/qwik-city'

import '@std/theme/src/var.css';
import 'view-design/dist/styles/iview.css';

import App from './app.vue';

import { qwikify$ } from './vue/qwikify';

const VueApp = qwikify$(App)

export default component$(() => {
  const theme = "maps-std-light"
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body data-theme={theme}>
          <VueApp client:visible>
            <div>
              VueAppSlot
            </div>
          </VueApp>
      </body>
    </QwikCityProvider>
  );
});

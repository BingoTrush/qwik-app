import { component$ } from '@builder.io/qwik';

// @ts-ignore
import App from '../vue/components/qwik-app.vue';

import { qwikify$ } from '../vue/qwikify';

export const QwikVue = qwikify$(App)

export default component$(() => {
  return (
    <QwikVue client:visible>
      This is Qwik Vue Slot
    </QwikVue>
  );
});
import { component$ } from '@builder.io/qwik';

import App from '../vue-component/qwik-child.vue';

import { qwikify$ } from '../vue/qwikify';

export const QwikVue = qwikify$(App)

export default component$(() => {
  return (
    <QwikVue client:visible>
      Routes
    </QwikVue>
  );
});
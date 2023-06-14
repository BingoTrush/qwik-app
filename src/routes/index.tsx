import { component$ } from '@builder.io/qwik';

// @ts-ignore
import App from '../vue/components/app.vue';

import { qwikify$ } from '../vue/qwikify';

export const QwikVue = qwikify$(App)

export default component$(() => {
  return (
    <QwikVue/>
  );
});
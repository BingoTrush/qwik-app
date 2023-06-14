import { component$ } from '@builder.io/qwik';

// @ts-ignore
import VueCmp from '../vue/components/qwik-vue.vue';

import { qwikify$ } from '~/vue/qwikify';

export const QwikVue = qwikify$(VueCmp)

export default component$(() => {
  return (
    <div>
      <QwikVue/>
    </div>
  );
});
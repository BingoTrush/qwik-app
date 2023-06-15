import { component$ } from '@builder.io/qwik';

import type { DocumentHead } from '@builder.io/qwik-city';

// @ts-ignore
import VueCmp from '../vue/components/qwik-vue.vue';

import { qwikify$ } from '~/vue/qwikify';

export const QwikVue = qwikify$(VueCmp)

export default component$(() => {
  return (
    <div>
      <QwikVue client:visible/>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
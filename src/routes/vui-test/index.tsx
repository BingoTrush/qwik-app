import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
} from '@builder.io/qwik-city';

import demoCmp  from './demo.vue';

export default component$(() => {
  return (
    <>
      <demoCmp/>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Demo',
};

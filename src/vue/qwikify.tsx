import {
  component$,
  implicit$FirstArg,
  type QRL,
  RenderOnce,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import type { QwikifyOptions, QwikifyProps } from './types';

import { renderToString } from 'vue/server-renderer';

export function qwikifyQrl<PROPS extends {}>(
  vueCmp$: QRL<any>,
  opts?: QwikifyOptions
) {
  return component$<QwikifyProps<PROPS>>(() => {
    if (isServer) {
      // Render Vue in SSR
      renderToString()
    }

    return (
      <RenderOnce>
        <div>Trush</div>
      </RenderOnce>
    );
  });
}

export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

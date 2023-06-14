import {
  component$,
  implicit$FirstArg,
  type QRL,
  RenderOnce,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import type { QwikifyOptions, QwikifyProps } from './types';

import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

const renderer = createRenderer();

export function qwikifyQrl<PROPS extends {}>(
  vueCmpQrl: QRL<any>,
  opts?: QwikifyOptions
) {
  return component$<QwikifyProps<PROPS>>(() => {
    if (isServer) {
      const jsx = renderVueQrl(vueCmpQrl)
      // Render Vue in SSR
      return (<>{jsx}</>)
    }

    return (
      <RenderOnce>
        <div></div>
      </RenderOnce>
    );
  });
}

export const renderVueQrl = async (vueCmpQrl: QRL<any>) => {
  const vueCmp = await vueCmpQrl.resolve()

  const result = await renderer.renderToString(new Vue({
    render: h => h(vueCmp)
  }))

  return <div dangerouslySetInnerHTML={result}></div>
}

export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

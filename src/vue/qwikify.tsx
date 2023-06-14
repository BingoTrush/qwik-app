import {
  component$,
  implicit$FirstArg,
  type QRL,
  RenderOnce,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import type { QwikifyOptions, QwikifyProps } from './types';

import { renderToString } from 'vue/server-renderer';
import { createSSRApp } from 'vue';

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

  const app = createSSRApp(vueCmp);

  const result = await renderToString(app)

  return <div dangerouslySetInnerHTML={result}></div>
}

export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

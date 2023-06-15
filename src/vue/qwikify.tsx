import {
  component$,
  implicit$FirstArg,
  type QRL,
  RenderOnce,
  useSignal,
  type Signal,
  $,
  useOn,
  useOnDocument,
  useTask$
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import type { QwikifyOptions, QwikifyProps } from './types';

import { renderToString } from 'vue/server-renderer';
import { createSSRApp } from 'vue';

export function qwikifyQrl<PROPS extends {}>(
  vueCmpQrl: QRL<any>,
) {
  return component$<QwikifyProps<PROPS>>((props) => {

    const hostRef = useSignal<HTMLElement>();

    const [signal] = useWakeupSignal(props);

    useTask$(async ({ track }) => {

      // Should be track, so that the btn work correctly
      track(signal)
  
      if (isServer) {
        return;
      }

      const element = hostRef.value;

      if (element) {
        const vueCmp = await vueCmpQrl.resolve();

        const app = createSSRApp(vueCmp);

        app.mount(element)
      }
    })
  
    if (isServer) {
      const jsx = renderVueQrl(vueCmpQrl, hostRef)
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

/**
 * 参考 qwik/react 实现
 * @param vueCmpQrl Vue Cmp
 * @param hostRef Root Ref
 * @returns 
 */
export const renderVueQrl = async (vueCmpQrl: QRL<any>, hostRef: Signal<HTMLElement | undefined>) => {
  const vueCmp = await vueCmpQrl.resolve()

  const app = createSSRApp(vueCmp);

  const result = await renderToString(app)

  // Should be mount in this root element
  return <div ref={hostRef} dangerouslySetInnerHTML={result}></div>
}

/**
 * Signal
 */
export const useWakeupSignal = (props: QwikifyProps<{}>, opts: QwikifyOptions = {}) => {

  const signal = useSignal(false);
  const activate = $(() => (signal.value = true));

  const clientOnly = !!(props['client:only'] || opts?.clientOnly);

  if (isServer) {
    if (props['client:visible'] || opts?.eagerness === 'visible') {
      // eslint-disable-next-line qwik/use-method-usage
      useOn('qvisible', activate);
    }
    if (props['client:idle'] || opts?.eagerness === 'idle') {
      // eslint-disable-next-line qwik/use-method-usage
      useOnDocument('qidle', activate);
    }
    if (props['client:load'] || clientOnly || opts?.eagerness === 'load') {
      // eslint-disable-next-line qwik/use-method-usage
      useOnDocument('qinit', activate);
    }
    if (props['client:hover'] || opts?.eagerness === 'hover') {
      // eslint-disable-next-line qwik/use-method-usage
      useOn('mouseover', activate);
    }
    if (props['client:event']) {
      // eslint-disable-next-line qwik/use-method-usage
      useOn(props['client:event'], activate);
    }
    if (opts?.event) {
      // eslint-disable-next-line qwik/use-method-usage
      useOn(opts?.event, activate);
    }
  }
  return [signal, clientOnly, activate] as const;
};

export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

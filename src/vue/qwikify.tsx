/* eslint-disable qwik/use-method-usage */
import {
  component$,
  implicit$FirstArg,
  type QRL,
  RenderOnce,
  useSignal,
  $,
  useOn,
  useOnDocument,
  useTask$,
  type Signal,
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
  return component$<QwikifyProps<PROPS>>((props) => {

    const hostRef = useSignal<HTMLElement>();

    const [signal] = useWakeupSignal(props, opts);

    useTask$(async ({ track }) => {
      track(signal)

      if (isServer) {
        return //
      }

      const element = hostRef.value;

      if (element) {
        const vueCmp = await vueCmpQrl.resolve();

        const app = new Vue({
          render: h => h(vueCmp)
        })

        app.$mount(element)
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

export const renderVueQrl = async (vueCmpQrl: QRL<any>, hostRef: Signal<HTMLElement | undefined>) => {
  const vueCmp = await vueCmpQrl.resolve()

  const result = await renderer.renderToString(new Vue({
    render: h => h(vueCmp)
  }))

  return <div ref={hostRef} dangerouslySetInnerHTML={result}></div>
}

/**
 * Register a listener on the current component's host element.
 */
export const useWakeupSignal = (props: QwikifyProps<{}>, opts: QwikifyOptions = {}) => {
  const signal = useSignal(false);
  const activate = $(() => (signal.value = true));

  // console.log('>>>>>>>props', props);

  const clientOnly = !!(props['client:only'] || opts?.clientOnly);
  if (isServer) {
    if (props['client:visible'] || opts?.eagerness === 'visible') {
      useOn('qvisible', activate);
    }
    if (props['client:idle'] || opts?.eagerness === 'idle') {
      useOnDocument('qidle', activate);
    }
    if (props['client:load'] || clientOnly || opts?.eagerness === 'load') {
      useOnDocument('qinit', activate);
    }
    if (props['client:hover'] || opts?.eagerness === 'hover') {
      useOn('mouseover', activate);
    }
    if (props['client:event']) {
      useOn(props['client:event'], activate);
    }
    if (opts?.event) {
      useOn(opts?.event, activate);
    }
  }
  return [signal, clientOnly, activate] as const;
};

export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

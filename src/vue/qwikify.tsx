import {
  component$,
  implicit$FirstArg,
  type QRL,
  RenderOnce,
  useSignal,
  useTask$,
  type Signal,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import type { QwikifyOptions, QwikifyProps } from './types';

import { createRenderer } from 'vue-server-renderer';

import Vue from 'vue';

import { useWakeupSignal } from './slot';

export function qwikifyQrl<PROPS extends {}>(
  vueCmpQrl: QRL<any>,
  opts?: QwikifyOptions
) {
  return component$<QwikifyProps<PROPS>>((props: any) => {

    const hostRef = useSignal<HTMLElement>();

    const [signal] = useWakeupSignal(props, opts);

    useTask$(async ({ track }) => {
      track(signal)

      if (isServer) {
        return
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
 * 渲染 & 挂载节点
 * @param vueCmpQrl Vue 组件的QRL映射
 * @param hostRef 挂载元素
 * @returns 
 */
const renderVueQrl = async (vueCmpQrl: QRL<any>, hostRef: Signal<HTMLElement | undefined>) => {
  const renderer = createRenderer();

  const vueCmp = await vueCmpQrl.resolve()

  const result = await renderer.renderToString(new Vue({
    render: h => h(vueCmp)
  }))

  return <div ref={hostRef} dangerouslySetInnerHTML={result}></div>
}


export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

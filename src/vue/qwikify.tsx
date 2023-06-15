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
  useTask$,
  SSRRaw,
  Slot
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import type { QwikifyOptions, QwikifyProps } from './types';

import { renderToString } from 'vue/server-renderer';
import { createSSRApp, defineComponent, h } from 'vue';

const SLOT_SYMBOL = '<!--SLOT-->';

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

        // const app = createSSRApp(vueCmp);

        const slots = {
          'default': h(StaticHtml, {
            value: SLOT_SYMBOL,
            name: 'test',
            hydrate: true
          })
        };
      
        const app = createSSRApp({ render: () => h(vueCmp, {}, slots) });

        app.mount(element)
      }
    })
  
    if (isServer) {
      const jsx = renderVueQrl(vueCmpQrl, hostRef)

      // Render Vue in SSR
      return (
      <>
          {jsx}
      </>)
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

  const slots = {
    'default': h(StaticHtml, {
      value: SLOT_SYMBOL,
      name: 'test',
      hydrate: true
    })
  };

	const app = createSSRApp({ render: () => h(vueCmp, {}, slots) });

  const html = await renderToString(app)

  // console.log('>>>>>>html', html);

  const startSlotComment = html.indexOf(SLOT_SYMBOL);

  if (startSlotComment >= 0) {
    const beforeSlot = html.slice(0, startSlotComment);
    const afterSlot = html.slice(startSlotComment + SLOT_SYMBOL.length);

    return (
      <div ref={hostRef}>
        <SSRRaw data={beforeSlot}></SSRRaw>
        <Slot/>
        <SSRRaw data={afterSlot}></SSRRaw>
      </div>
    )
  }

  // Should be mount in this root element
  return (
    <>
      <div ref={hostRef}>
        <SSRRaw data={html}></SSRRaw>
      </div>
    </>
  )
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

/**
 * a wrapper `div` to render that content as VNodes.
 */
const StaticHtml = defineComponent({
	props: {
		value: String,
		name: String,
		hydrate: {
			type: Boolean,
			default: true,
		},
	},
	setup({ name, value, hydrate }) {
		if (!value) return () => null;
		const tagName = hydrate ? 'q-slot' : 'q-static-slot';
		return () => h(tagName, { name, innerHTML: value });
	},
});


export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

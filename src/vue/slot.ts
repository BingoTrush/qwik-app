/* eslint-disable qwik/use-method-usage */
import { $, useOn, useOnDocument, useSignal } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { defineComponent, h } from "vue";
import { type QwikifyOptions, type QwikifyProps } from "./types";

const HOST_PREFIX = 'host:';

/**
 * 给当前组件的挂载元素 注册 监听事件
 */
export const useWakeupSignal = (props: QwikifyProps<{}>, opts: QwikifyOptions = {}) => {
    const signal = useSignal(false);
    const activate = $(() => (signal.value = true));
  
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


/**
 * 获取 Host 节点 Props
 * @param props 
 * @returns 
 */
export const getHostProps = (props: Record<string, any>): Record<string, any> => {
  const obj: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (key.startsWith(HOST_PREFIX)) {
      obj[key.slice(HOST_PREFIX.length)] = props[key];
    }
  });
  return obj;
};

/**
 * 获取 VueCmp Props
 * @param props 
 * @returns 
 */
export const getVueProps = (props: Record<string, any>): Record<string, any> => {
  const obj: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (!key.startsWith('client:') && !key.startsWith(HOST_PREFIX)) {
      const normalizedKey = key.endsWith('$') ? key.slice(0, -1) : key;
      obj[normalizedKey] = props[key];
    }
  });
  return obj;
};

export const StaticHtml = defineComponent({
  props: {
    value: String,
    name: String,
    hydrate: {
      type: Boolean,
      default: false
    }
  },
  setup({ name, value, hydrate }) {
    if (!value) return () => null;
    const tagName = hydrate ? 'q-slot' : 'q-static-slot';
    return () => h(tagName, { key: name, domProps: { innerHTML: value }  })
  }
})
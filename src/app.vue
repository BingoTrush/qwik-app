<template>
    <div class="root" id="app">
        <h1>{{ title }}</h1>
        <button @click="increment">{{ count }}</button>
        <QwikChild msg="这是组件参数的测试">
            Child Slot
        </QwikChild>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Define, Setup } from 'vue-class-setup';
import QwikChild from './vue-component/qwik-child.vue';
@Setup
export class App extends Define<Props> {
    public count = 0;

    public readonly title = 'Root'

    public increment() {
        this.count++
    }
}

export default defineComponent({
    name: "app",
    ...App.inject()
})
</script>

<script lang=ts setup>
export interface Props {
    title?: string
}
defineEmits();
defineProps<Props>();
</script>

<style lang="less">
.root {
    h1 {
        color: @--color-primary;
    }
}
</style>


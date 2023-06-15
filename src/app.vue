<style lang="less">
.root {
    h1 {
        color: @--color-primary;
    }
}
</style>
<template>
    <div class="root">
        <h1>{{ title }}</h1>
        <button @click="increment">{{count}}</button>

        <!-- <StdAlert>{{ count }}</StdAlert> -->
        <slot></slot>
    </div>
</template>

<script lang="ts">
// import { StdAlert } from '@std/vui'
import { defineComponent } from 'vue';
import { Define, Setup } from 'vue-class-setup';

@Setup
export class App extends Define {
    public count = 0;
    public get title() {
        return `Root App`
    }

    public increment() {
        const result = 
        this.count++
    }
}

export default defineComponent({
    name: "app",
    ...App.inject()
})
</script>

<script lang=ts setup>
defineEmits();
defineProps();
</script>


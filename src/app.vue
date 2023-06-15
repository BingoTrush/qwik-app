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
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    public count = 0;
    public get title() {
        return `Root App`
    }

    public increment() {
        console.log('>>>>>', this.count);
        this.count++
    }
}
</script>


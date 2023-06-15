<template>
    <div class="vue2">
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
        return `Welcome to Qwik Vue2 SSR `
    }

    public increment() {
        console.log('>>>>>', this.count);
        this.count++
    }
}
</script>


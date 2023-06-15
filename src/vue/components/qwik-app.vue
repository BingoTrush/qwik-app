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
import { StdModal } from '@std/vui';
@Component
export default class App extends Vue {
    public count = 0;
    public get title() {
        return `Welcome to Qwik Vue2 SSR `
    }

    public increment() {
        
        this.count++
    }
}
</script>


<template>
    <div class="vue2">
        <h1>{{ title }}</h1>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
@Component
export default class App extends Vue {
    public get title() {
        return `Welcome to Qwik Vue2 SSR `
    }
}
</script>


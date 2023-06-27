<template>
    <div class="qwik-child">
        <p>{{ title }}</p>
        <slot></slot>
        <p>{{ msg }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    @Prop({type: String, default: ''})
    public msg!: string;

    public get title() {
        return "Qwik Child"
    }
}
</script>


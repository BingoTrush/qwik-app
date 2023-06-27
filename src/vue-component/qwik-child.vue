<template>
    <div class="qwik-child">
        <p>{{ title }}</p>
        <slot></slot>
        <p>{{ msg }}</p>
        <!-- <StdButton/> -->
        <Button>Iview Button</Button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Button } from 'view-design';
@Component({
    components: {
        // StdButton
        Button
    }
})
export default class App extends Vue {
    @Prop({type: String, default: ''})
    public msg!: string;

    public get title() {
        return "Qwik Child"
    }
}
</script>


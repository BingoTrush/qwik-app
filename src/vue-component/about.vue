<template>
    <div class="about">
        <slot></slot>
        <p>{{ msg }}</p>
        <Button>{{ title }}</Button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Button } from 'view-design';
@Component({
    components: {
        Button
    }
})
export default class App extends Vue {
    @Prop({type: String, default: ''})
    public msg!: string;

    public get title() {
        return "About Page"
    }
}
</script>


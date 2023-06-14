<template>
    <StdAlert>
        {{ title }}
    </StdAlert>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { StdAlert } from '@std/vui';

@Component({
    components: {
        StdAlert
    }
})
export default class App extends Vue {
    public get title() {
        return `@std/vui test`
    }
}
</script>


<template>
    <div class="vue3">
        <h1 :class="['txt', { red: count > 5 }]">Welcome to Qwik + Vue3 </h1>

        <button @click="count++">{{count}}</button>
        <slot name="default"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import { StdButton } from '@std/vui';
const count = ref(0);


</script>

<style lang="less">
.vue3 {
    text-align: center;
}

.txt {
    color: @--color-primary;
}

.red {
    color: @--color-danger;
}
</style>

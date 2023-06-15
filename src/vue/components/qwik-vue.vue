<style lang="less">
.vue3 {
    text-align: center;
}

.txt {
    color: @--color-primary;
}
</style>

<template>
    <div class="vue3">
        <h1 class="txt">Welcome to Qwik + Vue3 </h1>

        <button @click="count++">{{ count }}</button>

        <StdButton @click="count++">
            {{ count }}
        </StdButton>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { StdButton } from '@std/vui';
const count = ref(0);

</script>

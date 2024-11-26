<script setup lang="ts">
</script>

<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style lang="css" scoped>
.loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--neutral-gray);
    backdrop-filter: blur(1px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

.loader {
    width: 50px;
    height: 50px;
    border: 6px solid var(--neutral-gray);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin var(--transition-speed) linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
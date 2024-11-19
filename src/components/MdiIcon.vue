<script setup lang="ts">
interface IProps {
  icon: string;
  size: number;
  color: string;
}

const props = defineProps<IProps>();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    :fill="color"
  >
    <path :d="icon" />
  </svg>
</template>

<style lang="css" scoped>
svg {
  background-color: transparent;
}
</style>

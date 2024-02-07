<script setup lang="ts">

const props = defineProps<{
  isOpen?: boolean
}>()
</script>

<template>
  <button type="button" :class="['toggle-button', 'base-button', { open: props?.isOpen }]">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style scoped lang="scss">
.toggle-button {
  svg {
    transform: rotate(0deg);
    transition: transform 0.2s ease-in-out;
  }
  &.open {
    background-color: var(--light-primary-color);

    svg {
      transform: rotate(180deg);
      path {
        stroke: var(--primary-color);
      }
    }
  }
}
</style>
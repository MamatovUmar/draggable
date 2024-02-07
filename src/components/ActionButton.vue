<script setup lang="ts">

import { onBeforeMount, onMounted, ref } from 'vue';

const isOpen = ref(false)
const buttonRef = ref<HTMLElement>()

function handleClickOutside(event: MouseEvent) {
  if (!event.target) return
  const target = event.target as HTMLElement
  if (!buttonRef.value?.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mouseup', handleClickOutside);
})

onBeforeMount(() => {
  document.removeEventListener('mouseup', handleClickOutside);
})
</script>

<template>
  <div ref="buttonRef" class="action-button">
    <button
      type="button"
      class="base-button action-button__trigger"
      @click="isOpen = !isOpen"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z" fill="#397AF5"/>
      </svg>
    </button>

    <div v-if="isOpen" class="action-button__dropdown actions">
      <div class="actions__item">
        <img src="@/assets/images/edit.svg" alt="edit">
        Редактировать
      </div>

      <div class="actions__item">
        <img src="@/assets/images/trash.svg" alt="trash">
        Удалить
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.action-button {
  transition: 0.3s;
  position: relative;

  &__trigger {
    background: transparent;
    &:hover, &.active {
      background-color: var(--primary-color);

      svg {
        path {
          fill: #ffffff;
          stroke: #ffffff;
        }
      }
    }
  }

  .actions {
    box-shadow: 0 4px 4px 0 #0000000F;
    position: absolute;
    background: #FFFFFF;
    right: 0;
    z-index: 10;
    padding: 4px;
    border-radius: var(--small-border-radius);

    &__item {
      transition: 0.3s;
      display: flex;
      border-radius: var(--small-border-radius);
      padding: 10px 15px 10px 10px;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 15px;
      line-height: 20px;
      color: var(--base-text-color);
      &:hover {
        background-color: var(--light-primary-color);
      }
    }
  }

}
</style>
<script setup lang="ts">
import MainTheme from '@/components/MainTheme.vue';
import items from '@/constants/themes'
</script>

<template>
  <main class="page">
    <div class="container">

      <h1 class="page__title">
        Список тем обращения и продуктов
      </h1>

      <div class="page__body">
        <MainTheme v-for="item of items" :key="item.id" :item="item" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding: 40px 0;

  &__title {
    font-size: 28px;
    line-height: 34px;
    margin-top: 0;
    margin-bottom: 40px;
    padding: 0;
  }
  &__body {

  }
}
</style>

<script setup lang="ts">
import ThemeItem from '@/components/ThemeItem.vue'
import items from '@/constants/themes'
import { Container, Draggable } from 'vue-dndrop'
import { useDrag } from '@/composable/useDrag.ts'

const { onDrop, myList } = useDrag(items)

</script>

<template>
  <main class="page">
    <div class="container">

      <h1 class="page__title">
        Список тем обращения и продуктов
      </h1>

      <Container @drop="onDrop">
        <Draggable v-for="item in myList" :key="item.id">
          <ThemeItem :key="item.id" :item="item"/>
        </Draggable>
      </Container>
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
}
</style>

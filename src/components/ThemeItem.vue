<script setup lang="ts">

import { ITheme } from '@/types/theme.ts'
import { computed, ref } from 'vue'
import ToggleButton from '@/components/ToggleButton.vue'
import { useDrag } from '@/composable/useDrag.ts'
import { Container, Draggable } from 'vue-dndrop'
import ActionButton from '@/components/ActionButton.vue';

const props = defineProps<{
  item: ITheme
  child?: boolean
  parentSequence?: string
}>()

const { onDrop, myList } = useDrag(props.item?.children ?? [])

const showChildren = ref(false)

// получаем название подкатегории как строка
const subCategories = computed<string>(() => {
  const childrenNames = myList.value.map(el => el.name) ?? []
  return childrenNames.join(' / ')
})

const gridColumns = computed(() => {
  if (myList.value.length) {
    return '50px 1fr 1fr calc((100% - 270px) / 2) 160px'
  }
  return '50px calc((100% - 270px) / 2) calc((100% - 270px) / 2) 160px'
})

const order = computed(() => {
  if (props.parentSequence) {
    return `${props.parentSequence}.${props.item.sequence}`
  }
  return String(props.item.sequence)
})

</script>

<template>
  <section :class="['theme-row', { child }]">

    <div
      class="theme-row__body"
      :style="`grid-template-columns: ${gridColumns}`"
    >
      <div class="theme-row__column column">
        <div class="column__label">№</div>
        <div class="column__text">{{ order }}</div>
      </div>

      <div class="theme-row__column column">
        <div class="column__label">Название</div>
        <div :class="['column__text', { 'bold-text': !child }]">
          <img v-if="child" src="@/assets/images/file.svg" alt="file">
          <img v-else src="@/assets/images/folder.svg" alt="folder">
          {{ item.name }}
        </div>
      </div>

      <div class="theme-row__column column">
        <div class="column__label">Очередность</div>
        <div class="column__text">{{ item.sequence }}</div>
      </div>

      <div v-if="myList.length" class="theme-row__column column">
        <div class="column__label">Подкатегории</div>
        <div class="column__text text-ellipsis">{{ subCategories }}</div>
      </div>

      <div class="theme-row__column actions">
        <div v-if="myList.length" class="theme-row__children-count">
          {{ myList.length }}
        </div>

        <ToggleButton
          v-if="myList.length"
          :is-open="showChildren"
          @click="showChildren = !showChildren"
        />

        <ActionButton />
      </div>
    </div>

    <div v-if="myList.length && showChildren" class="theme-row__children">
      <Container @drop="onDrop">
        <Draggable v-for="item in myList" :key="item.id">
          <ThemeItem
            :item="item"
            child
            :parent-sequence="order"
          />
        </Draggable>
      </Container>
    </div>
  </section>
</template>

<style scoped lang="scss">
.theme-row {
  background-color: var(--row-background);
  border-radius: var(--row-border-radius);
  user-select: none;
  box-sizing: border-box;
  margin-bottom: 12px;
  &:not(:last-child) {
    margin-bottom: 4px;
    border-bottom: var(--border-style);
  }

  &__body {
    display: grid;
    gap: 20px;
    padding: var(--row-offset);
    box-sizing: border-box;
  }
  &.child {
    border-radius: 0;
  }
  &.child &__body {
    padding: var(--row-child-offset);
  }
  &__children {
    border-top: var(--border-style);
    box-sizing: border-box;
    padding: var(--row-children-offset);
    position: relative;
  }
  &.child &__children {
    padding-left: 0;
    padding-right: 0;
  }
  &__children-count {
    background: var(--row-children-count-bg);
    font-size: 12px;
    line-height: 15px;
    padding: 3px 10px 2px;
    border-radius: 30px;
    color: #ffffff;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }
  .column {
    &__label {
      color: var(--row-label-color);
      line-height: 14px;
      margin-bottom: 9px;
      font-size: 12px;
    }
    &__text {
      font-size: 16px;
      line-height: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
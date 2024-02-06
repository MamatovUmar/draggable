<script setup lang="ts">

import { ITheme } from '@/types/theme.ts';
import { computed, ref } from 'vue';
import ToggleButton from '@/components/ToggleButton.vue';

const { item, child, parentSequence } = defineProps<{
  item: ITheme
  child?: boolean
  parentSequence?: string
}>()

const showChildren = ref(false)

const children = computed(() => item?.children ?? [])

const subCategories = computed<string>(() => {
  const childrenNames = children.value.map(el => el.name) ?? []
  return childrenNames.join(' / ')
})

const gridColumns = computed(() => {
  if (children.value.length) {
    return '50px 1fr 1fr calc((100% - 270px) / 2) 160px'
  }
  return '50px calc((100% - 270px) / 2) calc((100% - 270px) / 2) 160px'
})

const order = computed(() => {
  if (parentSequence) {
    return `${parentSequence}.${item.sequence}`
  }
  return String(item.sequence)
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

      <div v-if="children.length" class="theme-row__column column">
        <div class="column__label">Подкатегории</div>
        <div class="column__text text-ellipsis">{{ subCategories }}</div>
      </div>

      <div class="theme-row__column actions">
        <div v-if="children.length" class="theme-row__children-count">
          {{ children.length }}
        </div>
        <ToggleButton
          v-if="children.length"
          :is-open="showChildren"
          @click="showChildren = !showChildren"
        />
      </div>
    </div>

    <Transition name="slide">
      <div v-if="children.length && showChildren" class="theme-row__children">
        <MainTheme
          v-for="child of children"
          :key="`child-${child.id}`"
          :item="child"
          child
          :parent-sequence="order"
        />
      </div>
    </Transition>
  </section>
</template>

<style scoped lang="scss">
.theme-row {
  background-color: var(--row-background);
  border-radius: var(--row-border-radius);
  user-select: none;
  box-sizing: border-box;
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
    overflow: hidden;
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
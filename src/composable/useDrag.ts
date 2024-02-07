import { ref } from 'vue';
import { ITheme } from '@/types/theme.ts';

export const useDrag = (items: ITheme[]) => {

  const myList = ref<ITheme[]>(items)

  /**
   * запускается после завершение перетаскивание
   * @param e
   */
  function onDrop(e: DropEvent) {
    // находим нужный объект
    const element = myList.value.splice(e.removedIndex, 1)[0];

    // перемещаем на новое место
    myList.value.splice(e.addedIndex, 0, element)

    // изменяем очередность после перетаскивание
    myList.value.forEach((el, index) => {
      el.sequence = index + 1
    })
  }

  return {
    onDrop,
    myList
  }

}

interface DropEvent {
  addedIndex: number
  removedIndex: number
  element: HTMLElement
}
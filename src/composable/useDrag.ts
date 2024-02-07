import { ref } from 'vue';
import { ITheme } from '@/types/theme.ts';

export const useDrag = (items: ITheme[]) => {

  const myList = ref<ITheme[]>(items)

  /**
   * запускается после завершение перетаскивание
   * @param e
   */
  function onDrop(e: DropEvent) {
    swapElements(myList.value, e.removedIndex, e.addedIndex)

    // изменяем очередность после перетаскивание
    myList.value.forEach((el, index) => {
      el.sequence = index + 1
    })
  }

  /**
   * заменяет местами элементов массива
   * @param arr
   * @param index1
   * @param index2
   */
  function swapElements(arr: ITheme[], index1: number, index2: number) {
    if (index1 < 0 || index1 >= arr.length || index2 < 0 || index2 >= arr.length) {
      console.error('Invalid index')
      return;
    }
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  }

  return {
    swapElements,
    onDrop,
    myList
  }

}

interface DropEvent {
  addedIndex: number
  removedIndex: number
  element: HTMLElement
}
import { ITheme } from '@/types/theme.ts';

export default [
  {
    id: 1,
    name: 'Mastercard',
    sequence: 1,
    children: [
      {
        id: 2,
        name: 'Mastercard (Standard)',
        sequence: 1
      },
      {
        id: 3,
        name: 'Mastercard (Platinum)',
        sequence: 2
      },
      {
        id: 4,
        name: 'Mastercard (Gold)',
        sequence: 3
      },
      {
        id: 5,
        name: 'Master card',
        sequence: 4
      }
    ]
  },
  {
    id: 6,
    name: 'вклады',
    sequence: 2,
    children: [
      {
        id: 7,
        name: 'Максимал фойда (Нац. валюта)',
        sequence: 1
      },
      {
        id: 8,
        name: 'Аванс (Нац. валюта)',
        sequence: 2
      },
      {
        id: 9,
        name: 'Максимал фойда',
        sequence: 3
      }
    ]
  },
  {
    id: 10,
    name: 'Кредиты',
    sequence: 3,
    children: [
      {
        id: 11,
        name: 'Ипотека',
        sequence: 1
      },
      {
        id: 12,
        name: 'Потребительский',
        sequence: 2,
        children: [
          {
            id: 13,
            name: 'Микрозайм',
            sequence: 1
          },
          {
            id: 14,
            name: 'Тезкор',
            sequence: 2
          }
        ]
      }
    ]
  }
] as ITheme[]
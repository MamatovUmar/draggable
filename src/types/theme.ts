export interface ITheme {
  id: number
  name: string
  sequence: number
  children?: ITheme[]
}
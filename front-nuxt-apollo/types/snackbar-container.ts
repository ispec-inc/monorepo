export type SnackbarData = {
  id: string
  type: 'success' | 'error'
  message: string
  duration: number
}

export interface ISnackbarConteiner {
  addSnackbar(data: Omit<SnackbarData, 'id' | 'duration'>, duration?: number): void
}

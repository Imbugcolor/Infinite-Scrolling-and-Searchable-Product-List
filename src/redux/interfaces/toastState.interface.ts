export const TOAST = 'TOAST'

export interface ToastState {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}

export interface ToastActionType {
    type: typeof TOAST,
    payload: ToastState,
}
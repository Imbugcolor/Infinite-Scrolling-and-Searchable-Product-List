import { TOAST, ToastActionType, ToastState } from "../interfaces/toastState.interface";

const toastReducer = (state: ToastState = {}, action: ToastActionType): ToastState => {
    switch (action.type) {
        case TOAST: 
            return action.payload
        default:
            return state
    }
}

export default toastReducer;
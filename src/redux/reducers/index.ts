import { combineReducers } from 'redux'
import toast from './toast.reducer'
import products from './products.reducer'
import categories from './categories.reducer'

export default combineReducers({
    toast,
    products,
    categories,
})
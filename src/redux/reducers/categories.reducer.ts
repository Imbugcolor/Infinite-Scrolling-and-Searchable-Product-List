import * as types from '../interfaces/categoriesSate.interface'

const initialState: types.CategoriesState = {
    data: [],
}

const productReducer = (state: types.CategoriesState = initialState, action: types.CategoriesActionType) : types.CategoriesState => {
    switch(action.type) {
        case types.GET_CATEGORIES:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default productReducer
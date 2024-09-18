import * as types from "../interfaces/productState.interface";

const initialState: types.ProductState = {
    data: [],
    total: 0,
    skip: 0,
    limit: 0,
    search: '',
    category: '',
    filter: {
        sortBy: '',
    },
    loading: false
}

const productReducer = (state: types.ProductState = initialState, action: types.ProductActionType) : types.ProductState => {
    switch(action.type) {
        case types.GET_PRODUCTS:
            return {
                ...state,
                ...action.payload,
            }
        case types.SET_LOADING: 
            return {
                ...state,
                loading: action.payload
            }
        case types.UPDATE_PRODUCTS:
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                total: action.payload.total,
                skip: action.payload.skip,
                limit: action.payload.limit,
            }
        default:
            return state
    }
}

export default productReducer
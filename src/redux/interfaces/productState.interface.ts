import { Product } from "../../utils/interfaces/product.interface"

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SET_LOADING = 'SET_LOADING'
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const SORT_PRODUCT = 'SORT_PRODUCT'
export const FILTER_BY_CATE = 'FILTER_BY_CATE'

export interface ProductState {
    data: Product[]
    total: number,
    skip: number,
    limit: number,
    search: string,
    category: string,
    filter: FilterProduct,
    loading?: boolean,
}

export interface UpdateProductState {
    data: Product[]
    total: number,
    skip: number,
    limit: number,
}

export interface FilterProduct {
    sortBy: string
}

export interface SetLoading {
    type: typeof SET_LOADING,
    payload: boolean,
}

export interface GetProducts {
    type: typeof GET_PRODUCTS,
    payload: ProductState
}

export interface UpdateProducts {
    type: typeof UPDATE_PRODUCTS,
    payload: UpdateProductState,
}

export type ProductActionType = GetProducts | UpdateProducts | SetLoading
import { Category } from "../../utils/interfaces/category.interface";

export const GET_CATEGORIES = 'GET_CATEGORIES'

export interface CategoriesState {
    data: Category[]
}

export interface GetCategories {
    type: typeof GET_CATEGORIES,
    payload: Category[]
}

export type CategoriesActionType = GetCategories
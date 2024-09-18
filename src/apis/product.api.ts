import { FilterProduct } from "../redux/interfaces/productState.interface";
import { getAPI } from "../utils/fetch";
import { Category } from "../utils/interfaces/category.interface";
import { GetProductsResponse } from "../utils/interfaces/product.response";

const PRODUCT_URL_ENDPOINT = `products`

export const productApis = {
    async getList(limit?: number, skip?: number, search?: string, filter?: FilterProduct) : Promise<GetProductsResponse> {
        // path params url endpoint 
        let params = ''

        // add path search endpoint when search
        if(search) params += `/search?q=${search}`

        // query params 
        let queryString = params ? '' : '?'; 

        // add to query if it have
        if(limit) queryString += `&limit=${limit}`
        if(skip) queryString += `&skip=${skip}`

        // add all field in filter object to query string to query
        if(filter) {
            Object.keys(filter).map(key => {
                return queryString += `&${key}=${(filter as any)[key]}`
            })
        }

        return await getAPI<GetProductsResponse>(`${PRODUCT_URL_ENDPOINT}${params}${queryString}`)
    },
    async getCategories() : Promise<Category[]> {
        return await getAPI<Category[]>(`${PRODUCT_URL_ENDPOINT}/categories`)
    },
    async getProductListByCategory({ limit = 0, skip = 0, category }:{limit?: number, skip?: number, category: string}): Promise<GetProductsResponse> {
        let queryString = '?'; 

        if(limit) queryString += `&limit=${limit}`
        if(skip) queryString += `&skip=${skip}`
        
        return await getAPI<GetProductsResponse>(`${PRODUCT_URL_ENDPOINT}${category && `/category/${category}`}${queryString}`)
    }
}
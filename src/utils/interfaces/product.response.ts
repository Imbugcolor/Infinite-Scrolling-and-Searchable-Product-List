import { Product } from "./product.interface";

export interface GetProductsResponse {
    products: Product[],
    limit: number,
    skip: number,
    total: number,
}
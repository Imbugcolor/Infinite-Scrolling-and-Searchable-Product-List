import React, { useEffect } from 'react'
import { useTypedDispatch } from '../../redux/store'
import { getProducts } from '../../redux/actions/products.action'
import ProductList from './ProductList'
import { getCategories } from '../../redux/actions/categories.action'
import Filter from '../Filter/Filter'
import { TOAST } from '../../redux/interfaces/toastState.interface'

const Products = () => {
    const dispatch = useTypedDispatch()

    useEffect(() => {
          dispatch({ type: TOAST, payload: { loading: true }})
          dispatch(getProducts({}))
          dispatch(getCategories())
          dispatch({ type: TOAST, payload: { loading: false }})
    }, [dispatch])

    return (
        <div>
            <Filter />
            <ProductList />
        </div>
    )
}

export default Products

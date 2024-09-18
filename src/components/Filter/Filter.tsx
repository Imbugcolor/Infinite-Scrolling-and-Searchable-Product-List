import "./filter.css"
import React, { useCallback, useState } from 'react'
import { RootStore, useTypedDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { getProducts, getProductsByCategory } from '../../redux/actions/products.action'
import useDebounce from '../../hooks/useDebounce'
import { InputChange } from "../../utils/types/html-element.type"
import SmLoading from '../../images/loading.gif'

const Filter = () => {
    const products = useSelector((state: RootStore) => state.products)
    const categories = useSelector((state: RootStore) => state.categories)

    const dispatch = useTypedDispatch()

    const [searchInput, setSearchInput] = useState(products.search || '')
    const [loading, setLoading] = useState(false)

    // Use the custom debounce hook to delay the search function
    const debouncedSearch = useDebounce((value: string) => {
        setLoading(true)
        dispatch(getProducts({ search: value }))
        setLoading(false)
    }, 500); // 500ms debounce delay

    // Handle input changes and pass the value to the debounced function
    const handleInputChange = useCallback((e: InputChange) => {
        const value = e.target.value;
        setSearchInput(value) // Change the value state
        debouncedSearch(value); // Call debounced search function
    }, [debouncedSearch]);

    // Sort
    const handleSortProducts = async (e: InputChange) => {
        dispatch(getProducts({
            limit: products.category ? 0 : products.limit,
            skip: products.category ? 0 : products.skip,
            search: products.search,
            filter: { ...products.filter, sortBy: e.target.value }
        }))
    }

    // Category filter
    const handleFilterByCategory = async (e: InputChange) => {
        setSearchInput('')
        dispatch(getProductsByCategory({ category: e.target.value }))
    }

    return (
        <div className="filter_menu">
            <div className="search">
                <div className="search_input_container" >
                    <input type="text" placeholder="Type to search products..."
                        value={searchInput}
                        onChange={handleInputChange}
                    />
                    <div className="search_loading">
                        {
                            loading &&
                            <img src={SmLoading} alt="loading"/>
                        }
                    </div>
                </div>
            </div>
            <div className="categories">
                <div className="categories_select">
                    <label>Categories</label>
                    <select value={products.category} onChange={handleFilterByCategory}>
                        <option value="">All Categories</option>
                        {
                            categories.data.map(category => (
                                <option key={category.slug} value={category.slug}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="sort">
                <div className="sort_select">
                    <label>sort by</label>
                    <select value={products.filter.sortBy} onChange={handleSortProducts}>
                        <option value="">Newest</option>
                        <option value="createdAt&order=asc">Oldest</option>
                        <option value="rating&order=desc">Best Rating</option>
                        <option value="price&order=desc">Price: High -&gt; Low</option>
                        <option value="price&order=asc">Price: Low -&gt; High</option>
                    </select>
                </div>
            </div>
        </div >
    )
}

export default Filter

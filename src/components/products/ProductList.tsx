import './product-list.css'
import { useSelector } from 'react-redux'
import { RootStore, useTypedDispatch } from '../../redux/store'
import ProductItem from './ProductItem'
import { useCallback, useEffect, useState } from 'react'
import { updateProductList } from '../../redux/actions/products.action'
import { TOAST } from '../../redux/interfaces/toastState.interface'
import LoadingGif from '../../images/loading.gif'
import useDebounce from '../../hooks/useDebounce'

const ProductList = () => {
    const products = useSelector((state: RootStore) => state.products)
    const dispatch = useTypedDispatch()

    const [loading, setLoading] = useState(false)
    const { data, limit, skip, total, ...productsState } = products

    //--------------- Infinite scroll ------------------//
    // Load more 20 records
    const handleLoadMore = useCallback(async () => {
        if (!loading) {
            try {
                setLoading(true);
                await dispatch(updateProductList({ limit: 20, skip: limit + skip, ...productsState }));
            } catch (err: any) {
                console.log(err)
                dispatch({ type: TOAST, payload: { error: err.message } });
            } finally {
                setLoading(false); 
            }
        }
    }, [limit, skip, productsState, dispatch, loading]);
    
    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const innerHeight = window.innerHeight;
    
        // Check if the user has scrolled to the bottom and skip + limit less than total records
        if (innerHeight + scrollTop + 1 >= scrollHeight && !loading && (skip + limit) < total) {
            handleLoadMore();
        }
    }, [handleLoadMore, loading, skip, limit, total]);

    
    // Use the debounced scroll handler to prevent call handleScroll multiple times in same time
    const debouncedScroll = useDebounce(handleScroll, 100); // Debounce the scroll event by 100ms

    // Listening scroll event 
    useEffect(() => {
        window.addEventListener('scroll', debouncedScroll);
        return () => window.removeEventListener('scroll', debouncedScroll);
    }, [debouncedScroll]);
    
    return (
        <div className="products_list_container">
            <div className='products'>
                <div className='products_count'>
                    {
                        products.total !== 0 ? <span className='number_total_products'>{products.total} products</span> :
                            <span className='number_total_products'>There are no products.</span>
                    }
                </div>

                <div className='products_display'>
                    {
                        products.data?.length > 0 && products.data.map(product => {
                            return <div className="column" key={product.id}>
                                <ProductItem product={product} />
                            </div>
                        })
                    }
                </div>

                {
                    loading && <img src={LoadingGif} alt='loading' className='load_more'/>
                }
            </div>
        </div>
    )
}

export default ProductList

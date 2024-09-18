import React from 'react'
import './product-item.css'
import { Product } from '../../utils/interfaces/product.interface'
import Rating from '../rating/Rating'

const ProductItem = ({ product }: { product: Product }) => {
    return (
          <div className="product_card">
            <div className="product_img">
              {
                product.images.length > 0 &&
                <img className="product_img-0" src={product.thumbnail} alt="product_thumbnail"/>
              }
            </div>
            <div className="product_box">
              <h3 title={product.title}>
                  {product.title}
              </h3>
              <Rating
                color="#ffce3d"
                value={product.rating as number}
                text={`${product.reviews.length} reviews`}
              />
              <h4 className="product_price">${product.price}</h4>
            </div>
          </div>
      )
}

export default ProductItem

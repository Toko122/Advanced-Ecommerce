'use client'

import Link from 'next/link'
import React from 'react'

const ProductCard = ({cardWidth, product, AddToCart }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-2xl transition p-4 max-w-[400px] h-[420px]"
      style={{ minWidth: `${cardWidth}px` }}
    >
      <div className="w-full h-48 rounded-xl overflow-hidden">
        <img
          src={product.images?.main}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h1>

        <p className="text-sm text-gray-700 line-clamp-2">
          {product.description}
        </p>

        <div className='w-full flex items-center justify-between px-2'>
          <p className="text-xl font-bold text-green-600 mt-1">
            {product.price} ₾
          </p>
          <p className="text-xl font-bold text-gray-500 mt-1 line-through">
            {product.oldPrice} ₾
          </p>
        </div>

        <div className="flex gap-3 mt-3">
          <Link 
            href={`/features/productDetails/${product._id}`} 
            className="flex-1 text-center cursor-pointer bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">
            View
          </Link>

          <button 
            onClick={() => AddToCart(product._id)} 
            className="flex-1 cursor-pointer bg-[#202020] text-white py-2 rounded-xl hover:bg-[#343131] transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

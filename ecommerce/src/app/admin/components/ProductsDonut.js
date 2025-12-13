'use client'
import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'

const ProductsDonut = () => {
  const [products, setProducts] = useState([])
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/product/getProducts')
        setProducts(res.data.products)
      } catch (err) { 
        console.log(err)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className='bg-gray-100 rounded-3xl shadow-2xl p-6 w-[300px] h-[400px] flex flex-col items-center justify-center'>
      
      <div className='flex justify-center items-center w-full mt-4'>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative border-8 border-green-500 rounded-full bg-white h-[200px] w-[200px] flex items-center justify-center shadow-lg cursor-pointer
                      transition-all duration-500 transform ${hovered ? 'scale-110 shadow-2xl' : 'scale-100 shadow-lg'}`}
        >
          <div
            className={`absolute text-center transition-all duration-500
                        ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <span className='text-2xl font-bold text-gray-900 px-5 py-3 rounded-md shadow-md'>
              {products.length} Products
            </span>
          </div>

          {!hovered && (
            <span className='text-gray-500 font-medium text-center transition-opacity duration-300'>
              Hover to see count
            </span>
          )}
        </div>
      </div>

      <div className='mt-6 text-center transition-all duration-500'>
        <h2 className='text-xl font-semibold text-gray-800'>Total Products</h2>
        <p className='text-gray-600 mt-1'>Hover the circle to see how many products are available</p>
      </div>
      
    </div>
  )
}

export default ProductsDonut

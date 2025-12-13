'use client'

import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Spinner } from './ui/spinner'

const BestProductsSection = () => {
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  const [loading, setLoading] = useState(false) 

  const cardWidth = 250
  const gap = 24
  const slideWidth = cardWidth + gap
  const maxVisible = 5

  useEffect(() => {
    const fetchRating = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/product/getProducts')
        setProducts(res.data.products)
      } catch (err) {
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
    fetchRating()
  }, [])

  const filteredProducts = products.filter(product => product.rating >= 4)

  const addToCart = async (productId) => {
    try {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

      if (!userId) {
        router.push('/features/auth/login')
        return
      }

      await axios.post(`/cart/addToCart/${productId}`, { userId, productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      window.dispatchEvent(new Event('cart updated'))
    } catch (err) {
      console.log(err)
    }
  }

  const goToNext = () => {
    if (currentIndex < filteredProducts.length - maxVisible) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const goToBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <div className='w-full flex justify-center py-8'>
      <div className='w-full max-w-[1300px] flex flex-col gap-4 relative xl:px-0 px-6'>

        <h1 className='font-semibold text-black text-2xl md:text-3xl mb-4'>Best Products</h1>

        <div className='relative overflow-hidden'>
          <div
            className='flex gap-4 transition-transform duration-500 bg-white' 
            style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
          >
            {
              loading ? (
                <div className='flex items-center gap-2 justify-center w-full h-full'>
                  <Spinner />
                  Loading
                </div>
              ) : ( 
                filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      AddToCart={addToCart}
                      cardWidth={cardWidth}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No products with rating above 4.</p>
                )
              )
            }
          </div>

          {currentIndex > 0 && (
            <button
              onClick={goToBack}
              className='absolute top-1/2 cursor-pointer left-2 sm:left-0 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 transition rounded-full p-2 z-10'
            >
              <IoIosArrowBack className='text-2xl sm:text-3xl' />
            </button>
          )}

          {currentIndex < filteredProducts.length - maxVisible && (
            <button
              onClick={goToNext}
              className='absolute top-1/2 cursor-pointer right-2 sm:right-0 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 transition rounded-full p-2 z-10'
            >
              <IoIosArrowForward className='text-2xl sm:text-3xl' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BestProductsSection

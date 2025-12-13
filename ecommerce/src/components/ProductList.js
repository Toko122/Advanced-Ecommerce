'use client'

import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Spinner } from './ui/spinner'

const ProductList = ({filtered}) => {

  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
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
    fetchProduct()
  }, [])

  const AddToCart = async (productId) => {
    try {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

      if (!userId) {
        router.push('/features/auth/login')
        return
      }

      await axios.post(`/cart/addToCart/${productId}`, {
        userId,
        productId,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      window.dispatchEvent(new Event('cart updated'))

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {
        loading ? (
         <div className="col-span-full text-center text-gray-500 py-20 flex gap-2 items-center justify-center">
           <Spinner />
           Loading
        </div>
        ) : (
          filtered.length > 0 ? (
        filtered.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            AddToCart={AddToCart}
            
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-20">
          No products found.
        </div>
      )
        )
      }
    </div>
  )
}

export default ProductList

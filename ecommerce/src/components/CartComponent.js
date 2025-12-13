'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

const CartComponent = () => {

    const [cart, setCart] = useState({products: [], totalQuantity: 0})
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
    
    const fetchCart = async() => {
        try{
           const res = await axios.get(`/cart/getUserCart/${userId}`)
           setCart({products: res.data.products, totalQuantity: res.data.totalQuantity})
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
    fetchCart()
  }, [])

   const handleRemove = async(productId) => {
       try{
         const res = await axios.delete(`/cart/DeleteFromCart/${productId}`, {
            data: {userId}
         })
         const filtered = cart.products.filter((product) => product.productId._id !== productId)
         const totalQuantity = filtered.reduce((acc, item) => acc + item.quantity, 0)
         setCart({products: filtered, totalQuantity})
       }catch(err){
          console.log(err);
       }
   }

     const handleIncrease = async (productId) => {
          try{
            const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

            if(!userId){
              router.push('/features/auth/login')
              return;
            }
 
            const res = await axios.put('/cart/increase', {
                userId: userId,
                productId,
                quantity: quantity
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

            setCart(prev => {
               const updatedProduct = prev.products.map((item) => {
                   if(item.productId?._id === productId){
                    return {...item, quantity: item.quantity + 1}
                   }
                   return item
               })
               const totalQuantity = updatedProduct.reduce((acc, item) => acc + item.quantity, 0)
               return {products: updatedProduct, totalQuantity}
            })
            
            window.dispatchEvent(new Event('cart updated'))
          }catch(err){
             console.log(err);
          }        
     }


     const handleDecrease = async (productId, currentQuantity) => {
          if (currentQuantity === 1) {
             handleRemove(productId)
             return
           }         
          try{
            setCart((prev) => {
               const updatedProduct = prev.products.map((item) => {
                  if(item.productId?._id === productId){
                     return {...item, quantity: item.quantity - 1}
                  }
                  return item
               })
               const totalQuantity = updatedProduct.reduce((acc, item) => acc + item.quantity, 0)
               return { products: updatedProduct, totalQuantity }
            })

            const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

            if(!userId){
              router.push('/features/auth/login')
              return;
            }

            const res = await axios.put('/cart/decrease', {
                 userId, productId
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

          }catch(err){
            console.log(err)
          }
     }

     const sortedCart = [...cart.products].reverse()

     const totalPrice = useMemo(() => {
        return cart.products.reduce(
          (acc, item) => acc + item.productId?.price * item.quantity, 0
        )
     }, [cart.products])

  return (
   <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">

      <h1 className="text-4xl font-bold mb-10 text-gray-900">
        Your Cart <span className="text-indigo-600">({cart.totalQuantity} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-6">

          {sortedCart.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6"
            >
              <img
                src={item.productId?.images?.main || '/placeholder.png'}
                className="w-32 h-32 object-cover rounded-xl shadow-sm"
              />

              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold text-gray-900">{item.productId?.name}</h3>
                <p className="text-indigo-600 font-medium mt-1 text-lg">${item.productId?.price}</p>

                <div className="flex items-center mt-4 bg-gray-100 rounded-full w-fit px-1 py-1">
                  <button onClick={() => handleDecrease(item.productId?._id, item.quantity)} className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
                    <AiOutlineMinus />
                  </button>
                  <span className="px-5 font-semibold text-gray-900">{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.productId?._id)} className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.productId?._id)}
                className="p-3 bg-red-50 cursor-pointer hover:bg-red-100 rounded-full text-red-500 hover:text-red-700 transition"
              >
                <AiOutlineDelete size={22} />
              </button>
            </div>
          ))}   

          {cart.products.length === 0 && (
            <div className="text-center text-gray-500 py-10 text-lg">
              Your cart is empty 🛒
            </div>
          )}
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 h-fit sticky top-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Order Summary</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">
                ${totalPrice}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-5 flex justify-between text-2xl font-semibold">
            <span>Total</span>
            <span>
              ${totalPrice}
            </span>
          </div>

          <button className="w-full cursor-pointer mt-8 bg-indigo-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-indigo-700 shadow-md hover:shadow-lg transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartComponent 

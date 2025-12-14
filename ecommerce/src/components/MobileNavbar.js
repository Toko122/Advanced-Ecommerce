'use client'

import { useAuth } from '@/app/features/auth/AuthProvider';
import axios from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoClose } from "react-icons/io5";

const MobileNavbar = ({onClose}) => {

     const modalRef = useRef()
     const {isLoggedIn, logout} = useAuth()
     const router = useRouter()
     const [quantity, setQuantity] = useState(0)
     const [userId, setUserId] = useState(null)
     
         useEffect(() => {
            const id = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
            setUserId(id)
      }, [])

     const handleLogout = () => {
         logout()
         router.push('/features/auth/login')
         onClose()
     }

     useEffect(() => {
        const handleClickOutside = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                onClose()
            }
        }
        window.addEventListener('mousedown', handleClickOutside)
        return () => window.removeEventListener('mousedown', handleClickOutside)
     }, [])

     useEffect(() => {
        const fetchQuantity = async () => {
            try{
              const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
              const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

              if(!userId){
                router.push('/features/auth/login')
                return
              }

              const res = await axios.get(`/cart/getCart/${userId}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })

              const totalQuantity = res.data.cart.products?.reduce((acc, item) => acc + item.quantity, 0)

              setQuantity(totalQuantity)

            }catch(err){
              console.log(err)
            }
        }
        fetchQuantity()
     }, [])

  return (
    <div className='min-h-screen w-full z-200 fixed bg-[rgba(0,0,0,0.4)]'>

         <form ref={modalRef} className='flex flex-col gap-8 w-[250px] pt-2 px-2 bg-black min-h-screen'>

            <div className='w-full flex justify-end'>
                <IoClose onClick={onClose} className='text-white cursor-pointer text-2xl hover:text-red-500 transition duration-300'/>
            </div>

            <div className='flex flex-col gap-4 px-4 w-full items-center'>

              <Link href={'/'} onClick={() => onClose()} className='text-white text-[18px]'>Home</Link>
              <Link href={'/features/products'} onClick={() => onClose()} className='text-white text-[18px]'>Products</Link>
              <Link href={'/features/about'} onClick={() => onClose()} className='text-white text-[18px]'>About</Link>
              <Link href={'/features/contact'} onClick={() => onClose()} className='text-white text-[18px]'>Contact</Link>
              <Link href={`/features/cart/${userId}`} onClick={() => onClose()} className='relative py-1 flex gap-2 items-center'>
                 <div className='text-white text-[18px]'>
                    Cart
                 </div>
                 <span className='absolute -top-1 -right-3 rounded-full bg-red-500 text-white px-1.5 text-sm '>
                   {quantity}
                 </span>
                 <AiOutlineShoppingCart className='text-2xl text-white'/>
               </Link>

          {
            isLoggedIn ? (
              <div onClick={handleLogout} className='bg-white text-center w-full rounded-[20px] px-5 py-1.5 text-black cursor-pointer text-md'>
                Logout
              </div>
            ) : (
              <Link onClick={onClose} href={'/features/auth/login'} className='bg-white text-center w-full rounded-[20px] px-5 py-1.5 text-black cursor-pointer text-md'>
               Log in
              </Link>
            )
           }

            </div>

         </form>

    </div>
  )
}

export default MobileNavbar
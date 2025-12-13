'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/features/auth/AuthProvider'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import MobileNavbar from './MobileNavbar'
import axios from '@/lib/axios'

const Navbar = () => {

    const {isLoggedIn, logout} = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [openMenu, setOpenMenu] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
       const id = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
       setUserId(id)
    }, [])

    const fetchCartCount = async () => {
    try {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

      if (!userId || !token) return

      const res = await axios.get(`/cart/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const totalQuantity = res.data.cart.products?.reduce((acc, item) => acc + item.quantity, 0)

      setCartCount(totalQuantity || 0)

    } catch (err) {
      console.log(err)
    }
  }

   useEffect(() => {
    fetchCartCount()
  }, [])

   useEffect(() => {
       const updateHandler = () => fetchCartCount()
       window.addEventListener('cart updated', updateHandler)

      return () => window.removeEventListener('cart updated', updateHandler)
   }, [])

    const handleLogout = () => {
       logout()
       router.push('/features/auth/login')
    }

    if(pathname.startsWith('/admin')){
      return <></>
    }

  return (
    <>
      <div className='fixed bg-white shadow-xl w-full h-[77px] z-100'>
        <div className='md:flex hidden items-center px-14 justify-between h-full'>
           
           <Link href={'/'} className='text-black font-semibold text-2xl'>
            ElectroMart
           </Link>

           <div className='flex items-centre gap-6'>
              <Link href={'/'}>Home</Link>
              <Link href={'/features/products'}>Products</Link>
              <Link href={'/features/about'}>About</Link>
              <Link href={'/features/contact'}>Contact</Link>
           </div>

           <div className='flex gap-8 items-center'>
              
               <Link href={`/features/cart/${userId}`} className='relative py-1'>
                 <span className='absolute -top-1 -right-2 rounded-full bg-red-500 text-white px-1.5 text-sm '>
                   {cartCount || 0}
                 </span>
                 <AiOutlineShoppingCart className='text-2xl'/>
               </Link>

              {
            isLoggedIn ? (
              <div onClick={handleLogout} className='bg-black rounded-[20px] px-6 py-2 text-white cursor-pointer text-md'>
                Logout
              </div>
            ) : (
              <Link href={'/features/auth/login'} className='bg-black rounded-[20px] px-6 py-2 text-white cursor-pointer text-md'>
               Log in
              </Link>
            )
           }
           </div>

        </div>

        <div className='flex md:hidden items-center h-full'>
   
           <div className='w-full flex justify-between px-4 items-center'>
 
               <Link href={'/'} className='text-black font-semibold text-2xl'>ElectroMart</Link>

               <div className=''>
                 <RiMenu3Line onClick={() => setOpenMenu(true)} className='text-2xl cursor-pointer'/>
               </div>
  
           </div>

        </div>

    </div>

      {
        openMenu && (
          <MobileNavbar onClose={() => setOpenMenu(false)} />
        )
      }

    </>
  )
}

export default Navbar
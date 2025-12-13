'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (!pathname.startsWith('/admin')) {
    return <></>
  }

  const toggleSidebar = () => setIsOpen(prev => !prev)

  return (
    <>
      <div className='lg:hidden fixed top-4 left-4 z-50'>
        <button
          onClick={toggleSidebar}
          className='text-black p-2 rounded-md bg-white shadow-md'
        >
          {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
        </button>
      </div>

      <div className={`
        fixed top-0 left-0 h-full bg-black z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 w-64
      `}>
        <div className='flex flex-col gap-12 py-6 px-6'>
          <Link href='/' className='text-2xl font-semibold text-white'>
            ElectroMart
          </Link>

          <nav className='flex flex-col gap-4 w-fit'>
            <Link href='/admin/features/dashboard' className='text-white hover:text-blue-400 transition'>
              Dashboard
            </Link>
            <Link href='/admin/features/products' className='text-white hover:text-blue-400 transition'>
              Products
            </Link>
            <Link href='/admin/features/addProduct' className='text-white hover:text-blue-400 transition'>
              Add Products
            </Link>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-40 z-30 lg:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default Sidebar

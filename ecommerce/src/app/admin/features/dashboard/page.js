'use client'

import Sidebar from '../../components/Sidebar'
import ProductsDonut from '../../components/ProductsDonut'
import UsersDonut from '../../components/UsersDonut'

const Dashboard = () => {
  return (
    <div className='flex min-h-screen w-full bg-gray-50'>
      
      <Sidebar />

      <div className='flex-1 flex flex-col items-center justify-start py-10 px-6 lg:px-12'>
        <h1 className='text-3xl font-bold text-gray-800 mb-10'>Admin Dashboard</h1>

        <div className='flex flex-col sm:flex-row gap-8 w-full justify-center items-center'>
          <ProductsDonut />
          <UsersDonut />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

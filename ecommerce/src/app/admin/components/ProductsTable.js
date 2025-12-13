'use client'

import { Spinner } from "@/components/ui/spinner";
import axios from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/product/getProducts');
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

   const handleDelete = async(productId) => {
       setLoading(true)
       try{
         await axios.delete(`/product/deleteProduct/${productId}`)
         setProducts(prev => prev.filter(p => p._id !== productId))
         
       }catch(err){
        console.log(err);
       }finally{
        setLoading(false)
       }
   } 

  return (
    <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto px-4">
      
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-semibold">Products Table</h1>
        <Link 
          href={'/admin/features/addProduct'} 
          className="bg-green-600 text-white font-semibold rounded-lg py-2 px-4 text-[16px] text-center w-fit"
        >
          Create Product
        </Link>
      </div>

      <div className="hidden md:block overflow-x-auto max-h-[600px] overflow-y-scroll">
        {loading ? (
          <div className="w-full flex justify-center items-center h-64">
            <Spinner /> Loading
          </div>
        ) : (
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr 
                  key={i} 
                  onClick={() => router.push(`/features/productDetails/${p._id}`)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <img src={p.images.main} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4 max-w-[250px]">
                    <span className="block truncate">{p.description}</span>
                  </td>
                  <td className="py-3 px-4">{p.brand}</td>
                  <td className="py-3 px-4">{p.stock}</td>
                  <td className="py-3 px-4">${p.price}</td>
                  <td 
                    onClick={(e) => e.stopPropagation()} 
                    className="py-3 px-4 flex gap-2 justify-center pt-6"
                  >
                    <button className="px-3 py-1 bg-blue-600 cursor-pointer text-white rounded-lg text-sm hover:bg-blue-700">Edit</button>
                    
                        <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-600 cursor-pointer text-white rounded-lg text-sm hover:bg-red-700">
                          {
                            loading ? (
                            <span className="flex gap-2 items-center"><Spinner /> Loading</span>
                            ) : (
                              "Delete"
                            )
                          }
                        </button>
                      
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {products.map((p, i) => (
          <div 
            key={i} 
            onClick={() => router.push(`/features/productPage/${p._id}`)}
            className="border rounded-2xl p-4 shadow-sm bg-white flex flex-col gap-3 active:scale-[0.98] transition"
          >
            <img src={p.images?.main} className="w-full h-40 rounded-xl object-cover" />
            <h3 className="text-xl font-semibold text-center">{p.name}</h3>
            <p className="text-sm text-gray-600 text-center line-clamp-2">{p.description}</p>
            <div className="mt-2 text-sm flex flex-col gap-1 text-center">
              <p><span className="font-semibold">Brand:</span> {p.brand}</p>
              <p><span className="font-semibold">Stock:</span> {p.stock}</p>
              <p className="text-[17px] font-semibold text-green-700">${p.price}</p>
            </div>
            <div 
              className="mt-4 flex gap-3 flex-col sm:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm w-full sm:w-1/2 font-medium active:scale-95 duration-150">Edit</button>
              <button className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm w-full sm:w-1/2 font-medium active:scale-95 duration-150">Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductsTable;

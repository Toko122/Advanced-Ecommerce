'use client'

import { useAuth } from "@/app/features/auth/AuthProvider";
import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { Spinner } from "./ui/spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const AddToCart = async (productId) => {
      setLoading(true)
      try{
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        if(!userId){
          router.push('/features/auth/login')
          return;
        }

        const res = await axios.post(`/cart/addToCart/${productId}`, {
          userId: userId,
          productId,
          quantity: quantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        window.dispatchEvent(new Event('cart updated'))
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false)
      }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/product/getProduct/${id}`);
        setProduct(res.data.product);
        if (res.data.product?.images?.gallery?.length > 0) {
          setThumbnail(res.data.product.images.gallery[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center py-20 text-gray-500">Loading product...</p>;

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
  <div className="flex flex-col md:flex-row gap-10">

    <div className="flex flex-col md:flex-row gap-8 w-full md:w-1/2">
      
      <div className="flex md:flex-col justify-center gap-3 overflow-x-auto md:overflow-x-visible">
        {product.images.gallery.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => setThumbnail(img)} 
            className={`border rounded-lg overflow-hidden cursor-pointer transition ${
              thumbnail === img ? "border-indigo-500" : "border-gray-300"
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx+1}`} className="w-20 h-20 object-cover md:w-20 md:h-20" />
          </div>
        ))}
      </div>

      <div className="rounded-lg overflow-hidden flex items-center justify-center w-full">
        <img 
          src={thumbnail || product.images.main} 
          alt={product.name} 
          className="w-full h-64 sm:h-80 md:h-[400px] object-cover transition-all max-w-[800px]"
        />
      </div>
    </div>

    <div className="flex-1 flex flex-col gap-4 w-full md:w-1/2">
      <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>
      <p className="text-gray-500 text-sm">
        Brand: <span className="font-medium">{product.brand}</span> | Category: <span className="font-medium">{product.category}</span>
      </p>

      <div className="flex items-center gap-1">
        {Array(5).fill('').map((_, i) => (
          <GoStarFill key={i} fill={product.rating > i ? "#f59e0b" : "#d1d5db"}/>
        ))}
        <span className="ml-2 text-gray-600">({product.rating})</span>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-gray-400 line-through">${product.oldPrice}</p>
        <p className="text-2xl font-semibold text-green-700">${product.price}</p>
      </div>

      <p className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>

      <div className="mt-4">
        <p className="font-medium mb-2">About this product:</p>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button onClick={() => {AddToCart(product._id); setQuantity((prev) => prev + 1)}} className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300 transition">
          {
            loading ? <span className="flex gap-2 items-center justify-center"><Spinner /> Loading</span> : 'Add to Cart'
          }
        </button>
        <button className="flex-1 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
          Buy Now
        </button>
      </div>

    </div>
  </div>
</div>

  );
};

export default ProductDetail;

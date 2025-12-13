"use client"

import { Spinner } from "@/components/ui/spinner"
import axios from "@/lib/axios"
import Link from "next/link"
import React, { useState } from "react"

const AddProduct = () => {

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        oldPrice: '',
        brand: '',
        category: '',
        stock: '',
        rating: '',
    })
       const [mainImage, setMainImage] = useState(null);
       const [extraImages, setExtraImages] = useState([]);
       const [previewMain, setPreviewMain] = useState(null);
       const [previewExtras, setPreviewExtras] = useState([]);
       const [loading, setLoading] = useState(false);     

    const handleChangeFile = (e) => {
       const file = e.target.files[0]
       setMainImage(file)
       setPreviewMain(URL.createObjectURL(file))
    }

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
    }

     const handleExtraImages = (e) => {
        const files = Array.from(e.target.files);
        if (files.length !== 4) {
         alert("Exactly 4 extra images are required");
         return;
        }    
        setExtraImages(files);
        setPreviewExtras(files.map((file) => URL.createObjectURL(file)));
     }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!mainImage) return alert("Main image is required")
        if(extraImages.length !== 4) return alert("Exactly 4 extra images are required")
        setLoading(true)
        
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('description', form.description)
        formData.append('price', form.price)
        formData.append('oldPrice', form.oldPrice)
        formData.append('brand', form.brand)
        formData.append('category', form.category)
        formData.append('stock', form.stock)
        formData.append('rating', form.rating)
        formData.append('mainImage', mainImage)

        extraImages.forEach(img => formData.append('image', img))

        try{
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
          const res = await axios.post('/product/addProduct', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          })

          setForm({
            name: '',
            description: '',
            price: '',
            oldPrice: '',
            brand: '',
            category: '',
            stock: '',
            rating: '',
          });

          setMainImage(null);
          setExtraImages([]);
          setPreviewMain(null);
          setPreviewExtras([]);        
          
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
    }

  return (
    <>
       <div className="min-h-screen shadow-2xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 sm:p-12">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Add New Product</h2>
          <Link href="/admin/features/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Back to products
          </Link>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input 
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              required
              placeholder="e.g. iPhone 15 Pro Max"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300" 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Short description about the product"
              className="w-full px-4 py-3 border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
            <input 
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              step="0.01"
              required
              placeholder="999"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Old Price</label>
            <input 
              name="oldPrice"
              value={form.oldPrice}
              onChange={handleChange}
              type="number"
              required
              step="0.01"
              placeholder="1199"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select 
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-400 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select category</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="tablets">Tablets</option>
              <option value="smartwatches">Smart Watches</option>
              <option value="audio">Audio</option>
              <option value="accessories">Accessories</option>
              <option value="tv-monitor">TV & Monitor</option>
              <option value="gaming">Gaming</option>
              <option value="networking">Networking</option>
              <option value="home-appliances">Home Appliances</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
            <input 
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              type="text"
              placeholder="Apple / Samsung / Xiaomi"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
            <input 
              name="stock"
              value={form.stock}
              onChange={handleChange}
              type="number"
              min="0"
              required
              placeholder="10"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <input 
              name="rating"
              value={form.rating}
              onChange={handleChange}
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300" 
            />
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:gap-34 gap-6">

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Main Image
    </label>
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleChangeFile} 
      className="w-full"
    />
    {previewMain && (
      <img 
        src={previewMain} 
        className="w-32 h-32 mt-2 rounded-lg border object-cover" 
      />
    )}
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Extra Images (4)
    </label>
    <input 
      type="file" 
      accept="image/*" 
      multiple 
      onChange={handleExtraImages} 
      className="w-full"
    />

    <div className="flex flex-wrap gap-2 mt-2">
      {previewExtras.map((img, i) => (
        <img 
          key={i} 
          src={img} 
          className="w-20 h-20 rounded-lg border object-cover" 
        />
      ))}
    </div>
  </div>

</div>
          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button type="submit" className="px-6 py-3 cursor-pointer bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700">
              {loading ? <span className="flex gap-2 items-center"><Spinner /> Uploading</span> : "Create Product"}
            </button>
          </div>

        </form>

      </div>
    </div>

    </>
  )
}

export default AddProduct
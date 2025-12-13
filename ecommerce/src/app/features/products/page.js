"use client";

import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import axios from "@/lib/axios";
import { IoSearchOutline } from "react-icons/io5";

const Products = () => {

    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([])

    
    useEffect(() => {
      const fetchProducts = async() => {
          try{
            const res = await axios.get('/product/getProducts')
            setProducts(res.data.products)
          }catch(err){ 
            console.log(err);
          }
      }
      fetchProducts()
    }, [])

     const brands = [...new Set(products.map((product) => product.brand))]

     useEffect(() => {
         let filtered = [...products]

         if(selectedCategory !== 'All Products'){
            filtered = filtered.filter((p) => p.category === selectedCategory)
         }

         if(selectedBrand !== 'all'){
            filtered = filtered.filter((p) => p.brand === selectedBrand)
         }

         if(minPrice !== ''){
            filtered = filtered.filter((p) => p.price >= parseFloat(minPrice))
         }

         if(maxPrice !== ''){
            filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice))
         }

         setFilteredProducts(filtered)

     }, [maxPrice, minPrice, selectedBrand, selectedCategory, products])

     const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="md:pt-34 pt-24 px-6 md:flex-row flex flex-col gap-12 pb-12">

      <div className="lg:w-1/4 w-full">
        <div className="bg-white/80 overflow-y-auto max-h-[800px] backdrop-blur-sm p-8 rounded-3xl shadow-xl sticky top-24 border border-gray-100/50">
          
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
            Filters
          </h3>

          <div className="space-y-8">

            <div className="w-full">
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoSearchOutline className="text-2xl"/>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-lg">Categories</h4>

              <div className="flex flex-wrap gap-2">
                {["All Products", "smartphone", 'laptops', "computer", 'tablets', 'smartwatches', 'audio', 'accessories', 'tv & monitors', 'gaming', 'networking', 'home appliances'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl  text-sm font-medium bg-gray-50 text-gray-700 
                      hover:bg-gray-100 cursor-pointer hover:scale-105
                       ${selectedCategory === cat 
                        ?"bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
                       }
                      `}
                  >
                    {capitalize(cat)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-lg">Brands</h4>

              <div className="flex flex-wrap gap-2">
                 <button
                    onClick={() => setSelectedBrand('all')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-50 text-gray-700 
                      hover:bg-gray-100 cursor-pointer hover:scale-105
                      ${selectedBrand === 'all' 
                        ?"bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
                       }
                      `}
                  >
                    All
                  </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-50 text-gray-700 
                      hover:bg-gray-100 cursor-pointer hover:scale-105
                      ${selectedBrand === brand 
                        ?"bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
                       }
                      `}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-lg">Price Range</h4>

              <div className="flex gap-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full border bg-gray-50/50 border-gray-200 rounded-xl px-5 py-3.5 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full border bg-gray-50/50 border-gray-200 rounded-xl px-5 py-3.5 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex-1">
        <ProductList filtered={filteredProducts.filter((p) => 
           p.name.toLowerCase().includes(searchTerm.toLowerCase())
         )}/>
      </div>

    </div>
  );
};

export default Products;

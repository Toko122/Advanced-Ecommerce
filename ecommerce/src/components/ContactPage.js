'use client'

import axios from "@/lib/axios";
import React, { useState } from "react";
import { Spinner } from "./ui/spinner";

const ContactPage = () => {

   const [form, setForm] = useState({name: '', email: '', message: ''})
   const [loading, setLoading] = useState(false)

   const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
   }

   const handleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      try{
         const res = await axios.post('/contact/sendMessage', form)
         setForm({
          name: '',
          email: '',
          message: '',
         })
      }catch(err){
        console.log(err);     
      }finally{
        setLoading(false)
      }
   }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6 md:px-20 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-10">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-10 text-lg">
          Have a question or need help? Fill out the form and we’ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              name='name'
              onChange={handleChange}
              type="text"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              onChange={handleChange}
              required
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all"
          >
            {
              loading ? <span className="flex items-center gap-2 justify-center"><Spinner /> Loading</span> : 'Send Message'
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

'use client'

import Link from 'next/link'
import React from 'react'

const GetStartedSection = () => {
  return (
    <section className="w-full mt-20">
      <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] overflow-hidden">

        <img
          src="/public-domain-vectors-15uEH8-UoGI-unsplash.jpg"
          alt="Get Started"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Start Shopping Smarter
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl">
            Discover top products, exclusive deals and fast delivery — all in one place.
          </p>

          <Link
            href="/features/auth/login"
            className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white text-black text-lg font-semibold shadow-xl hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Link>

        </div>
      </div>
    </section>
  )
}

export default GetStartedSection

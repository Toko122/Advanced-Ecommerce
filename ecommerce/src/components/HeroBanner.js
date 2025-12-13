'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";

const HeroSlider = () => {
  const slides = [
    {
      img: "/igor-omilaev-3EYu6B86yWk-unsplash.jpg",
      title: "Trending Now",
      subtitle: "Discover the most popular products",
      cta: "Shop Trending"
    },
    {
      img: "/tamanna-rumee-R4viFLEqOWU-unsplash.jpg",
      title: "Big Discounts",
      subtitle: "Save more on top products",
      cta: "View Deals"
    },
    {
      img: "/premium_photo-1681488124242-c58c37c79af6.avif",
      title: "Free Delivery",
      subtitle: "Fast & free shipping on all orders",
      cta: "Start Shopping"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[420px] sm:h-[520px] md:h-[650px] lg:h-[750px] overflow-hidden">

      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.img}
          alt={slide.title}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-all duration-1000 ease-in-out
            ${currentIndex === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}
          `}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <h1
          key={slides[currentIndex].title}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl animate-fadeInUp "
        >
          {slides[currentIndex].title}
        </h1>

        <p
          key={slides[currentIndex].subtitle}
          className="mt-4 text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl animate-fadeInUp delay-150"
        >
          {slides[currentIndex].subtitle}
        </p>

        <Link
          href="/features/products"
          className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white text-black font-semibold text-lg shadow-xl hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
        >
          {slides[currentIndex].cta}
        </Link>

      </div>
    </section>
  );
};

export default HeroSlider;

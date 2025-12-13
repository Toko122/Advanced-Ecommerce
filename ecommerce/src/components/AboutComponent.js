import React from "react";

const AboutComponent = () => {
  return (
    <div className="w-full pt-26 pb-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          We are a modern online electronics store where you can easily find 
          high-quality devices — smartphones, tablets, TVs, and various tech 
          accessories. Our goal is to offer a simple, comfortable, and 
          trustworthy shopping experience at fair prices.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-2 gap-10 items-center">

        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="tech devices"
          className="rounded-2xl shadow-lg w-full object-cover"
        />

        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Every product in our store is selected with care to ensure you
            receive only reliable and high-quality electronics. Our team is
            always ready to help you choose the right device — whether it's a
            new smartphone, tablet, or television.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            We focus on fast delivery, honest communication, and full product
            warranty. That’s why more and more customers trust us and prefer to
            shop their electronics from our store.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Our Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-600">
              We offer only trusted and carefully tested electronics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Speed</h3>
            <p className="text-gray-600">
              Fast delivery and a smooth, simple ordering process.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Support
            </h3>
            <p className="text-gray-600">
              Friendly customer assistance for any questions you may have.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;

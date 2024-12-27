import React from "react";
import img from "../assets/hero_frame_img.png"; // Hero Image

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="flex flex-col items-center relative">
        {/* Image Section */}
        <div className="relative w-full">
          <img src={img} alt="Hero Frame" className="w-full h-auto" />

          {/* Shop Now Button positioned in the green circle area */}
          <div className="absolute bottom-1/2 left-1/3 transform translate-x-[-276%] translate-y-[350%] z-10">
            <button className="px-10 py-3 bg-black text-white font-medium text-lg rounded-lg hover:bg-pink-500 transition-all duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full bg-pink-500 py-2">
        <div className="flex animate-marquee whitespace-nowrap overflow-hidden">
          {/* Scrolling Marquee */}
          <div className="flex space-x-6">
            <p className="text-white text-lg font-semibold">
              Summer Sale: Up to 50% off on selected items! 🌟
            </p>
            <p className="text-white text-lg font-semibold">
              Free Shipping on orders over ₹10,000 🌟
            </p>
            <p className="text-white text-lg font-semibold">
              Buy One Get One Free on Diamond Earrings! 🌟
            </p>
          </div>
          {/* Duplicate for seamless scrolling */}
          <div className="flex space-x-6">
            <p className="text-white text-lg font-semibold">
              Summer Sale: Up to 50% off on selected items! 🌟
            </p>
            <p className="text-white text-lg font-semibold">
              Free Shipping on orders over ₹10,000 🌟
            </p>
            <p className="text-white text-lg font-semibold">
              Buy One Get One Free on Diamond Earrings! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import img from "../assets/hero_frame_img.png"; // Hero Image

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Top Section */}
      <div className="flex flex-col items-center relative">
        {/* First Image Section with the Shop Now Button */}
        <div className="relative">
          <img src={img} alt="Hero Frame" className="max-w-full h-auto" />

          {/* Button positioned at the bottom of the first image */}
          <div className="absolute top-[-160px] left-[20px] z-10">
            <button className="px-10 py-3 bg-black text-white font-medium text-base rounded-lg cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
        
        {/* Hero Bottom Section: Marquee above the image */}
        <div className="absolute bottom-0 left-0 w-full bg-pink-500 py-2 z-20">
          <div className="flex animate-marquee whitespace-nowrap overflow-hidden">
            {/* Scrolling Marquee */}
            <div className="flex space-x-6 animate-marquee">
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
            <div className="flex space-x-6 animate-marquee">
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
    </div>
  );
};

export default Hero;

import React from "react";
import img1 from "../assets/sale.png";
import img2 from "../assets/Rectangle 29.png";
import img3 from "../assets/Rectangle 29 (1).png";
import img4 from "../assets/Rectangle 29 (2).png";

const Gender = () => {
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/3">
            <img src={img1} alt="Sale" className="w-48 lg:w-64 mb-6" />
            <p className="text-3xl lg:text-5xl font-light text-gray-600 leading-snug text-center lg:text-left">
              Find the Perfect Jewelry for Every Style
            </p>
          </div>

          {/* Right Section */}
          <div className="flex justify-center w-full lg:w-2/3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Men */}
              <li className="w-full h-auto border border-gray-200 bg-white shadow-lg rounded-xl p-4 hover:scale-105 transition-transform">
                <img
                  src={img2}
                  alt="Men"
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Men</h3>
                  <p className="text-sm font-light text-blue-600 cursor-pointer hover:underline">
                    Explore Collection
                  </p>
                </div>
              </li>
              {/* Women */}
              <li className="w-full h-auto border border-gray-200 bg-white shadow-lg rounded-xl p-4 hover:scale-105 transition-transform">
                <img
                  src={img3}
                  alt="Women"
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Women</h3>
                  <p className="text-sm font-light text-blue-600 cursor-pointer hover:underline">
                    Explore Collection
                  </p>
                </div>
              </li>
              {/* Kids */}
              <li className="w-full h-auto border border-gray-200 bg-white shadow-lg rounded-xl p-4 hover:scale-105 transition-transform">
                <img
                  src={img4}
                  alt="Kids"
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Kids</h3>
                  <p className="text-sm font-light text-blue-600 cursor-pointer hover:underline">
                    Explore Collection
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gender;

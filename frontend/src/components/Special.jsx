import React from "react";
import img1 from "../assets/image 4.png";
import img2 from "../assets/image 3.png";

const Special = () => {
  return (
    <div className="w-full flex flex-wrap justify-between items-center mt-28 bg-pink-100 h-[420px] overflow-hidden">
      {/* Left Section */}
      <div className="relative flex-1 max-w-xl">
        <img src={img1} alt="Special Collection" className="w-full h-auto" />
        <div className="absolute top-10 left-20">
          <p className="text-base font-light text-gray-800 mb-2">
            Celebrate Love with Our Exquisite Wedding Collection
          </p>
          <h5 className="text-5xl font-thin text-gray-800 leading-tight">
            Find the Perfect Jewelry for Your Special Day
          </h5>
          <button className="mt-10 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition duration-200">
            Shop now
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 max-w-lg">
        <img src={img2} alt="Special Collection Right" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Special;

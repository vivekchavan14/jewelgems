import React from "react";
import image1 from "../assets/Frame 116 (1).png";
import image2 from "../assets/Frame 114 (1).png";
import image3 from "../assets/Frame 114.png";
import image4 from "../assets/Frame 115.png";
import image5 from "../assets/Frame 116.png";
import image6 from "../assets/Frame 115 (1).png";
import img from "../assets/pre.png";

const Categories = () => {
  return (
    <div className="flex justify-between mt-12 h-64">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div className="flex flex-col gap-1 w-2/5 items-start">
          <div className="w-44">
            <img src={img} alt="Category" />
          </div>
          <div className="text-6xl font-light text-gray-400 leading-[64px]">
            <p>Discover the Dazzling World of Gemstone</p>
          </div>
        </div>
        <div className="flex flex-col items-center relative mt-12">
          <div className="absolute right-5 top-[-90px] flex gap-5">
            <button className="p-2 border-3 border-[#f5e5ea] bg-white rounded-lg cursor-pointer">
              <i className="fa-solid fa-angle-left text-sm"></i>
            </button>
            <button className="p-2 border-3 border-[#f5e5ea] bg-white rounded-lg cursor-pointer">
              <i className="fa-solid fa-angle-right text-sm"></i>
            </button>
          </div>
          <ul className="flex items-center justify-center gap-5 overflow-x-hidden">
            <li className="flex flex-col items-center gap-2">
              <img src={image4} alt="Blue sapphire" />
              <p className="text-sm">Blue sapphire</p>
            </li>
            <li className="flex flex-col items-center gap-2">
              <img src={image5} alt="Emerald" />
              <p className="text-sm">Emerald</p>
            </li>
            <li className="flex flex-col items-center gap-2">
              <img src={image2} alt="Ruby" />
              <p className="text-sm">Ruby</p>
            </li>
            <li className="flex flex-col items-center gap-2">
              <div className="bg-[#f5e5ea] h-28 w-28 rounded-full flex items-center justify-center">
                <img src={image6} alt="Pearl" className="w-16" />
              </div>
              <p className="text-sm">Pearl</p>
            </li>
            <li className="flex flex-col items-center gap-2">
              <img src={image1} alt="Red Core" />
              <p className="text-sm">Red Core</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;

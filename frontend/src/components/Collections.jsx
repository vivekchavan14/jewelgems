import React, { useRef } from "react";
import img1 from "../assets/Rectangle 30.png";
import img2 from "../assets/Rectangle 30 (1).png";
import img3 from "../assets/Rectangle 30 (2).png";
import img4 from "../assets/Rectangle 30 (3).png";
import img from "../assets/special-collection.png";

const Collections = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -75) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBack = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className="relative w-full bg-gray-50">
      <div className="flex flex-col items-center w-full max-w-screen-xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img src={img} alt="Special Collection" className="w-auto max-w-full" />
          <p className="text-lg md:text-xl font-light text-gray-600 text-center">
            Exclusive Designs for Unforgettable Moments
          </p>
        </div>

        {/* Slider Buttons */}
        <button
          onClick={slideBack}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-pink-200 rounded-full flex items-center justify-center z-10 shadow-lg hover:scale-110 transition"
        >
          <i className="fa-solid fa-angle-left text-gray-500"></i>
        </button>
        <button
          onClick={slideForward}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-pink-200 rounded-full flex items-center justify-center z-10 shadow-lg hover:scale-110 transition"
        >
          <i className="fa-solid fa-angle-right text-gray-500"></i>
        </button>

        {/* Slider Section */}
        <div className="overflow-hidden w-full">
          <ul
            ref={slider}
            className="flex gap-4 md:gap-6 transition-transform duration-500"
            style={{ transform: "translateX(0%)" }}
          >
            {[
              {
                img: img1,
                title: "Modern Elegance",
                description:
                  "Sleek and stylish design for the contemporary fashionista",
              },
              {
                img: img2,
                title: "Bridal Collections",
                description: "Elegantly crafted Diamond Solitaire Ring",
              },
              {
                img: img3,
                title: "Gemstone Wonder",
                description: "A dazzling array of gemstones to add color",
              },
              {
                img: img4,
                title: "Gemstone Wonder",
                description:
                  "A dazzling array of gemstones to add color to your Collection",
              },
              {
                img: img1,
                title: "Diamond Solitaire Ring",
                description: "Elegantly crafted Diamond Solitaire Ring",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="min-w-[250px] md:min-w-[300px] bg-white border border-pink-200 rounded-xl shadow-lg flex flex-col p-4 hover:scale-105 transition-transform"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-44 md:h-52 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {item.description}
                </p>
                <hr className="my-3 border-t-2 border-pink-100" />
                <p className="text-pink-600 text-center cursor-pointer hover:underline">
                  Explore Collections
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Collections;

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, featuredProducts.length - itemsPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const sliderStyle = {
    transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
  };

  return (
    <div className="relative w-full bg-gray-100 py-20">
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <h2 className="text-4xl font-bold text-gray-800 text-center font-serif">
            Bestseller
          </h2>
          <p className="text-lg text-gray-600 text-center">
            Our Most Loved Piece, Curated Just for You
          </p>
        </div>

        {/* Slider Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow hover:scale-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-chevron-left text-gray-700 text-lg"></i>
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= featuredProducts.length - itemsPerPage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow hover:scale-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-chevron-right text-gray-700 text-lg"></i>
        </button>

        {/* Slider Section */}
        <div className="overflow-hidden w-full mt-6">
          <ul
            className="flex gap-6 transition-transform duration-500"
            style={sliderStyle}
          >
            {featuredProducts?.map((product) => (
              <li
                key={product._id}
                className="min-w-[250px] bg-white border border-gray-200 rounded-lg shadow flex flex-col p-4 hover:shadow-md transition"
              >
                <div className="relative w-full h-48 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                  <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full border border-gray-300 shadow">
                    {product.tagline || "Exclusive"}
                  </span>
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                    <i className="fas fa-heart text-gray-600"></i>
                  </button>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Elegantly crafted {product.name}, perfect for any occasion.
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-white bg-gray-800 px-4 py-2 text-sm font-bold rounded shadow hover:bg-gray-700 flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

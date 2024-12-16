import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import imag1 from "./../assets/Rectangle 174.png";
import imag2 from "./../assets/Rectangle 174 (1).png";
import imag3 from "./../assets/Rectangle 174 (2).png";
import imag4 from "./../assets/Rectangle 174 (3).png";

const categories = [
  { href: "/diamonds", name: "Diamond Jewelry", imageUrl: imag1 },
  { href: "/silver", name: "Silver Jewelry", imageUrl: imag2 },
  { href: "/gemstones", name: "Gemstone Collection", imageUrl: imag3 },
  { href: "/rudraksha", name: "Rudraksha Jewelry", imageUrl: imag4 },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black to-pink-900 text-white">
      {/* Hero Section */}
      <Hero />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <h1 className="text-center text-5xl font-extrabold text-pink-400 mb-12">
          Discover the Dazzling World of Gemstones
        </h1>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {/* Featured Products Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center text-pink-400 mb-8">
            Featured Products
          </h2>
          {isLoading ? (
            <div className="text-center text-lg text-gray-400">
              Loading...
            </div>
          ) : (
            products.length > 0 && <FeaturedProducts featuredProducts={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

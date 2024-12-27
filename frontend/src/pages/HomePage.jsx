import { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import imag1 from "./../assets/Rectangle 174.png";
import imag2 from "./../assets/Rectangle 174 (1).png";
import imag3 from "./../assets/Rectangle 174 (2).png";
import imag4 from "./../assets/Rectangle 174 (3).png";
import Gender from "../components/Gender";
import Collections from "../components/Collections";
import Special from "../components/Special";
import Categories from "../components/Categories";

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
    <div className="relative min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <Hero />

      <div className="relative z-10 w-full mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Heading */}
        <h1 className="text-center text-5xl font-extrabold text-gray-800 mb-12">
          Discover the Dazzling World of Gemstones
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-4 gap-8 mt-10">
  {categories.map((category) => (
    <CategoryItem category={category} key={category.name} />
  ))}
</div>

<Categories />


        {/* Featured Products Section */}
        <div className="mt-20">
          {isLoading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            products.length > 0 && (
              <FeaturedProducts featuredProducts={products} />
            )
          )}
        </div>

        {/* Additional Sections */}
        <div className="w-full">
          <Gender />
          <Collections />
          <Special />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

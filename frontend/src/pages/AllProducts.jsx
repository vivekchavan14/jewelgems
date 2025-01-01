import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore"; // Cart store
import { Loader } from "lucide-react"; // Optional spinner for loading

const categories = ["All", "Diamond", "Silver", "Gemstones", "Rudraksha"];
const subCategories = ["All", "Anklets", "Bracelets", "Earrings", "Mens Jewellery", "Necklace"];
const sortOptions = [
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" },
];

const AllProducts = () => {
  const navigate = useNavigate();

  // Access product and cart stores
  const { products, loading, error, getAllProducts } = useProductStore();
  const { addToCart } = useCartStore(); // Add to cart functionality from cart store

  // Local state for filters and sorting
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  // Filter and sort products
  const filterAndSortProducts = () => {
    let updatedProducts = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by subcategory
    if (selectedSubCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.subCategory === selectedSubCategory
      );
    }

    // Sort by price
    if (sortOrder === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  // Handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Run filtering and sorting whenever filters change
  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, selectedSubCategory, sortOrder]);

  // Fetch all products on initial load
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Navigate to product details
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product detail page
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    addToCart(product); // Add the selected product to the cart
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Product List</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
            Sub Category
          </label>
          <select
            id="subCategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
            Sort by Price
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">None</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id} // Ensure key consistency with _id
              className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => handleProductClick(product._id)} // Correct product ID reference
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm text-gray-500">{product.subCategory}</p>
                <p className="mt-2 text-xl font-semibold text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking Add to Cart
                    handleAddToCart(product);
                  }}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No products found.</p>
      )}
    </div>
  );
};

export default AllProducts;

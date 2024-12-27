const CategoryItem = ({ category }) => {
    return (
      <a
        href={category.href}
        className="relative group flex flex-col items-center justify-center border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Image */}
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
  
        {/* Name and Arrow */}
        <div className="flex items-center justify-between w-full px-4 py-3 bg-white">
          <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
          <span className="text-gray-500 text-xl group-hover:text-black transition-colors duration-300">
            &#x27A4; {/* Unicode for the arrow */}
          </span>
        </div>
      </a>
    );
  };
  
  export default CategoryItem;
  
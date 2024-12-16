import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className='bg-black shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='bg-pink-600'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
            >
              Product
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
            >
              Price
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
            >
              Category
            </th>

            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
            >
              Featured
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='bg-black divide-y divide-gray-700'>
          {products?.map((product) => (
            <tr key={product._id} className='hover:bg-gray-800'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <img
                      className='h-10 w-10 rounded-full object-cover'
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-white'>{product.name}</div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{product.category}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured ? "bg-pink-400 text-black" : "bg-gray-600 text-gray-300"
                  } hover:bg-pink-500 transition-colors duration-200`}
                >
                  <Star className='h-5 w-5' />
                </button>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className='text-red-400 hover:text-red-300'
                >
                  <Trash className='h-5 w-5' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;

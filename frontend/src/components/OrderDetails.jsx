import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const OrderDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserWithCart = async () => {
      try {
        const response = await axios.get(`/api/cart/orders/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user cart");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserWithCart();
    }
  }, [userId]);

  return (
    <motion.div
      className="bg-black shadow-lg rounded-lg overflow-hidden max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="p-6 bg-gray-800">
        <h1 className="text-2xl font-bold text-white mb-4">Order Details</h1>

        <motion.table
          className="min-w-full divide-y divide-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-pink-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Product Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-700">
            {loading || error || (user?.cartItems.length === 0) ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-300 whitespace-nowrap"
                >
                  {loading
                    ? "Loading order details..."
                    : error
                    ? error
                    : "No items in the cart."}
                </td>
              </tr>
            ) : (
              user.cartItems.map((item) => (
                <tr key={item.product._id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{item.product.name}</div>
                    <div className="text-xs text-gray-400">
                      {item.product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{item.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      ${item.product.price.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default OrderDetails;

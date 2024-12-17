import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";
import { useState } from "react";

// Assuming that you have a `cashfree` utility to handle Cashfree checkout
import { cashfree } from "../utils/util"; // You can define this utility to call the Cashfree API

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, user } = useCartStore();  // Assuming 'user' object has user info
  const savings = subtotal - total;

  const [loading, setLoading] = useState(false);

  // Payment Handler
  const handlePayment = async () => {
    setLoading(true);
    try {
      // Call backend to get payment sessionId
      const { data } = await axios.post("/cashfree/payment", {
        customer_email: user?.email || "test@example.com",  // Replace with actual user email
        customer_phone: user?.phone || "9999999999",      // Replace with actual user phone
        customer_name: user?.name || "Test User",        // Replace with actual user name
        order_amount: total.toFixed(2),
      });

      if (data.success && data.paymentSessionId) {
        const checkoutOptions = {
          paymentSessionId: data.paymentSessionId,
          redirectTarget: "_self",
        };

        // Trigger Cashfree checkout
        cashfree.checkout(checkoutOptions);  // Ensure cashfree utility is implemented correctly
      } else {
        throw new Error("Failed to initialize payment.");
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="space-y-4 rounded-lg bg-black p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-pink-600">Order Summary</p>
      <div>
        <div className="flex justify-between">
          <span>Original Price</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {isCouponApplied && savings > 0 && (
          <div className="flex justify-between">
            <span>Coupon Savings</span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full rounded-lg bg-pink-600 py-2.5 text-white hover:bg-pink-500"
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </motion.div>
  );
};

export default OrderSummary;

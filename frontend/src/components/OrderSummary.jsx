import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { cashfree } from "../utils/util";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Function to fetch payment session ID
  const fetchSessionId = async () => {
    try {
      const res = await axios.post("/api/cashfree/payment", {
        version: cashfree.version(),
      });
      if (res.data && res.data.paymentSessionId) {
        return res.data.paymentSessionId;
      }
      throw new Error("Failed to retrieve payment session ID.");
    } catch (error) {
      console.error("Error fetching session ID:", error);
      alert("Failed to initiate payment. Please try again.");
      return null;
    }
  };

  // Payment Handler
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Fetch session ID if not already available
      const currentSessionId = sessionId || (await fetchSessionId());
      if (!currentSessionId) return;

      // Store session ID
      setSessionId(currentSessionId);

      // Initiate Cashfree Checkout
      const checkoutOptions = {
        paymentSessionId: currentSessionId,
        returnUrl: "http://localhost:8000/api/cashfree/status/{orderid}", // Replace orderid dynamically if needed
      };

      cashfree
        .checkout(checkoutOptions)
        .then((result) => {
          if (result.error) {
            console.error("Payment Error:", result.error.message);
            alert(result.error.message);
          }
        })
        .catch((error) => {
          console.error("Cashfree Checkout Error:", error);
          alert("Payment failed. Please try again.");
        });
    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch session ID when the component mounts
    if (!sessionId) {
      fetchSessionId().then((id) => setSessionId(id));
    }
  }, [sessionId]);

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-black bg-black p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-pink-600">Order Summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-pink-700">Original price</dt>
            <dd className="text-base font-medium text-white">${formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-pink-700">Savings</dt>
              <dd className="text-base font-medium text-pink-600">-${formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-pink-700">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-pink-600">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4 border-t border-pink-200 pt-2">
            <dt className="text-base font-bold text-pink-900">Total</dt>
            <dd className="text-base font-bold text-pink-600">${formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
          disabled={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-pink-500">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 underline hover:text-pink-500 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;

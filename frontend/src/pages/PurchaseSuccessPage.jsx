import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (paymentSessionId) => {
			try {
				// Call backend endpoint to verify payment success
				const { data } = await axios.get(`/cashfree/status/${paymentSessionId}`);
				
				// Handle order details (if necessary)
				setOrderDetails(data);
				
				// Clear cart upon successful payment
				clearCart();
			} catch (error) {
				console.error("Error verifying payment:", error);
				setError("Failed to verify payment. Please contact support.");
			} finally {
				setIsProcessing(false);
			}
		};

		// Extract the payment session ID from the URL
		const paymentSessionId = new URLSearchParams(window.location.search).get("payment_session_id");
		if (paymentSessionId) {
			handleCheckoutSuccess(paymentSessionId);
		} else {
			setIsProcessing(false);
			setError("No payment session ID found in the URL.");
		}
	}, [clearCart]);

	// Show processing state
	if (isProcessing) return <div className="text-center mt-20 text-gray-300">Processing your order...</div>;

	// Show error message
	if (error) {
		return (
			<div className="text-center mt-20 text-red-500">
				<h1 className="text-2xl font-semibold mb-4">Payment Failed</h1>
				<p>{error}</p>
				<Link
					to="/"
					className="mt-6 inline-block bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
				>
					Return to Shopping
				</Link>
			</div>
		);
	}

	// Render success page
	return (
		<div className="h-screen flex items-center justify-center px-4">
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
				<div className="p-6 sm:p-8">
					<div className="flex justify-center">
						<CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
						Purchase Successful!
					</h1>

					<p className="text-gray-300 text-center mb-2">
						Thank you for your order! We're processing it now.
					</p>
					<p className="text-emerald-400 text-center text-sm mb-6">
						You'll receive an email with order details shortly.
					</p>

					<div className="bg-gray-700 rounded-lg p-4 mb-6">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm text-gray-400">Order number</span>
							<span className="text-sm font-semibold text-emerald-400">
								#{orderDetails?.order_id || "N/A"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-400">Estimated delivery</span>
							<span className="text-sm font-semibold text-emerald-400">
								3-5 business days
							</span>
						</div>
					</div>

					<div className="space-y-4">
						<button
							className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
              rounded-lg transition duration-300 flex items-center justify-center"
						>
							<HandHeart className="mr-2" size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to="/"
							className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
             rounded-lg transition duration-300 flex items-center justify-center"
						>
							Continue Shopping
							<ArrowRight className="ml-2" size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;

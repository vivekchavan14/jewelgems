import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();
	const maxQuantity = 10;

	if (!item) {
		return <p className="text-gray-400">Item not found.</p>;
	}

	return (
		<motion.div
			className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
				<div className="shrink-0 md:order-1">
					<img
						className="h-20 md:h-32 rounded object-cover"
						src={item.image}
						alt={item.name}
					/>
				</div>
				<label className="sr-only">Choose quantity:</label>

				<div className="flex items-center justify-between md:order-3 md:justify-end">
					<div className="flex items-center gap-2">
						<button
							aria-label="Decrease quantity"
							className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
								border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
								focus:ring-pink-500"
							onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
						>
							<Minus className="text-gray-300" />
						</button>
						<p>{item.quantity}</p>
						<button
							aria-label="Increase quantity"
							className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
								border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
								focus:ring-2 focus:ring-pink-500"
							onClick={() => updateQuantity(item._id, Math.min(maxQuantity, item.quantity + 1))}
						>
							<Plus className="text-gray-300" />
						</button>
					</div>

					<div className="text-end md:order-4 md:w-32">
						<p className="text-base font-bold text-gray-400">${item.price.toFixed(2)}</p>
					</div>
				</div>

				<div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
					<p className="text-base font-medium text-white hover:text-pink-400 hover:underline">
						{item.name}
					</p>
					<p className="text-sm text-gray-400">{item.description}</p>

					<div className="flex items-center gap-4">
						<button
							aria-label="Remove item from cart"
							className="inline-flex items-center text-sm font-medium text-red-400
								hover:text-red-300 hover:underline"
							onClick={() => removeFromCart(item._id)}
						>
							<Trash />
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CartItem;

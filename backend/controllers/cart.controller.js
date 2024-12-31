import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
	try {
		if (!req.user.cartItems || !Array.isArray(req.user.cartItems)) {
			return res.status(400).json({ message: "Invalid cart items" });
		}

		const products = await Product.find({ _id: { $in: req.user.cartItems.map(item => item.id) } });

		// Add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
			return { ...product.toJSON(), quantity: item?.quantity || 0 };
		});

		res.json(cartItems);
	} catch (error) {
		console.error("Error in getCartProducts controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body;
		if (!productId) {
			return res.status(400).json({ message: "Product ID is required" });
		}

		const user = req.user;

		// Initialize cartItems if undefined
		if (!user.cartItems) {
			user.cartItems = [];
		}

		// Check if the product already exists in the cart
		const existingItem = user.cartItems.find(
			(item) => item.product?.toString() === productId
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push({ product: productId, quantity: 1 });
		}

		// Update only the cartItems field
		await User.updateOne(
			{ _id: user._id },
			{ cartItems: user.cartItems }
		);

		// Return updated cart
		res.json(user.cartItems);
	} catch (error) {
		console.error("Error in addToCart controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;
		if (!productId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item) => item.id !== productId);
		}
		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity } = req.body;
		const user = req.user;
		const existingItem = user.cartItems.find((item) => item.id === productId);

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item) => item.id !== productId);
				await user.save();
				return res.json(user.cartItems);
			}

			existingItem.quantity = quantity;
			await user.save();
			res.json(user.cartItems);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

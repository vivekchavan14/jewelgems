import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; 

const productSchema = new mongoose.Schema(
	{
		productID: {
			type: String,
			default: uuidv4, // Automatically generate a unique ID
			unique: true,  // Ensure the productID is unique
			required: true,  // Make it required
			trim: true,  // Remove any extra spaces
		  },
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

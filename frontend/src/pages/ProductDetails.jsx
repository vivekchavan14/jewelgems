import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

const ProductDetails = ({ productId }) => {
	// Destructure store state and actions
	const { product, fetchProductByID, loading, error } = useProductStore((state) => ({
		product: state.product,
		fetchProductByID: state.fetchProductByID,
		loading: state.loading,
		error: state.error,
	}));

	useEffect(() => {
		if (productId) {
			fetchProductByID(productId);
		}
	}, [productId, fetchProductByID]); // Ensure stable dependencies

	// Render loading state
	if (loading) return <p>Loading...</p>;

	// Render error state
	if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

	// Render when product is not found
	if (!product) return <p>Product not found</p>;

	// Render product details
	return (
		<div style={{ border: "1px solid #ddd", padding: "20px", maxWidth: "400px" }}>
			<h1 style={{ marginBottom: "10px" }}>{product.name || "Unnamed Product"}</h1>
			<p style={{ marginBottom: "10px" }}>{product.description || "No description available."}</p>
			<img
				src={product.image || "/placeholder-image.png"} // Provide a placeholder image
				alt={product.name || "Product Image"}
				style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", marginBottom: "10px" }}
			/>
			<p style={{ fontWeight: "bold" }}>${product.price ? product.price.toFixed(2) : "0.00"}</p>
		</div>
	);
};

export default ProductDetails;

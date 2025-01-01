import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  // Fetch available coupons
  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
    } catch (error) {
      console.error("Error fetching coupon:", error);
      toast.error("Failed to fetch coupons");
    }
  },

  // Apply a coupon
  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to apply coupon";
      toast.error(message);
      console.error("Error applying coupon:", message);
    }
  },

  // Remove an applied coupon
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  // Fetch cart items
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      if (Array.isArray(res.data)) {
        set({ cart: res.data });
        get().calculateTotals();
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      set({ cart: [] });
      const message = error.response?.data?.message || "Failed to fetch cart items";
      toast.error(message);
      console.error("Error fetching cart items:", message);
    }
  },

  // Clear the cart
  clearCart: () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
    toast.success("Cart cleared");
  },

  // Add a product to the cart
  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);
        const updatedCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: updatedCart };
      });
      get().calculateTotals();
      toast.success("Product added to cart");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add product to cart";
      toast.error(message);
      console.error("Error adding to cart:", message);
    }
  },

  // Remove a product from the cart
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart`, { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotals();
      toast.success("Product removed from cart");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove product";
      toast.error(message);
      console.error("Error removing from cart:", message);
    }
  },

  // Update the quantity of a product
  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      return get().removeFromCart(productId);
    }

    try {
      await axios.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));
      get().calculateTotals();
      toast.success("Quantity updated");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update quantity";
      toast.error(message);
      console.error("Error updating quantity:", message);
    }
  },

  // Calculate subtotal and total
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));

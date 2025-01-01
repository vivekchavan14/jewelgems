import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import AllProducts from "./pages/AllProducts";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import OrderDetails from "./components/OrderDetails";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
  // User store: authentication logic
  const { user, checkAuth, checkingAuth } = useUserStore();
  // Cart store: fetch cart items for authenticated users
  const { getCartItems } = useCartStore();

  // Check user authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch cart items when the user is authenticated
  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);

  // Display a loading spinner while checking authentication
  if (checkingAuth) return <LoadingSpinner />;

  // Protected Route component for handling authentication
  const ProtectedRoute = ({ element, redirectTo = '/' }) => (
    user ? element : <Navigate to={redirectTo} />
  );

  return (
    <div className='w-full min-h-screen bg-black text-pink-500 relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,105,180,0.3)_0%,rgba(30,30,30,0.3)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      <div className='relative w-full z-50 pt-20'>
        {/* Navbar */}
        <Navbar />

        {/* Routes with motion transitions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/collections' element={<AllProducts />} />
            <Route path='/category/:category' element={<CategoryPage />} />
            <Route path='/product/:productId' element={<ProductDetails />} />

            {/* Authentication Routes */}
            <Route path='/signup' element={<ProtectedRoute element={<SignUpPage />} />} />
            <Route path='/login' element={<ProtectedRoute element={<LoginPage />} />} />

            {/* Protected Routes */}
            <Route path='/secret-dashboard' element={<ProtectedRoute element={<AdminPage />} redirectTo="/login" />} />
            <Route path='/orders' element={<ProtectedRoute element={<OrderDetails />} redirectTo="/login" />} />
            <Route path='/cart' element={<ProtectedRoute element={<CartPage />} redirectTo="/login" />} />
            <Route path='/purchase-success' element={<ProtectedRoute element={<PurchaseSuccessPage />} redirectTo="/login" />} />
            <Route path='/purchase-cancel' element={<ProtectedRoute element={<PurchaseCancelPage />} redirectTo="/login" />} />
          </Routes>
        </motion.div>
      </div>

      {/* Toaster and Footer */}
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;

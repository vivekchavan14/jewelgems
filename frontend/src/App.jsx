import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

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
import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import OrderDetails from "./components/OrderDetails";

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
	}, [getCartItems, user]);

	// Display a loading spinner while checking authentication
	if (checkingAuth) return <LoadingSpinner />;

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

				{/* Routes */}
				<Routes>
					{/* Public Routes */}
					<Route path='/' element={<HomePage />} />
					<Route path='/collections' element={<AllProducts />} />
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/product/:productId' element={<ProductDetails />} />

					{/* Authentication Routes */}
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />

					{/* Protected Routes */}
					<Route path='/secret-dashboard' element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} />
					<Route path='/orders' element={user?.role === "admin" ? <OrderDetails /> : <Navigate to='/login' />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				</Routes>
			</div>

			{/* Toaster and Footer */}
			<Toaster />
			<Footer />
		</div>
	);
}

export default App;

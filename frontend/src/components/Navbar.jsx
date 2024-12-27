import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import logo from "./../assets/logo.svg"; // Add the logo file here

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50 flex items-center justify-between px-8 py-4 border-b border-pink-400 font-poppins">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-extrabold text-black hover:text-pink-500 transition duration-300 ease-in-out">
            JewelGems
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-10">
        <Link
          to="/"
          className="text-lg font-medium text-gray-700 hover:text-pink-500 transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          to="/collections"
          className="text-lg font-medium text-gray-700 hover:text-pink-500 transition duration-300 ease-in-out"
        >
          Collections
        </Link>
        {user && (
          <Link
            to="/cart"
            className="relative text-lg font-medium text-gray-700 hover:text-pink-500 transition duration-300 ease-in-out flex items-center group"
          >
            <ShoppingCart size={20} className="mr-1 group-hover:text-pink-500" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-pink-400 transition duration-300 ease-in-out">
                {cart.length}
              </span>
            )}
          </Link>
        )}
        {isAdmin && (
          <Link
            to="/secret-dashboard"
            className="bg-pink-500 text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-pink-400 transition duration-300 ease-in-out"
          >
            <Lock size={18} className="mr-2" />
            Dashboard
          </Link>
        )}
        {user ? (
          <button
            className="bg-white hover:bg-pink-500 text-black hover:text-white py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out text-lg font-medium border border-pink-500"
            onClick={logout}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline ml-2">Log Out</span>
          </button>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-white hover:bg-pink-500 text-black hover:text-white py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out text-lg font-medium border border-pink-500"
            >
              <UserPlus size={18} className="mr-2" />
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-pink-500 text-black hover:text-white py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out text-lg font-medium border border-pink-500"
            >
              <LogIn size={18} className="mr-2" />
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

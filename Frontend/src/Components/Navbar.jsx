import React, { useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Pages/Redux/authslice";
import LoginPopup from "../Components/Login_signup/Login";
import SignUpPopup from "../Components/Login_signup/Signup";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
     <nav className="w-full bg-white text-black shadow-md px-4 md:px-8 py-3 flex items-center justify-between relative z-50">
  {/* Left: Logo */}
  <div className="flex items-center">
    <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-600">
      RM
    </Link>
  </div>

  {/* Center: Menu */}
  <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
    <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
    <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
    <li><Link to="/rental-products" className="hover:text-blue-600">Rental Products</Link></li>
  </ul>

  {/* Right: Icons & Auth */}
  <div className="flex items-center gap-5">
    {/* Cart */}
    <button className="relative bg-white p-2 rounded-full shadow hover:shadow-lg transition">
      <ShoppingBag onClick={()=>navigate('/cart')} className="w-5 h-5 text-black" />
    </button>

    {/* Auth */}
    {!user ? (
      <button
        className="text-sm font-medium hover:text-blue-600"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
    ) : (
      <div className="relative">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="bg-blue-600 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center"
        >
          {user.username.charAt(0).toUpperCase()}
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">
            <Link
              to={`/profile/${user.email}`}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setProfileOpen(false)}
            >
              Profile
            </Link>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )}

    {/* Mobile Menu Button */}
    <button
      className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
</nav>

    </>
  );
};

export default Navbar;
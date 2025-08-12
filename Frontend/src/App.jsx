import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Pages/Redux/authstore";  // adjust path if needed

import Navbar from "./Components/Navbar";
import CuHome from "./Pages/Customer/CuHome";
import Footer from "./Components/Footer";
import Products from "./Pages/Customer/Product";
import Cart from './Pages/cart/cart'
import Contact from './Pages/Customer/Contact'
import UserProfileSection from "./Pages/Customer/UserProfileSection";
import ProductDetailPage from './Components/productpage/'
import { ToastContainer } from "react-toastify";
import BookingResponsePage from './pages/BookingResponsePage';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Navbar is always visible */}
        <Navbar />


        {/* Routes */}
        <Routes>
          <Route path="/" element={<CuHome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:email" element={<UserProfileSection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/booking/:action/:bookingId" element={<BookingResponsePage />} />
        </Routes>

        {/* Footer is always visible */}
        <Footer />
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Provider>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Pages/Redux/authstore";  // adjust path if needed

import Navbar from "./Components/Navbar";
import CuHome from "./Pages/Customer/CuHome";
import Footer from "./Components/Footer";
import Products from "./Pages/Customer/Product";

import Contact from './Pages/Customer/Contact'
import UserProfileSection from "./Pages/Customer/UserProfileSection";


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
        </Routes>

        {/* Footer is always visible */}
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

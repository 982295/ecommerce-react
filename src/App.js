import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetailPage from "./components/ProductDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import { useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import Profile from "./components/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const { getTotalItems } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Navbar totalItems={getTotalItems()} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

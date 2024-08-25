import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.products.findIndex(
        (item) => item.productId === product.id
      );

      if (existingProductIndex !== -1) {
        // Update quantity if product is already in the cart
        const updatedProducts = [...prevCart.products];
        updatedProducts[existingProductIndex].quantity += quantity;
        return { ...prevCart, products: updatedProducts };
      } else {
        // Add new product to the cart
        return {
          ...prevCart,
          products: [
            ...prevCart.products,
            { productId: product.id, quantity },
          ],
        };
      }
    });
  };

  const updateCartQty = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
      return { ...prevCart, products: updatedProducts };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (item) => item.productId !== productId
      );
      return { ...prevCart, products: updatedProducts };
    });
  };

  const emptyCart = () => {
    setCart({ products: [] });
  };

  const getTotalItems = () => {
    const uniqueProducts = {};

    // Iterate over products and track unique product IDs
    cart?.products?.forEach((item) => {
      if (!uniqueProducts[item.productId]) {
        uniqueProducts[item.productId] = true;
      }
    });
  
    // Return the number of unique products
    return Object.keys(uniqueProducts).length;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartQty, removeFromCart, emptyCart,getTotalItems  }}
    >
      {children}
    </CartContext.Provider>
  );
};

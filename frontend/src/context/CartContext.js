import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (existingIndex >= 0) {
        // Increase quantity if same product/variant exists
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += product.quantity;
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item._id === product._id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
          )
      )
    );
  };

  const updateQuantity = (product, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
        ) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

// 1. Create the context
const CartContext = createContext();

// 2. Create custom hook to use the context
export const useCart = () => useContext(CartContext);

// 3. Create the provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
         toast.success("Quantity increased");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
              toast.success("Added to cart");

        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart
  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

     toast.success("Quantity increased");
  };

  // Decrease quantity (remove if quantity is 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

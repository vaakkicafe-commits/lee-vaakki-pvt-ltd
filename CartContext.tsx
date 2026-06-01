import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the shape of our cart data
interface CartContextType {
  cartCount: number;
  updateCount: (val: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Create the Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = (val: number) => setCartCount(val);

  return (
    <CartContext.Provider value={{ cartCount, updateCount }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  bestseller: boolean;
  img: string;
  description: string;
  variants?: { size: string; price: number; idSuffix: string }[];
}

export interface CartItem {
  menu_item: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, qty?: number) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cafe_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (menuItem: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menu_item.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menu_item.id === menuItem.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { menu_item: menuItem, quantity }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.menu_item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.menu_item.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.menu_item.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.menu_item.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

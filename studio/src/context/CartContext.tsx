'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Account } from '@/lib/types';

interface CartItem extends Account {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (account: Account) => void;
  removeFromCart: (accountId: number) => void;
  updateQuantity: (accountId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  const addToCart = (account: Account) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id_cuenta === account.id_cuenta);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id_cuenta === account.id_cuenta
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...account, quantity: 1 }];
    });
  };

  const removeFromCart = (accountId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id_cuenta !== accountId));
  };

  const updateQuantity = (accountId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(accountId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id_cuenta === accountId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

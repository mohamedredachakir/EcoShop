import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  const normalizeCartItem = (item) => ({
    id: item.product?.id ?? item.id,
    cart_item_id: item.id,
    product_id: item.product_id ?? item.product?.id ?? item.id,
    name: item.product?.name ?? item.name,
    description: item.product?.description ?? item.description,
    price: Number(item.product?.price ?? item.price ?? 0),
    quantity: item.quantity ?? 1,
    image: item.product?.image_url ?? item.product?.image_path ?? item.image_url ?? item.image_path ?? item.image ?? null,
    category: item.product?.category?.name ?? item.category?.name ?? item.category ?? null,
  });

  const loadGuestCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) {
      setCartItems([]);
      return;
    }

    try {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
    } catch {
      setCartItems([]);
    }
  };

  const refreshBackendCart = async () => {
    const response = await api.get('/cart');
    const items = response.data?.items ?? [];
    setCartItems(items.map(normalizeCartItem));
  };

  const syncGuestCartToBackend = async () => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) {
      return;
    }

    let parsedCart = [];
    try {
      parsedCart = JSON.parse(savedCart);
    } catch {
      parsedCart = [];
    }

    if (!Array.isArray(parsedCart) || parsedCart.length === 0) {
      localStorage.removeItem('cart');
      return;
    }

    await Promise.all(parsedCart.map((item) => api.post('/cart', {
      product_id: item.id,
      quantity: item.quantity ?? 1,
    })));

    localStorage.removeItem('cart');
  };

  useEffect(() => {
    const initializeCart = async () => {
      if (user) {
        try {
          await syncGuestCartToBackend();
          await refreshBackendCart();
        } catch {
          await refreshBackendCart().catch(() => setCartItems([]));
        }
      } else {
        loadGuestCart();
      }
    };

    initializeCart();
  }, [user]);

  // Save cart to local storage on change for guests only
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const findCartItem = (productId) => cartItems.find((item) => item.id === productId || item.product_id === productId);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      await api.post('/cart', {
        product_id: product.id,
        quantity,
      });
      await refreshBackendCart();
      setIsCartOpen(true);
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = async (productId) => {
    if (user) {
      const cartItem = findCartItem(productId);
      if (cartItem?.cart_item_id) {
        await api.delete(`/cart/${cartItem.cart_item_id}`);
        await refreshBackendCart();
      }
      return;
    }

    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    if (user) {
      const cartItem = findCartItem(productId);
      if (cartItem?.cart_item_id) {
        await api.put(`/cart/${cartItem.cart_item_id}`, { quantity });
        await refreshBackendCart();
      }
      return;
    }

    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    if (user) {
      await Promise.all(cartItems.map((item) => {
        if (!item.cart_item_id) {
          return Promise.resolve();
        }
        return api.delete(`/cart/${item.cart_item_id}`);
      }));
    }

    setCartItems([]);
    if (!user) {
      localStorage.removeItem('cart');
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, 
      clearCart, cartTotal, cartCount, isCartOpen, setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

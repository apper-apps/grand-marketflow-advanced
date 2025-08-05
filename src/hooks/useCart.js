import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("marketflow-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("marketflow-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.Id);
      
      if (existingItem) {
        // Update quantity
        return prevItems.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, {
          productId: product.Id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity: 1
        }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

const getPointsEarned = () => {
    const total = getCartTotal();
    return Math.floor(total * 0.1); // 10% of total as points
  };

  const saveOrder = (orderData) => {
    const order = {
      id: Date.now(),
      orderNumber: `MF${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      status: "processing",
      items: cartItems.length,
      total: getCartTotal(),
      cartItems: [...cartItems],
      ...orderData
    };

    const existingOrders = JSON.parse(localStorage.getItem("marketflow-orders") || "[]");
    existingOrders.unshift(order);
    localStorage.setItem("marketflow-orders", JSON.stringify(existingOrders));
    
    return order;
  };

  const getOrders = () => {
    return JSON.parse(localStorage.getItem("marketflow-orders") || "[]");
  };

return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getPointsEarned,
    saveOrder,
    getOrders
  };
};
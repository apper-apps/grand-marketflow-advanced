import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import CartSidebar from "@/components/organisms/CartSidebar";
import HomePage from "@/components/pages/HomePage";
import ShopPage from "@/components/pages/ShopPage";
import ProductPage from "@/components/pages/ProductPage";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import OrderConfirmationPage from "@/components/pages/OrderConfirmationPage";
import OrderTrackingPage from "@/components/pages/OrderTrackingPage";
import { useCart } from "@/hooks/useCart";
import { productService } from "@/services/api/productService";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  } = useCart();

  const handleSearch = async (query) => {
    if (query.trim().length < 2) {
      setSearchSuggestions([]);
      return;
    }

    try {
      const results = await productService.search(query);
      setSearchSuggestions(results.slice(0, 5));
    } catch (error) {
      console.error("Search error:", error);
      setSearchSuggestions([]);
    }
  };

const handleCheckout = () => {
    setIsCartOpen(false);
    window.location.href = '/cart';
  };

  const handleOrderComplete = () => {
    clearCart();
  };

return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Header
          cartItemCount={getCartItemCount()}
          onCartClick={() => setIsCartOpen(true)}
          onSearch={handleSearch}
          searchSuggestions={searchSuggestions}
        />

        <main className="flex-1 w-full">
<Routes>
            <Route 
              path="/" 
              element={<HomePage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/categories" 
              element={<ShopPage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/shop" 
              element={<ShopPage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductPage onAddToCart={addToCart} />} 
            />
<Route 
              path="/cart" 
              element={
                <CartPage 
                  cartItems={cartItems}
                  cartTotal={getCartTotal()}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              }
            />
<Route 
              path="/orders" 
              element={<OrderTrackingPage />} 
            />
            <Route 
              path="/account" 
              element={<HomePage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/points" 
              element={<HomePage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/deals" 
              element={<ShopPage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/contact" 
              element={<HomePage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/order-confirmation" 
              element={<OrderConfirmationPage />} 
            />
            <Route 
              path="/checkout" 
              element={
                <CheckoutPage 
                  cartItems={cartItems}
                  cartTotal={getCartTotal()}
                  onOrderComplete={handleOrderComplete}
                />
              } 
            />
            <Route 
              path="/new-arrivals" 
              element={<ShopPage onAddToCart={addToCart} />} 
            />
          </Routes>
        </main>

        <Footer />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
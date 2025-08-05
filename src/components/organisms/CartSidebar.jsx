import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const pointsEarned = Math.floor(subtotal * 0.1);
  const deliveryFee = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + deliveryFee;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-sm text-gray-500">{itemCount} items</p>
              </div>
              <Button variant="ghost" onClick={onClose} className="p-2">
                <ApperIcon name="X" className="w-6 h-6" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ApperIcon name="ShoppingCart" className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products to get started!</p>
                  <Button onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemoveItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
{cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Order Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center">
                      <ApperIcon name="Star" className="w-3 h-3 mr-1 text-yellow-500" />
                      Points Earned
                    </span>
                    <span className="text-yellow-600">+{pointsEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span>Total:</span>
                  <span className="text-2xl gradient-primary bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={onCheckout}
                  size="lg"
                  className="w-full"
                >
                  <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                  View Cart
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
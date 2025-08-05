import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import CartItem from '@/components/molecules/CartItem';
import ApperIcon from '@/components/ApperIcon';

const CartPage = ({ cartItems = [], onUpdateQuantity, onRemoveItem, cartTotal = 0 }) => {
  const navigate = useNavigate();
  
  // Calculate order summary values
  const subtotal = cartTotal;
  const pointsEarned = Math.floor(subtotal * 0.1); // 10% of subtotal as points
  const deliveryFee = subtotal >= 50 ? 0 : 5.99; // Free delivery over $50
  const total = subtotal + deliveryFee;

  const handleWhatsAppOrder = () => {
    const orderDetails = cartItems.map(item => 
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `Hi! I'd like to place an order:\n\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\nDelivery: $${deliveryFee.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nPlease confirm availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('WhatsApp order initiated! We\'ll contact you shortly.');
  };

  const handleTraditionalCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center">
            <ApperIcon name="ShoppingCart" className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8">Discover amazing products and start shopping!</p>
            <Button size="lg" onClick={() => navigate('/shop')}>
              <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <CartItem
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemoveItem}
                      showSupplier={true}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <ApperIcon name="Star" className="w-4 h-4 mr-1 text-yellow-500" />
                    Points Earned
                  </span>
                  <span className="font-medium text-yellow-600">+{pointsEarned} pts</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <ApperIcon name="Truck" className="w-4 h-4 mr-1" />
                    Delivery Fee
                  </span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {subtotal < 50 && deliveryFee > 0 && (
                  <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                    <ApperIcon name="Info" className="w-4 h-4 inline mr-1" />
                    Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="gradient-primary bg-clip-text text-transparent text-xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Options */}
              <div className="space-y-3">
                <Button 
                  onClick={handleWhatsAppOrder}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <ApperIcon name="MessageCircle" className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </Button>
                
                <Button 
                  onClick={handleTraditionalCheckout}
                  size="lg"
                  className="w-full"
                >
                  <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                  Traditional Checkout
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/shop')}
                  className="w-full"
                >
                  <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/", { replace: true });
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderData: formData, cartItems, total } = orderData;
  const orderNumber = `MF${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (formData?.shippingMethod === "express" ? 3 : 7));

  const handleTrackOrder = () => {
    navigate("/orders", { state: { trackingNumber: orderNumber } });
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="CheckCircle" className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="primary" className="text-lg px-4 py-2">
              Order #{orderNumber}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems?.map((item) => (
                <div key={item.productId} className="flex items-center space-x-3">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${(total - (formData?.shippingMethod === "express" ? 15.99 : 5.99) - (total * 0.08)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${formData?.shippingMethod === "express" ? "15.99" : "5.99"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total</span>
                <span className="gradient-primary bg-clip-text text-transparent">
                  ${total?.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>

          {/* Delivery Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="MapPin" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Delivery Address</p>
                    <p className="text-gray-600 text-sm">
                      {formData?.firstName} {formData?.lastName}<br />
                      {formData?.address}<br />
                      {formData?.city}, {formData?.state} {formData?.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ApperIcon name="Clock" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Estimated Delivery</p>
                    <p className="text-gray-600 text-sm">
                      {estimatedDelivery.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ApperIcon name="Truck" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Shipping Method</p>
                    <p className="text-gray-600 text-sm capitalize">
                      {formData?.shippingMethod === "express" ? "Express Shipping (2-3 days)" : "Standard Shipping (5-7 days)"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Processing</p>
                    <p className="text-gray-600 text-sm">We're preparing your items for shipment</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-600 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shipped</p>
                    <p className="text-gray-600 text-sm">You'll receive tracking information via email</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-600 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Delivered</p>
                    <p className="text-gray-600 text-sm">Your order arrives at your doorstep</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleTrackOrder}
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <ApperIcon name="Package" className="w-5 h-5 mr-2" />
            Track Your Order
          </Button>
          
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
        </div>

        {/* Contact Information */}
        <Card className="p-6 mt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our customer service team is here to help you with any questions about your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
              
              <button
                onClick={() => {
                  const message = `Hi! I need help with my order #${orderNumber}`;
                  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                WhatsApp Support
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
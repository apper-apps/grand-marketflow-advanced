import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const OrderTrackingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(location.state?.trackingNumber || "");
  const [orders, setOrders] = useState([]);

  // Mock order data - in a real app, this would come from an API
  const mockOrders = [
    {
      id: 1,
      orderNumber: "MF123456",
      date: "2024-01-15",
      status: "delivered",
      total: 299.99,
      items: 3,
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
      actualDelivery: "2024-01-17",
      shippingAddress: "123 Main St, New York, NY 10001"
    },
    {
      id: 2,
      orderNumber: "MF789012",
      date: "2024-01-20",
      status: "shipped",
      total: 159.99,
      items: 2,
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-25",
      shippingAddress: "123 Main St, New York, NY 10001"
    },
    {
      id: 3,
      orderNumber: "MF345678",
      date: "2024-01-22",
      status: "processing",
      total: 89.99,
      items: 1,
      estimatedDelivery: "2024-01-28",
      shippingAddress: "123 Main St, New York, NY 10001"
    }
  ];

  useEffect(() => {
    // Load orders from localStorage or API
    const savedOrders = localStorage.getItem("marketflow-orders");
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders([...parsedOrders, ...mockOrders]);
      } catch (error) {
        setOrders(mockOrders);
      }
    } else {
      setOrders(mockOrders);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return "Clock";
      case "shipped":
        return "Truck";
      case "delivered":
        return "CheckCircle";
      case "cancelled":
        return "XCircle";
      default:
        return "Package";
    }
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { label: "Order Placed", completed: true },
      { label: "Processing", completed: status !== "processing" },
      { label: "Shipped", completed: status === "shipped" || status === "delivered" },
      { label: "Delivered", completed: status === "delivered" }
    ];
    return steps;
  };

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) return;
    
    const order = orders.find(o => 
      o.orderNumber.toLowerCase().includes(trackingNumber.toLowerCase()) ||
      o.trackingNumber?.toLowerCase().includes(trackingNumber.toLowerCase())
    );
    
    if (order) {
      // Scroll to the order or highlight it
      const orderElement = document.getElementById(`order-${order.id}`);
      if (orderElement) {
        orderElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        orderElement.classList.add('ring-2', 'ring-primary-500');
        setTimeout(() => {
          orderElement.classList.remove('ring-2', 'ring-primary-500');
        }, 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Order Tracking
          </h1>
          <p className="text-gray-600">
            Track your orders and view your purchase history
          </p>
        </div>

        {/* Track Specific Order */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Your Order</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter order number or tracking number"
                className="w-full"
              />
            </div>
            <Button onClick={handleTrackOrder} className="sm:w-auto">
              <ApperIcon name="Search" className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-gray-900">Your Orders</h2>
          
          {orders.length === 0 ? (
            <Card className="p-12 text-center">
              <ApperIcon name="Package" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
              <Button onClick={() => navigate("/shop")}>
                Start Shopping
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} id={`order-${order.id}`} className="p-6 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <Badge className={getStatusColor(order.status)}>
                          <ApperIcon name={getStatusIcon(order.status)} className="w-3 h-3 mr-1" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Order Date:</span>
                          <p>{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Total:</span>
                          <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Items:</span>
                          <p>{order.items} item{order.items > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {order.status === "delivered" ? "Delivered:" : "Est. Delivery:"}
                          </span>
                          <p>
                            {order.status === "delivered" 
                              ? new Date(order.actualDelivery).toLocaleDateString()
                              : new Date(order.estimatedDelivery).toLocaleDateString()
                            }
                          </p>
                        </div>
                      </div>
                      
                      {order.trackingNumber && (
                        <div className="mt-3 text-sm">
                          <span className="font-medium text-gray-700">Tracking Number:</span>
                          <span className="ml-2 font-mono text-primary-600">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {order.status !== "cancelled" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/order-details/${order.id}`)}
                        >
                          <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      )}
                      
                      {order.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/shop")}
                        >
                          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Tracking Progress */}
                  {order.status !== "cancelled" && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        {getTrackingSteps(order.status).map((step, index) => (
                          <div key={step.label} className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                              step.completed 
                                ? "bg-primary-600 text-white" 
                                : "bg-gray-200 text-gray-400"
                            }`}>
                              {step.completed ? (
                                <ApperIcon name="Check" className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-medium">{index + 1}</span>
                              )}
                            </div>
                            <span className={`text-xs text-center ${
                              step.completed ? "text-primary-600 font-medium" : "text-gray-500"
                            }`}>
                              {step.label}
                            </span>
                            {index < getTrackingSteps(order.status).length - 1 && (
                              <div className={`hidden sm:block absolute h-0.5 w-full mt-4 ${
                                step.completed ? "bg-primary-600" : "bg-gray-200"
                              }`} style={{
                                left: '50%',
                                right: `-${100 / getTrackingSteps(order.status).length}%`,
                                zIndex: -1
                              }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <Card className="p-6 mt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help with Your Order?</h3>
            <p className="text-gray-600 mb-6">
              Can't find your order or have questions about delivery? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
              >
                <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const message = "Hi! I need help with my order tracking.";
                  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
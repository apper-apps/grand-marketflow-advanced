import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CartItem = ({ item, onUpdateQuantity, onRemove, className }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      onRemove(item.productId);
    } else {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className={cn("flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100", className)}>
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0 rounded-full"
        >
          <ApperIcon name="Minus" className="w-4 h-4" />
        </Button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 p-0 rounded-full"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.productId)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "We couldn't find what you're looking for.", 
  actionText = "Browse Products",
  onAction,
  icon = "Package"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-12 h-12 text-gray-400" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description} Try adjusting your search criteria or explore our featured products.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onAction || (() => window.location.href = "/shop")}
            className="flex items-center"
          >
            <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
            {actionText}
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
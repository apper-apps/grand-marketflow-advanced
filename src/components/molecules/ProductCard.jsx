import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ProductCard = ({ product, onAddToCart, className }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card hover className={cn("group relative", className)} onClick={handleCardClick}>
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
{product.organic && (
          <Badge 
            variant="accent" 
            className="absolute top-3 left-3 transform -rotate-3 bg-green-500 text-white"
          >
            Organic
          </Badge>
        )}
        
        {product.fresh && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 transform rotate-3 bg-blue-500 text-white"
          >
            Fresh
          </Badge>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="primary" className="text-base px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="shadow-lg"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </Button>
        </div>
      </div>

<div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 font-medium">
          By {product.supplier || "Local Vendor"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-green-600">
            <ApperIcon name="Coins" className="w-4 h-4" />
            <span className="text-sm font-medium ml-1">
              {product.sabziPoints || "10"} pts
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Stock: {product.stock}</span>
            <span className="text-primary-600 font-medium">{product.category}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
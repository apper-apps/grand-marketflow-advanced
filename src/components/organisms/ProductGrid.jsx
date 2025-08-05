import React from "react";
import ProductCard from "@/components/molecules/ProductCard";
import { cn } from "@/utils/cn";

const ProductGrid = ({ products, onAddToCart, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      className
    )}>
      {products.map((product) => (
        <ProductCard
          key={product.Id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
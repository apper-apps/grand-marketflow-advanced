import React from "react";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      
      <Button
        variant={selectedCategory === "" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onCategoryChange("")}
        className="w-full justify-start"
      >
        All Products
      </Button>

      {categories.map((category) => (
        <Button
          key={category.Id}
          variant={selectedCategory === category.slug ? "primary" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(category.slug)}
          className="w-full justify-start"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
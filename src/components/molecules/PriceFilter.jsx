import React from "react";
import { cn } from "@/utils/cn";

const PriceFilter = ({ priceRange, onPriceChange, className }) => {
  const priceRanges = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 - $50", min: 25, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: Infinity }
  ];

  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
      
      {priceRanges.map((range) => (
        <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="priceRange"
            checked={priceRange.min === range.min && priceRange.max === range.max}
            onChange={() => onPriceChange(range)}
            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">{range.label}</span>
        </label>
      ))}
    </div>
  );
};

export default PriceFilter;
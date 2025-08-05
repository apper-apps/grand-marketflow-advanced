import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  onSuggestionClick, 
  suggestions = [], 
  className,
  placeholder = "Search products..." 
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch?.(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setIsOpen(false);
    onSuggestionClick?.(suggestion);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="pl-12 pr-4"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.Id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <img
                src={suggestion.images[0]}
                alt={suggestion.name}
                className="w-12 h-12 object-cover rounded-lg mr-3"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{suggestion.name}</p>
                <p className="text-sm text-gray-500">${suggestion.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
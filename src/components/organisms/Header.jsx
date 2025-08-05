import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Header = ({ cartItemCount = 0, onCartClick, onSearch, searchSuggestions = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Cart", href: "/cart" },
    { name: "Orders", href: "/orders" },
    { name: "Account", href: "/account" },
    { name: "Sabzi Points", href: "/points" },
    { name: "Deals & Offers", href: "/deals" },
    { name: "Contact Us", href: "/contact" },
  ];

  const categories = [
    "Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Beauty"
  ];

  const handleSearchSuggestion = (product) => {
    navigate(`/product/${product.Id}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
            </Button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="ShoppingBag" className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">MarketFlow</span>
          </Link>

          {/* Desktop Navigation */}
<nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.slice(0, 4).map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors text-sm"
                >
                  <span>{item.name}</span>
                </Link>
                
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/shop?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <SearchBar
              onSearch={onSearch}
              onSuggestionClick={handleSearchSuggestion}
              suggestions={searchSuggestions}
            />
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onCartClick}
              className="relative p-2"
            >
              <ApperIcon name="ShoppingCart" className="w-6 h-6" />
              {cartItemCount > 0 && (
                <Badge
                  variant="accent"
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs cart-bounce"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar
            onSearch={onSearch}
            onSuggestionClick={handleSearchSuggestion}
            suggestions={searchSuggestions}
          />
        </div>
      </div>

      {/* Mobile Menu */}
{isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                </Link>
                {item.hasDropdown && (
                  <div className="ml-4 mt-2 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/shop?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
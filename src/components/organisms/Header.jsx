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
{/* Desktop Navigation - Hidden on Mobile */}
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
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <ApperIcon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              className="w-6 h-6 text-gray-700" 
            />
          </Button>

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

{/* Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-display font-bold text-gray-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-xl transition-colors font-medium text-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        {item.hasDropdown && (
                          <ApperIcon name="ChevronRight" className="w-5 h-5 ml-auto" />
                        )}
                      </Link>
                      
                      {/* Category Submenu */}
                      {item.hasDropdown && (
                        <div className="ml-4 mt-2 space-y-1">
                          {categories.map((category) => (
                            <Link
                              key={category}
                              to={`/shop?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center px-4 py-3 text-base text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="text-sm">•</span>
                              <span className="ml-2">{category}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Additional Mobile Menu Items */}
                <div className="mt-6 px-4 pt-4 border-t border-gray-200">
                  <div className="space-y-1">
                    <Link
                      to="/deals"
                      className="flex items-center px-4 py-4 text-accent-600 hover:bg-accent-50 rounded-xl transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ApperIcon name="Zap" className="w-5 h-5 mr-3" />
                      <span>Deals & Offers</span>
                    </Link>
                    <Link
                      to="/points"
                      className="flex items-center px-4 py-4 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ApperIcon name="Star" className="w-5 h-5 mr-3" />
                      <span>Sabzi Points</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    // WhatsApp contact logic
                    window.open('https://wa.me/1234567890', '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                  Contact on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
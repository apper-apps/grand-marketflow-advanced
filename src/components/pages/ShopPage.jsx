import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductGrid from "@/components/organisms/ProductGrid";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import PriceFilter from "@/components/molecules/PriceFilter";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";

const ShopPage = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "featured":
          return b.featured - a.featured;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: Infinity });
    setSortBy("name");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loading type="grid" />
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4">
            Shop All Products
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600 text-sm sm:text-base">
              Showing {filteredProducts.length} of {products.length} products
            </p>
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full sm:w-auto"
                size="sm"
              >
                <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-w-[200px]"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>
        </div>

<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 xl:w-72 space-y-4 sm:space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <PriceFilter
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
              size="sm"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <Empty
                title="No products found"
                description="Try adjusting your filters or search criteria"
                actionText="Clear Filters"
                onAction={clearFilters}
                icon="Search"
              />
            ) : (
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
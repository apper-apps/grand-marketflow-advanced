import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturedProducts from "@/components/organisms/FeaturedProducts";
import CategoryShowcase from "@/components/organisms/CategoryShowcase";
import PromotionalBanner from "@/components/organisms/PromotionalBanner";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";

const HomePage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleViewAllProducts = () => {
    navigate("/shop");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-96 bg-gradient-to-br from-primary-600 to-accent-600 shimmer"></div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Loading type="grid" />
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      
      <FeaturedProducts
        products={featuredProducts.length > 0 ? featuredProducts : products}
        onAddToCart={handleAddToCart}
        onViewAll={handleViewAllProducts}
      />
      
      <CategoryShowcase categories={categories} />
      
      <PromotionalBanner />
    </div>
  );
};

export default HomePage;
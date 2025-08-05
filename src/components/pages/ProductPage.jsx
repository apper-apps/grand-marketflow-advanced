import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ProductGrid from "@/components/organisms/ProductGrid";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      
      const productData = await productService.getById(parseInt(id));
      setProduct(productData);
      
      // Load related products from same category
      const allProducts = await productService.getAll();
      const related = allProducts
        .filter(p => p.category === productData.category && p.Id !== productData.Id)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (err) {
      setError(err.message || "Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    toast.success(`${quantity} ${product.name}${quantity > 1 ? "s" : ""} added to cart!`);
  };

  const handleRelatedProductAdd = (relatedProduct) => {
    onAddToCart(relatedProduct);
    toast.success(`${relatedProduct.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loading type="product" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <Error message={error} onRetry={loadProduct} />;
  }

  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-primary-600">
            Home
          </button>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <button onClick={() => navigate("/shop")} className="hover:text-primary-600">
            Shop
          </button>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
<div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary-500" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.featured && (
                  <Badge variant="accent" className="mb-4">
                    Featured Product
                  </Badge>
                )}
                
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ApperIcon 
                        key={i} 
                        name="Star" 
                        className={`w-5 h-5 ${i < 4 ? "fill-current" : ""}`} 
                      />
                    ))}
                    <span className="text-gray-600 ml-2">(4.5) 128 reviews</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {isOnSale && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="sale">
                        -{discountPercent}% OFF
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Category:</span>
                  <Badge variant="primary">{product.category}</Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Stock:</span>
                  <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                  </span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 p-0"
                    >
                      <ApperIcon name="Minus" className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 p-0"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    size="lg"
                    className="flex-1"
                  >
                    <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6"
                  >
                    <ApperIcon name="Heart" className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <ProductGrid
              products={relatedProducts}
              onAddToCart={handleRelatedProductAdd}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
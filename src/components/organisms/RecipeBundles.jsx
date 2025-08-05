import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import { productService } from '@/services/api/productService';

const RecipeBundles = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBundles();
  }, []);

  const loadBundles = async () => {
    try {
      setLoading(true);
      const bundlesData = await productService.getBundles();
      setBundles(bundlesData);
    } catch (error) {
      toast.error('Failed to load recipe bundles');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBundle = (bundle) => {
    bundle.products.forEach(product => {
      onAddToCart(product);
    });
    toast.success(`${bundle.name} bundle added to cart!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Recipe Bundles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Curated ingredient bundles for your favorite recipes. Save time and money with our pre-selected combinations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {bundles.map((bundle) => (
            <motion.div key={bundle.Id} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    Save ${bundle.savings.toFixed(2)}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {bundle.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary-600">
                        ${bundle.bundlePrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${bundle.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ApperIcon name="Package" className="w-4 h-4 mr-1" />
                      {bundle.products.length} items
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleAddBundle(bundle)}
                      className="w-full"
                    >
                      <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                      Add Bundle to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/bundle/${bundle.Id}`)}
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => navigate('/bundles')}
            variant="outline"
            size="lg"
          >
            <ApperIcon name="ChefHat" className="w-5 h-5 mr-2" />
            View All Recipe Bundles
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeBundles;
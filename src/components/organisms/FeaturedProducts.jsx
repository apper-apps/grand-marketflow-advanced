import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FeaturedProducts = ({ products, onAddToCart, onViewAll }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white geometric-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that customers love most
          </p>
        </motion.div>

<motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {products.slice(0, 8).map((product) => (
            <motion.div key={product.Id} variants={itemVariants}>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                className="h-full product-card-hover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={onViewAll}
            size="lg"
            className="px-8"
          >
            <span>View All Products</span>
            <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
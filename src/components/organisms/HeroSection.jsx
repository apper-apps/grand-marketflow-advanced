import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 geometric-pattern">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight"
            >
              Shop the
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Future
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed"
            >
              Discover premium products with cutting-edge design. 
              Experience shopping reimagined with our curated collection.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => navigate("/shop")}
                size="xl"
                className="bg-white text-primary-600 hover:bg-gray-100 shadow-2xl"
              >
                <ApperIcon name="ShoppingBag" className="w-6 h-6 mr-2" />
                Start Shopping
              </Button>
              
              <Button
                onClick={() => navigate("/deals")}
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                <ApperIcon name="Zap" className="w-6 h-6 mr-2" />
                View Deals
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center space-x-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-gray-300 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5K+</div>
                <div className="text-gray-300 text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-gray-300 text-sm">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect"
              >
                <ApperIcon name="Truck" className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Free Shipping</h3>
                <p className="text-gray-200 text-sm">On orders over $50</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect mt-8"
              >
                <ApperIcon name="Shield" className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Secure Payment</h3>
                <p className="text-gray-200 text-sm">100% protected</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect"
              >
                <ApperIcon name="RotateCcw" className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Easy Returns</h3>
                <p className="text-gray-200 text-sm">30-day guarantee</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect mt-8"
              >
                <ApperIcon name="Headphones" className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">24/7 Support</h3>
                <p className="text-gray-200 text-sm">Always here to help</p>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
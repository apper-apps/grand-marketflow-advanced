import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PromotionalBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-600 relative overflow-hidden">
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
            >
              <ApperIcon name="Zap" className="w-4 h-4 mr-2" />
              Limited Time Offer
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight"
            >
              Up to 70% Off
              <span className="block text-yellow-300">Summer Sale</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-gray-100 leading-relaxed"
            >
              Don't miss out on incredible savings across all categories. 
              Premium products at unbeatable prices.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => navigate("/deals")}
                size="xl"
                className="bg-white text-primary-600 hover:bg-gray-100 shadow-2xl"
              >
                <ApperIcon name="Tag" className="w-6 h-6 mr-2" />
                Shop Sale
              </Button>
              
              <Button
                onClick={() => navigate("/new-arrivals")}
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                New Arrivals
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect"
              >
                <div className="text-4xl font-bold text-yellow-300 mb-2">70%</div>
                <div className="text-white font-medium">Off Electronics</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect mt-8"
              >
                <div className="text-4xl font-bold text-yellow-300 mb-2">50%</div>
                <div className="text-white font-medium">Off Fashion</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect"
              >
                <div className="text-4xl font-bold text-yellow-300 mb-2">60%</div>
                <div className="text-white font-medium">Off Home</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect mt-8"
              >
                <div className="text-4xl font-bold text-yellow-300 mb-2">40%</div>
                <div className="text-white font-medium">Off Sports</div>
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

export default PromotionalBanner;
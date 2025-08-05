import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const WhatsAppBanner = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Replace with actual business phone number
    const message = "Hi! I'm interested in your products and need assistance.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
<section className="py-16 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-28 h-28 bg-white rounded-full mb-8 shadow-2xl"
          >
            <ApperIcon name="ShoppingCart" className="w-14 h-14 text-green-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
          >
            Order via WhatsApp!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Skip the cart - place your order directly through WhatsApp! Get personalized service, 
            instant confirmation, and special deals available only through chat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          >
            <div className="flex items-center text-white">
              <ApperIcon name="Zap" className="w-5 h-5 mr-2 text-green-200" />
              <span className="font-medium">Instant Ordering</span>
            </div>
            <div className="flex items-center text-white">
              <ApperIcon name="Percent" className="w-5 h-5 mr-2 text-green-200" />
              <span className="font-medium">Exclusive Discounts</span>
            </div>
            <div className="flex items-center text-white">
              <ApperIcon name="Truck" className="w-5 h-5 mr-2 text-green-200" />
              <span className="font-medium">Fast Delivery</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleWhatsAppClick}
              size="xl"
              className="bg-white text-green-600 hover:bg-green-50 shadow-2xl text-lg px-8 py-4 font-bold transform hover:scale-105 transition-all duration-300"
            >
              <ApperIcon name="MessageCircle" className="w-6 h-6 mr-3" />
              Order Now on WhatsApp
            </Button>
            <div className="text-green-100 text-sm">
              <span className="font-medium">Response time: Under 2 minutes</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-green-100 text-sm"
          >
            <p className="font-medium mb-2">Why order through WhatsApp?</p>
            <div className="flex flex-wrap justify-center gap-6 mt-2 text-xs">
              <span>🛒 Quick Product Browsing</span>
              <span>💬 Real-time Order Updates</span>
              <span>🎁 Chat-only Special Offers</span>
              <span>📞 Direct Customer Support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-20 right-20 hidden lg:block"
      >
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <ApperIcon name="MessageSquare" className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-20 left-20 hidden lg:block"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <ApperIcon name="Phone" className="w-6 h-6 text-white" />
        </div>
      </motion.div>
    </section>
  );
};

export default WhatsAppBanner;
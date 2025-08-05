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
    <section className="py-16 bg-gradient-to-r from-green-500 via-green-600 to-green-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-2xl"
          >
            <ApperIcon name="MessageCircle" className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
          >
            Need Help? Chat with Us!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Get instant support from our friendly customer service team. 
            Whether you need product recommendations, order assistance, or have questions about our services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          >
            <div className="flex items-center text-white">
              <ApperIcon name="Clock" className="w-5 h-5 mr-2 text-green-200" />
              <span className="font-medium">Available 24/7</span>
            </div>
            <div className="flex items-center text-white">
              <ApperIcon name="Zap" className="w-5 h-5 mr-2 text-green-200" />
              <span className="font-medium">Instant Response</span>
            </div>
            <div className="flex items-center text-white">
              <ApperIcon name="Users" className="w-5 h-5 mr-2 text-green-200" />
              <span className="font-medium">Expert Support</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleWhatsAppClick}
              size="xl"
              className="bg-white text-green-600 hover:bg-green-50 shadow-2xl text-lg px-8 py-4 font-bold"
            >
              <ApperIcon name="MessageCircle" className="w-6 h-6 mr-3" />
              Start WhatsApp Chat
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-green-100 text-sm"
          >
            <p>Chat with us on WhatsApp for:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs">
              <span>• Product Questions</span>
              <span>• Order Tracking</span>
              <span>• Returns & Exchanges</span>
              <span>• Technical Support</span>
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
import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const QualityPromise = () => {
  const promises = [
    {
      icon: 'Shield',
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee on all products. If you\'re not happy, we\'ll make it right.'
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50. Express delivery available for urgent needs.'
    },
    {
      icon: 'RefreshCw',
      title: 'Easy Returns',
      description: '30-day hassle-free returns. No questions asked, full refund guaranteed.'
    },
    {
      icon: 'Award',
      title: 'Premium Quality',
      description: 'Hand-picked products from trusted suppliers. Every item meets our high standards.'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Round-the-clock customer support via chat, email, or phone. We\'re here to help.'
    },
    {
      icon: 'Lock',
      title: 'Secure Shopping',
      description: 'Your data is protected with industry-leading security. Shop with confidence.'
    }
  ];

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Our Quality Promise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing you with the best shopping experience. Here's what makes us different.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <ApperIcon
                  name={promise.icon}
                  className="w-8 h-8 text-primary-600 relative z-10"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {promise.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {promise.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8"
        >
          <ApperIcon name="Heart" className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Your Satisfaction is Our Priority
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join thousands of happy customers who trust us for their shopping needs. 
            Experience the difference quality makes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QualityPromise;
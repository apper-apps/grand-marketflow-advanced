import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "Youtube", icon: "Youtube", href: "#" }
  ];

  const paymentMethods = [
    "Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="ShoppingBag" className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl">MarketFlow</span>
            </div>
            <p className="text-gray-400">
              Your premium shopping destination for modern lifestyle products.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <ApperIcon name="Phone" className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <ApperIcon name="Mail" className="w-4 h-4" />
                <span>support@marketflow.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <ApperIcon name="MapPin" className="w-4 h-4" />
                <span>123 Commerce St, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <ApperIcon name={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-gray-800 rounded text-xs font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Newsletter</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get updates on new products and exclusive deals.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full">
                <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MarketFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
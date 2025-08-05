import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "grid" }) => {
  if (type === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="aspect-square bg-gray-200 shimmer"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded shimmer"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 shimmer"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "product") {
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-xl shimmer"></div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg shimmer"></div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
          <div className="h-12 bg-gray-200 rounded shimmer"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 shimmer"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded shimmer"></div>
            <div className="h-4 bg-gray-200 rounded shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
        <span className="text-gray-600 font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
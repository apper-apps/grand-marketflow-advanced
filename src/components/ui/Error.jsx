import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}. Don't worry, this usually happens when there's a temporary issue. 
          Please try again or contact support if the problem persists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <Button onClick={onRetry} className="flex items-center">
              <ApperIcon name="RefreshCw" className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
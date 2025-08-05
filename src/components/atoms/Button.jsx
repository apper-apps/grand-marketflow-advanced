import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}, ref) => {
  const variants = {
    primary: "gradient-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-white text-primary-600 border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-primary-600",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-2xl"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "font-medium transition-all duration-200 ease-out active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
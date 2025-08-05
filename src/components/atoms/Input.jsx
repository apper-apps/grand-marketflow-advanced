import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl bg-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 hover:border-gray-300",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
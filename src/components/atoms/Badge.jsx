import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary-100 text-primary-800 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 border-secondary-200",
    accent: "bg-accent-100 text-accent-800 border-accent-200",
    success: "bg-green-100 text-green-800 border-green-200",
    sale: "gradient-secondary text-white shadow-md transform rotate-3"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold border rounded-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
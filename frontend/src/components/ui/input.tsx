// src/components/ui/input.tsx
import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, leftElement, rightElement, disabled, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftElement}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            leftElement && "pl-10",
            rightElement && "pr-10",
            className
          )}
          disabled={disabled}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

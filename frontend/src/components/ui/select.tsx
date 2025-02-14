// src/components/ui/select.tsx
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={`block w-full rounded border border-gray-300 bg-white py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

// These are helper components that work with a native <select> element.
// In this implementation, they simply render the corresponding HTML elements.
const SelectTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  // The trigger is handled by the native select, so you may simply return a span.
  return <span className={`inline-block ${className}`}>{children}</span>;
};

const SelectValue: React.FC<{ placeholder: string; className?: string }> = ({
  placeholder,
  className = "",
}) => {
  return <span className={className}>{placeholder}</span>;
};

const SelectItem: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = "" }) => {
  return (
    <option value={value} className={className}>
      {children}
    </option>
  );
};

const SelectContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  // For a native select, there is no separate content wrapper.
  return <>{children}</>;
};

export { Select, SelectTrigger, SelectValue, SelectItem, SelectContent };

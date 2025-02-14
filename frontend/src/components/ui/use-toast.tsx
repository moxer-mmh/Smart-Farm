// src/components/ui/use-toast.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 w-full md:max-w-[420px] p-4 md:p-6 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto relative w-full rounded-lg border p-4 pr-8 shadow-lg",
              "animate-in slide-in-from-bottom-5",
              {
                "bg-white": toast.variant === "default",
                "bg-red-50 border-red-200": toast.variant === "destructive",
                "bg-green-50 border-green-200": toast.variant === "success",
              }
            )}
          >
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid gap-1">
              <div className="text-sm font-semibold">{toast.title}</div>
              {toast.description && (
                <div className="text-sm text-gray-500">{toast.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

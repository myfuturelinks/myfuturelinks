"use client";
import * as React from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastAction = Omit<Toast, "id">;

type ToastContextType = {
  toasts: Toast[];
  toast: (props: ToastAction) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const toast = (props: ToastAction) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...props }]);
    // auto-dismiss after 4s
    setTimeout(() => dismiss(id), 4000);
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl p-4 shadow-lg transition-all
              ${
                t.variant === "destructive"
                  ? "bg-red-600 text-white"
                  : "bg-ink text-white"
              }`}
          >
            {t.title && <div className="font-bold">{t.title}</div>}
            {t.description && (
              <div className="text-sm opacity-90">{t.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

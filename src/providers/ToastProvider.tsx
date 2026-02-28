'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { MAX_TOASTS, TOAST_DURATION } from '@/lib/constants';
import { generateId } from '@/lib/formatters';
import type { Toast, ToastType } from '@/lib/types';
import { ToastContainer } from '@/components/ui/Toast';

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType) => {
      const id = generateId();
      setToasts((prev) => {
        const next = [...prev, { id, message, type }];
        if (next.length > MAX_TOASTS) return next.slice(-MAX_TOASTS);
        return next;
      });
      setTimeout(() => {
        dismissToast(id);
      }, TOAST_DURATION);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { CommandPaletteProvider } from './CommandPaletteProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CommandPaletteProvider>
          {children}
        </CommandPaletteProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('neuraflow-demo-dismissed');
    if (!wasDismissed) setDismissed(false);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem('neuraflow-demo-dismissed', 'true');
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-gradient-to-r from-brand-600 to-neon-purple text-white"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
            <div className="flex items-center gap-2 text-sm">
              <Info className="h-4 w-4 flex-shrink-0" />
              <span>
                This is a UI demo — no real authentication or payments.{' '}
                <span className="font-medium">All data is simulated.</span>
              </span>
            </div>
            <button
              onClick={handleDismiss}
              className="rounded-lg p-1.5 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

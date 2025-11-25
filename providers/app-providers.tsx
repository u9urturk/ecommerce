'use client';

import React from 'react';

import { CartProvider } from '@/contexts/cart-context';
import { AuthProvider } from '@/contexts/auth-context';
import { UIProvider } from '@/contexts/ui-context';
import { LoadingProvider } from '@/contexts/loading-context';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Central provider wrapper that combines all context providers
 * Order matters: UI -> Loading -> Auth -> Cart (dependencies flow)
 */
export function AppProviders({ children }: AppProvidersProps) {
 return (
    <UIProvider>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </UIProvider>
  );
}
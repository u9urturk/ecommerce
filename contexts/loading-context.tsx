'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;
  startPageTransition: (message?: string) => void;
  endPageTransition: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Yükleniyor...');
  const pathname = usePathname();

  const setLoading = useCallback((loading: boolean, message = 'Yükleniyor...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  }, []);

  const startPageTransition = useCallback((message = 'Sayfa yükleniyor...') => {
    setLoading(true, message);
  }, [setLoading]);

  const endPageTransition = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  // Sayfa değişikliklerini takip et
  useEffect(() => {
    // Sayfa yüklendiğinde loading'i kapat
    const timer = setTimeout(() => {
      endPageTransition();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, endPageTransition]);

  const value: LoadingContextType = {
    isLoading,
    loadingMessage,
    setLoading,
    startPageTransition,
    endPageTransition,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Hook for page navigation with loading
export function useLoadingNavigation() {
  const router = useRouter();
  const { startPageTransition } = useLoading();

  const navigateWithLoading = useCallback((
    href: string, 
    options?: { 
      message?: string;
      replace?: boolean;
    }
  ) => {
    startPageTransition(options?.message);
    
    if (options?.replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  }, [router, startPageTransition]);

  return { navigateWithLoading };
}
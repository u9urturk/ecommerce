'use client';

import React from 'react';
import { useLoading } from '@/contexts/loading-context';
import { Loader2 } from 'lucide-react';

export function GlobalLoadingOverlay() {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            {/* Loading Spinner */}
            <div className="relative">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            </div>
            
            {/* Loading Message */}
            <div className="text-center">
              <h3 className="font-medium text-foreground">{loadingMessage}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Lütfen bekleyiniz...
              </p>
            </div>
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse" style={{
                animation: 'loading-bar 2s ease-in-out infinite'
              }} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// Alternative: Top Progress Bar (like GitHub/Vercel style)
export function TopProgressBar() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <div className="h-1 bg-primary/20">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{
            width: '100%',
            animation: 'progress-bar 2s ease-in-out infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress-bar {
          0% { 
            width: 0%; 
            transform: translateX(-100%);
          }
          50% { 
            width: 70%; 
            transform: translateX(0%);
          }
          100% { 
            width: 100%; 
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

// Floating Loading Button (minimal)
export function FloatingLoader() {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="text-sm font-medium text-foreground">
            {loadingMessage}
          </span>
        </div>
      </div>
    </div>
  );
}
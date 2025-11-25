import React from 'react';
import { CartItemSkeleton, Skeleton, CardSkeleton } from '../ui/skeleton';

export function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Skeleton height="h-10" width="w-20" rounded="lg" />
        </div>

        {/* Page Title */}
        <Skeleton height="h-8" width="w-32" className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-1">
            <div className="bg-card border border-border rounded-lg">
              {Array.from({ length: 3 }, (_, i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-6">
              <Skeleton height="h-10" width="w-40" rounded="lg" />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton height="h-5" width="w-5" rounded="sm" />
                  <Skeleton height="h-5" width="w-24" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton height="h-4" width="w-20" />
                    <Skeleton height="h-4" width="w-12" />
                  </div>
                  
                  <Skeleton height="h-px" width="w-full" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton height="h-4" width="w-32" />
                      <Skeleton height="h-4" width="w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton height="h-4" width="w-24" />
                      <Skeleton height="h-4" width="w-14" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton height="h-4" width="w-20" />
                      <Skeleton height="h-4" width="w-16" />
                    </div>
                  </div>
                  
                  <Skeleton height="h-px" width="w-full" />
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Skeleton height="h-4" width="w-4" />
                        <Skeleton height="h-4" width="w-20" />
                      </div>
                      <div className="text-right">
                        <Skeleton height="h-6" width="w-20" />
                        <Skeleton height="h-3" width="w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button Card */}
              <div className="bg-card border border-border rounded-lg p-4">
                <Skeleton height="h-12" width="w-full" rounded="lg" />
                <div className="mt-3 text-center">
                  <Skeleton height="h-3" width="w-48 mx-auto" />
                </div>
              </div>

              {/* Free Shipping Info */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Skeleton height="h-2" width="w-2" rounded="full" className="mt-2" />
                  <div className="space-y-2">
                    <Skeleton height="h-4" width="w-24" />
                    <Skeleton height="h-3" width="w-64" />
                    <Skeleton height="h-3" width="w-48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
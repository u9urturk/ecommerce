import React from 'react';
import { Skeleton } from '../ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton height="h-4" width="w-16" />
          <span className="text-muted-foreground">/</span>
          <Skeleton height="h-4" width="w-20" />
          <span className="text-muted-foreground">/</span>
          <Skeleton height="h-4" width="w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-card border border-border rounded-lg overflow-hidden">
              <Skeleton height="h-full" width="w-full" />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="aspect-square bg-card border border-border rounded-md overflow-hidden">
                  <Skeleton height="h-full" width="w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="space-y-2">
              <Skeleton height="h-4" width="w-24" />
              <Skeleton height="h-3" width="w-20" />
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <Skeleton height="h-8" width="w-3/4" />
              <Skeleton height="h-6" width="w-1/2" />
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} height="h-4" width="w-4" rounded="sm" />
                ))}
              </div>
              <Skeleton height="h-4" width="w-24" />
              <Skeleton height="h-4" width="w-20" />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton height="h-8" width="w-24" />
                <Skeleton height="h-5" width="w-20" />
                <Skeleton height="h-5" width="w-16" />
              </div>
              
              {/* KDV Info */}
              <div className="flex items-center gap-2">
                <Skeleton height="h-4" width="w-4" rounded="sm" />
                <Skeleton height="h-4" width="w-32" />
              </div>
              
              <Skeleton height="h-3" width="w-40" />
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Skeleton height="h-2" width="w-2" rounded="full" />
              <Skeleton height="h-4" width="w-32" />
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size/Color Options */}
              <div>
                <Skeleton height="h-5" width="w-16" className="mb-2" />
                <div className="flex gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <Skeleton key={i} height="h-10" width="w-16" rounded="md" />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <Skeleton height="h-5" width="w-12" className="mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton height="h-10" width="w-10" rounded="md" />
                  <Skeleton height="h-8" width="w-16" />
                  <Skeleton height="h-10" width="w-10" rounded="md" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Skeleton height="h-12" width="w-full" rounded="lg" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton height="h-10" width="w-full" rounded="lg" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-border">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton height="h-4" width="w-4" rounded="sm" />
                  <Skeleton height="h-4" width="w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          {/* Tab Headers */}
          <div className="border-b border-border">
            <div className="flex gap-8">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} height="h-10" width="w-24" />
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8 space-y-4">
            <Skeleton height="h-6" width="w-48" />
            <div className="space-y-2">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} height="h-4" width={i % 2 === 0 ? "w-full" : "w-3/4"} />
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Skeleton height="h-7" width="w-48" className="mx-auto" />
            <Skeleton height="h-4" width="w-64" className="mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 space-y-4">
                <Skeleton height="h-48" rounded="md" />
                <Skeleton height="h-3" width="w-16" />
                <div className="space-y-2">
                  <Skeleton height="h-4" width="w-3/4" />
                  <Skeleton height="h-4" width="w-1/2" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton height="h-5" width="w-20" />
                  <Skeleton height="h-8" width="w-16" rounded="md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Alternative: Compact Product Detail Skeleton
export function CompactProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Skeleton height="h-10" width="w-20" className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-card border border-border rounded-lg">
            <Skeleton height="h-full" width="w-full" />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <Skeleton height="h-6" width="w-3/4" />
            <Skeleton height="h-4" width="w-1/4" />
            
            {/* Price */}
            <div className="space-y-1">
              <Skeleton height="h-6" width="w-32" />
              <Skeleton height="h-3" width="w-24" />
            </div>

            {/* Add to Cart */}
            <div className="space-y-2">
              <Skeleton height="h-10" width="w-full" />
              <Skeleton height="h-8" width="w-3/4" />
            </div>

            {/* Quick Info */}
            <div className="space-y-2 pt-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton height="h-3" width="w-3" rounded="full" />
                  <Skeleton height="h-3" width="w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
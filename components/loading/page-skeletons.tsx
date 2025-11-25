import React from 'react';
import { ProductCardSkeleton, PageHeaderSkeleton, Skeleton } from '../ui/skeleton';

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 pt-40 pb-20">
        <div className="text-center space-y-6">
          <Skeleton height="h-12" width="w-96 mx-auto" />
          <Skeleton height="h-6" width="w-64 mx-auto" />
          <Skeleton height="h-4" width="w-[600px] mx-auto" />
          
          <div className="flex gap-4 justify-center mt-8">
            <Skeleton height="h-12" width="w-32" rounded="lg" />
            <Skeleton height="h-12" width="w-32" rounded="lg" />
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Skeleton height="h-8" width="w-48 mx-auto" />
          <Skeleton height="h-4" width="w-80 mx-auto" className="mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Offers Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-muted/30 rounded-lg p-8">
          <div className="text-center space-y-4">
            <Skeleton height="h-10" width="w-56 mx-auto" />
            <Skeleton height="h-16" width="w-48 mx-auto" rounded="lg" />
            <Skeleton height="h-12" width="w-40 mx-auto" rounded="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <PageHeaderSkeleton className="mb-8" />
        
        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <Skeleton height="h-10" width="w-32" rounded="lg" />
            <Skeleton height="h-10" width="w-24" rounded="lg" />
            <Skeleton height="h-10" width="w-28" rounded="lg" />
          </div>
          <div className="md:ml-auto">
            <Skeleton height="h-10" width="w-40" rounded="lg" />
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} height="h-10" width="w-10" rounded="lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Category Skeleton
export function ProductCategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton height="h-4" width="w-16" />
          <span className="text-muted-foreground">/</span>
          <Skeleton height="h-4" width="w-20" />
          <span className="text-muted-foreground">/</span>
          <Skeleton height="h-4" width="w-24" />
        </div>

        {/* Category Header */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton height="h-10" width="w-64 mx-auto" />
          <Skeleton height="h-5" width="w-96 mx-auto" />
          <Skeleton height="h-32" width="w-full" rounded="lg" />
        </div>

        {/* Filters Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton height="h-5" width="w-24" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Skeleton height="h-4" width="w-4" rounded="sm" />
                      <Skeleton height="h-4" width="w-20" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <Skeleton height="h-5" width="w-32" />
              <Skeleton height="h-10" width="w-40" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search Results Skeleton
export function SearchResultsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8 space-y-2">
          <Skeleton height="h-8" width="w-80" />
          <Skeleton height="h-4" width="w-64" />
        </div>

        {/* Search Filters */}
        <div className="flex gap-4 mb-8">
          <Skeleton height="h-10" width="w-24" />
          <Skeleton height="h-10" width="w-32" />
          <Skeleton height="h-10" width="w-28" />
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* No results message area */}
        <div className="text-center mt-12 space-y-3">
          <Skeleton height="h-6" width="w-48 mx-auto" />
          <Skeleton height="h-4" width="w-80 mx-auto" />
        </div>
      </div>
    </div>
  );
}
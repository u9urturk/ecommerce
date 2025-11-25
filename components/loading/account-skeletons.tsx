import React from 'react';
import { Skeleton } from '../ui/skeleton';

export function AccountPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <Skeleton height="h-8" width="w-48" />
          <Skeleton height="h-4" width="w-80" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                <Skeleton height="h-5" width="w-5" />
                <Skeleton height="h-4" width="w-24" />
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton height="h-16" width="w-16" rounded="full" />
                <div className="space-y-2">
                  <Skeleton height="h-6" width="w-48" />
                  <Skeleton height="h-4" width="w-64" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 space-y-2">
                  <Skeleton height="h-8" width="w-8" />
                  <Skeleton height="h-5" width="w-20" />
                  <Skeleton height="h-3" width="w-32" />
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <Skeleton height="h-6" width="w-32" className="mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-md">
                    <Skeleton height="h-8" width="w-8" rounded="full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton height="h-4" width="w-48" />
                      <Skeleton height="h-3" width="w-24" />
                    </div>
                    <Skeleton height="h-6" width="w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton height="h-8" width="w-32" />
            <Skeleton height="h-4" width="w-48" />
          </div>
          <Skeleton height="h-10" width="w-32" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} height="h-9" width="w-20" rounded="lg" />
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <Skeleton height="h-5" width="w-32" />
                  <Skeleton height="h-3" width="w-24" />
                </div>
                <Skeleton height="h-6" width="w-20" rounded="full" />
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {Array.from({ length: 2 }, (_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Skeleton height="h-12" width="w-12" rounded="md" />
                    <div className="flex-1 space-y-1">
                      <Skeleton height="h-4" width="w-48" />
                      <Skeleton height="h-3" width="w-24" />
                    </div>
                    <Skeleton height="h-4" width="w-16" />
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <Skeleton height="h-4" width="w-32" />
                <div className="flex gap-2">
                  <Skeleton height="h-8" width="w-20" rounded="md" />
                  <Skeleton height="h-8" width="w-24" rounded="md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WishlistPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton height="h-8" width="w-32" />
            <Skeleton height="h-4" width="w-48" />
          </div>
          <Skeleton height="h-10" width="w-24" />
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="relative">
                <Skeleton height="h-48" />
                <Skeleton height="h-8" width="w-8" className="absolute top-2 right-2" rounded="full" />
              </div>
              <div className="p-4 space-y-3">
                <Skeleton height="h-3" width="w-16" />
                <Skeleton height="h-4" width="w-3/4" />
                <div className="flex items-center justify-between">
                  <Skeleton height="h-5" width="w-20" />
                  <Skeleton height="h-8" width="w-16" rounded="md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
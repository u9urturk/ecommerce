import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ProductDetailLoading = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="w-24 h-10 bg-neutral-200 animate-pulse rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card>
              <div className="aspect-square bg-neutral-200 animate-pulse rounded-lg"></div>
            </Card>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-neutral-200 animate-pulse rounded-lg flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              {/* Brand & Category */}
              <div className="flex items-center gap-2">
                <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
                <div className="w-1 h-1 bg-neutral-200 rounded-full"></div>
                <div className="w-20 h-4 bg-neutral-200 animate-pulse rounded"></div>
              </div>

              {/* Product Title */}
              <div className="space-y-2">
                <div className="w-3/4 h-8 bg-neutral-200 animate-pulse rounded"></div>
                <div className="w-1/2 h-6 bg-neutral-200 animate-pulse rounded"></div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  ))}
                </div>
                <div className="w-12 h-4 bg-neutral-200 animate-pulse rounded"></div>
                <div className="w-24 h-4 bg-neutral-200 animate-pulse rounded"></div>
              </div>

              {/* Stock Status */}
              <div className="w-20 h-4 bg-neutral-200 animate-pulse rounded"></div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-8 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-20 h-6 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-12 h-6 bg-neutral-200 animate-pulse rounded"></div>
                </div>
                <div className="w-64 h-4 bg-neutral-200 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Product Actions Skeleton */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Quantity Selector */}
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="w-16 h-8 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="w-8 h-8 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="w-20 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <div className="flex-1 h-12 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-12 h-12 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-12 h-12 bg-neutral-200 animate-pulse rounded"></div>
                </div>
              </CardContent>
            </Card>

            {/* Features Skeleton */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-40 h-6 bg-neutral-200 animate-pulse rounded"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-neutral-200 animate-pulse rounded"></div>
                      <div className="w-32 h-4 bg-neutral-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Information Tabs Skeleton */}
            <Card>
              <CardHeader>
                <div className="flex gap-4">
                  {['Description', 'Specifications', 'Shipping'].map((tab, i) => (
                    <div key={i} className="w-24 h-6 bg-neutral-200 animate-pulse rounded"></div>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-32 h-5 bg-neutral-200 animate-pulse rounded"></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-full h-4 bg-neutral-200 animate-pulse rounded"></div>
                ))}
                <div className="w-3/4 h-4 bg-neutral-200 animate-pulse rounded"></div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-12 space-y-6">
          {/* Reviews Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-neutral-200 animate-pulse rounded"></div>
                <div className="w-32 h-6 bg-neutral-200 animate-pulse rounded"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Overall Rating */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-5 h-5 bg-neutral-200 animate-pulse rounded"></div>
                        ))}
                      </div>
                      <div className="w-32 h-4 bg-neutral-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-10 bg-neutral-200 animate-pulse rounded"></div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3">
                  <div className="w-32 h-5 bg-neutral-200 animate-pulse rounded"></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-neutral-200 animate-pulse rounded"></div>
                      <div className="flex-1 h-2 bg-neutral-200 animate-pulse rounded-full"></div>
                      <div className="w-6 h-4 bg-neutral-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-24 h-8 bg-neutral-200 animate-pulse rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-24 h-8 bg-neutral-200 animate-pulse rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                {/* Review Header */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-neutral-200 animate-pulse rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-4 bg-neutral-200 animate-pulse rounded"></div>
                      <div className="w-20 h-3 bg-neutral-200 animate-pulse rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-3 h-3 bg-neutral-200 animate-pulse rounded"></div>
                        ))}
                      </div>
                      <div className="w-20 h-3 bg-neutral-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-3">
                  <div className="w-3/4 h-5 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="w-full h-4 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="w-2/3 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  </div>
                </div>

                {/* Review Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                  <div className="w-24 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-16 h-8 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="w-16 h-8 bg-neutral-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLoading;
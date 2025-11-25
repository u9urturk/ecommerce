'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({ 
  className = "", 
  height = "h-4", 
  width = "w-full",
  rounded = "md"
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <div 
      className={`animate-pulse bg-muted ${height} ${width} ${roundedClasses[rounded]} ${className}`}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 space-y-4 ${className}`}>
      {/* Image */}
      <Skeleton height="h-48" rounded="md" />
      
      {/* Category */}
      <Skeleton height="h-3" width="w-20" />
      
      {/* Title */}
      <div className="space-y-2">
        <Skeleton height="h-4" width="w-3/4" />
        <Skeleton height="h-4" width="w-1/2" />
      </div>
      
      {/* Price */}
      <div className="flex items-center justify-between">
        <Skeleton height="h-5" width="w-24" />
        <Skeleton height="h-8" width="w-16" rounded="md" />
      </div>
    </div>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-start gap-4 p-4 bg-card border-b border-border ${className}`}>
      {/* Image */}
      <Skeleton height="h-20" width="w-20" rounded="lg" />
      
      <div className="flex-1 space-y-3">
        {/* Title & Category */}
        <div className="space-y-2">
          <Skeleton height="h-4" width="w-3/4" />
          <Skeleton height="h-3" width="w-1/4" />
        </div>
        
        {/* Price & Controls */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton height="h-4" width="w-20" />
            <Skeleton height="h-3" width="w-16" />
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Skeleton height="h-8" width="w-8" rounded="md" />
            <Skeleton height="h-6" width="w-8" />
            <Skeleton height="h-8" width="w-8" rounded="md" />
          </div>
        </div>
      </div>
      
      {/* Total Price */}
      <div className="text-right space-y-1">
        <Skeleton height="h-5" width="w-16" />
        <Skeleton height="h-3" width="w-12" />
      </div>
    </div>
  );
}

// Page Header Skeleton
export function PageHeaderSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Skeleton height="h-8" width="w-48" />
      <Skeleton height="h-4" width="w-96" />
    </div>
  );
}

// Card Skeleton (Generic)
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 space-y-4 ${className}`}>
      <Skeleton height="h-6" width="w-32" />
      <div className="space-y-2">
        <Skeleton height="h-4" width="w-full" />
        <Skeleton height="h-4" width="w-3/4" />
        <Skeleton height="h-4" width="w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton height="h-8" width="w-20" rounded="md" />
        <Skeleton height="h-8" width="w-16" rounded="md" />
      </div>
    </div>
  );
}

// List Skeleton
export function ListSkeleton({ 
  items = 3, 
  className = "" 
}: { 
  items?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
          <Skeleton height="h-10" width="w-10" rounded="full" />
          <div className="flex-1 space-y-2">
            <Skeleton height="h-4" width="w-3/4" />
            <Skeleton height="h-3" width="w-1/2" />
          </div>
          <Skeleton height="h-6" width="w-16" />
        </div>
      ))}
    </div>
  );
}
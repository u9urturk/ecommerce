'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ProductImage } from '@/types';

export interface ProductImagesProps {
  images: ProductImage[];
  productName: string;
  className?: string;
  variant?: 'default' | 'gallery' | 'minimal';
  allowZoom?: boolean;
  allowFullscreen?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  productName,
  className = '',
  variant = 'default',
  allowZoom = true,
  allowFullscreen = true,
  autoPlay = false,
  autoPlayDelay = 3000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  
  const mainImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            navigateImage('prev');
            break;
          case 'ArrowRight':
            navigateImage('next');
            break;
          case 'Escape':
            setIsFullscreen(false);
            setIsZoomed(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Navigate between images
  const navigateImage = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? (activeIndex + 1) % images.length
      : (activeIndex - 1 + images.length) % images.length;
    
    setActiveIndex(newIndex);
    setIsZoomed(false);
  };

  // Handle zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  // Handle image loading
  const handleImageLoad = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: true }));
  };

  // Scroll thumbnails into view
  const scrollThumbnailIntoView = (index: number) => {
    const thumbnailsContainer = thumbnailsRef.current;
    if (!thumbnailsContainer) return;

    const thumbnail = thumbnailsContainer.children[index] as HTMLElement;
    if (!thumbnail) return;

    thumbnail.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
    scrollThumbnailIntoView(index);
  };

  // Get current image
  const currentImage = images[activeIndex];

  if (!images || images.length === 0) {
    return (
      <div className={`product-images-empty bg-neutral-100 rounded-xl flex items-center justify-center h-96 ${className}`}>
        <p className="text-neutral-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div 
        ref={containerRef}
        className={`product-images-container ${className}`}
      >
        {/* Main Image Area */}
        <Card className="relative overflow-hidden bg-neutral-50 border-neutral-200 shadow-card">
          <div 
            className={`main-image-wrapper relative cursor-${allowZoom ? 'zoom-in' : 'pointer'} group ${
              variant === 'gallery' ? 'aspect-[4/3]' : 'aspect-square'
            }`}
            onMouseMove={handleMouseMove}
            onClick={() => allowZoom && setIsZoomed(!isZoomed)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {/* Loading State */}
            {isLoading[activeIndex] && (
              <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Main Image */}
            <img
              ref={mainImageRef}
              src={currentImage?.url}
              alt={currentImage?.alt || `${productName} - Image ${activeIndex + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isZoomed ? 'scale-200' : 'scale-100 group-hover:scale-105'
              }`}
              style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
              onLoad={() => handleImageLoad(activeIndex)}
              onLoadStart={() => handleImageLoadStart(activeIndex)}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-neutral-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 text-neutral-700" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-neutral-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-700" />
                </Button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {allowZoom && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white border-neutral-200 shadow-sm"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  <ZoomIn className="w-4 h-4 text-brand" />
                </Button>
              )}
              
              {allowFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(true);
                  }}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white border-neutral-200 shadow-sm"
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-brand" />
                </Button>
              )}
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-neutral-900/80 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                {activeIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </Card>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="thumbnails-container mt-4">
            <div 
              ref={thumbnailsRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300"
            >
              {images.map((image, index) => (
                <button
                  key={`${image.id}-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`thumbnail-button flex-shrink-0 relative overflow-hidden rounded-lg border-2 transition-all duration-300 ease-brand-ease hover:scale-105 ${
                    index === activeIndex 
                      ? 'border-brand shadow-card' 
                      : 'border-neutral-200 hover:border-brand-light'
                  }`}
                  style={{ width: '80px', height: '80px' }}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${productName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Active Overlay */}
                  {index === activeIndex && (
                    <div className="absolute inset-0 bg-brand/20 border border-brand rounded" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-full max-h-full p-4">
            {/* Close Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
              aria-label="Close fullscreen"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Fullscreen Image */}
            <img
              src={currentImage?.url}
              alt={currentImage?.alt || `${productName} - Full size`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              <p className="text-sm opacity-80">
                {activeIndex + 1} of {images.length} - {productName}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImages;
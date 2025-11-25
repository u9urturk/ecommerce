'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, generateImageUrl } from '@/lib/utils';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import type { Product } from '@/types';

export interface BestSellerProps {
  className?: string;
  showTitle?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const BestSeller: React.FC<BestSellerProps> = ({
  className = '',
  showTitle = true,
  variant = 'default'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mock best seller products data
  const bestSellerProducts: Product[] = [
    {
      id: "bs1",
      name: "Wireless AirPods Pro",
      description: "Premium wireless earbuds with active noise cancellation",
      price: 249.99,
      originalPrice: 299.99,
      images: [
        { id: "bs1", url: generateImageUrl(400, 400, 'airpods'), alt: "Wireless AirPods Pro", isPrimary: true }
      ],
      category: { id: "audio", name: "Audio", slug: "audio" },
      brand: "AudioTech",
      inStock: true,
      stockQuantity: 45,
      rating: 4.8,
      reviewCount: 342,
      tags: ["wireless", "noise-cancelling", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs2",
      name: "Smart Watch Series 9",
      description: "Advanced fitness tracking with health monitoring",
      price: 399.99,
      originalPrice: 449.99,
      images: [
        { id: "bs2", url: generateImageUrl(400, 400, 'smartwatch'), alt: "Smart Watch Series 9", isPrimary: true }
      ],
      category: { id: "wearables", name: "Wearables", slug: "wearables" },
      brand: "TechWear",
      inStock: true,
      stockQuantity: 23,
      rating: 4.7,
      reviewCount: 567,
      tags: ["smartwatch", "fitness", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs3",
      name: "Gaming Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard for gaming",
      price: 159.99,
      originalPrice: 199.99,
      images: [
        { id: "bs3", url: generateImageUrl(400, 400, 'keyboard'), alt: "Gaming Mechanical Keyboard", isPrimary: true }
      ],
      category: { id: "gaming", name: "Gaming", slug: "gaming" },
      brand: "GamerTech",
      inStock: true,
      stockQuantity: 67,
      rating: 4.6,
      reviewCount: 189,
      tags: ["gaming", "mechanical", "rgb", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs4",
      name: "4K Webcam Ultra",
      description: "Professional 4K webcam for streaming and meetings",
      price: 129.99,
      images: [
        { id: "bs4", url: generateImageUrl(400, 400, 'webcam'), alt: "4K Webcam Ultra", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "StreamTech",
      inStock: true,
      stockQuantity: 34,
      rating: 4.5,
      reviewCount: 276,
      tags: ["webcam", "4k", "streaming", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs5",
      name: "Portable Phone Charger",
      description: "Fast charging power bank 20,000mAh capacity",
      price: 49.99,
      originalPrice: 69.99,
      images: [
        { id: "bs5", url: generateImageUrl(400, 400, 'powerbank'), alt: "Portable Phone Charger", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "PowerTech",
      inStock: true,
      stockQuantity: 89,
      rating: 4.4,
      reviewCount: 423,
      tags: ["powerbank", "fast-charging", "portable", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs6",
      name: "Bluetooth Speaker Mini",
      description: "Compact wireless speaker with powerful bass",
      price: 79.99,
      images: [
        { id: "bs6", url: generateImageUrl(400, 400, 'speaker'), alt: "Bluetooth Speaker Mini", isPrimary: true }
      ],
      category: { id: "audio", name: "Audio", slug: "audio" },
      brand: "SoundTech",
      inStock: true,
      stockQuantity: 56,
      rating: 4.3,
      reviewCount: 198,
      tags: ["bluetooth", "speaker", "portable", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs7",
      name: "Wireless Gaming Mouse",
      description: "High precision gaming mouse with customizable buttons",
      price: 89.99,
      originalPrice: 109.99,
      images: [
        { id: "bs7", url: generateImageUrl(400, 400, 'mouse'), alt: "Wireless Gaming Mouse", isPrimary: true }
      ],
      category: { id: "gaming", name: "Gaming", slug: "gaming" },
      brand: "GamerTech",
      inStock: true,
      stockQuantity: 43,
      rating: 4.7,
      reviewCount: 312,
      tags: ["gaming", "mouse", "wireless", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs8",
      name: "USB-C Hub Adapter",
      description: "Multi-port USB-C hub with HDMI and fast charging",
      price: 39.99,
      images: [
        { id: "bs8", url: generateImageUrl(400, 400, 'usb-hub'), alt: "USB-C Hub Adapter", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "ConnectTech",
      inStock: true,
      stockQuantity: 78,
      rating: 4.2,
      reviewCount: 156,
      tags: ["usb-c", "hub", "adapter", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs9",
      name: "Noise Cancelling Headphones",
      description: "Over-ear headphones with premium noise cancellation",
      price: 199.99,
      originalPrice: 249.99,
      images: [
        { id: "bs9", url: generateImageUrl(400, 400, 'headphones'), alt: "Noise Cancelling Headphones", isPrimary: true }
      ],
      category: { id: "audio", name: "Audio", slug: "audio" },
      brand: "AudioTech",
      inStock: true,
      stockQuantity: 29,
      rating: 4.8,
      reviewCount: 445,
      tags: ["headphones", "noise-cancelling", "premium", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs10",
      name: "Smart Home Camera",
      description: "1080p security camera with motion detection",
      price: 119.99,
      images: [
        { id: "bs10", url: generateImageUrl(400, 400, 'camera'), alt: "Smart Home Camera", isPrimary: true }
      ],
      category: { id: "home", name: "Home", slug: "home" },
      brand: "SecureTech",
      inStock: true,
      stockQuantity: 37,
      rating: 4.4,
      reviewCount: 234,
      tags: ["security", "camera", "smart-home", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs11",
      name: "Fitness Tracker Band",
      description: "Health monitoring wristband with sleep tracking",
      price: 69.99,
      originalPrice: 89.99,
      images: [
        { id: "bs11", url: generateImageUrl(400, 400, 'fitness'), alt: "Fitness Tracker Band", isPrimary: true }
      ],
      category: { id: "wearables", name: "Wearables", slug: "wearables" },
      brand: "HealthTech",
      inStock: true,
      stockQuantity: 62,
      rating: 4.1,
      reviewCount: 167,
      tags: ["fitness", "tracker", "health", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bs12",
      name: "Tablet Stand Adjustable",
      description: "Universal tablet stand with 360° rotation",
      price: 24.99,
      images: [
        { id: "bs12", url: generateImageUrl(400, 400, 'stand'), alt: "Tablet Stand Adjustable", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "StandTech",
      inStock: true,
      stockQuantity: 94,
      rating: 4.0,
      reviewCount: 89,
      tags: ["tablet", "stand", "adjustable", "bestseller"],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  // Variant specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'py-12',
          title: 'text-2xl md:text-3xl',
          grid: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
          cardPadding: 'p-4'
        };
      case 'featured':
        return {
          container: 'py-20',
          title: 'text-3xl md:text-4xl',
          grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          cardPadding: 'p-6'
        };
      default:
        return {
          container: 'py-16',
          title: 'text-3xl md:text-4xl',
          grid: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
          cardPadding: 'p-4'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <section 
      ref={sectionRef}
      className={`bg-gradient-to-b from-background to-neutral-900 ${styles.container} ${className}`}
    >
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className={`font-bold text-white mb-4 ${styles.title}`}>
              🔥 Best Sellers
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Discover our most popular products loved by thousands of customers
            </p>
          </div>
        )}

        <div className={`grid ${styles.grid} gap-6`}>
          {bestSellerProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className={`bg-neutral-800 border-neutral-700 overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group cursor-pointer transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms` 
              }}
              onClick={() => window.location.href = `/products/${product.id}`}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-neutral-700 relative overflow-hidden">
                  <img 
                    src={product.images[0]?.url} 
                    alt={product.images[0]?.alt || product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Discount Badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}

                  {/* Best Seller Badge */}
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Best
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <CardHeader className={`pb-2 ${styles.cardPadding}`}>
                <CardTitle className="text-sm md:text-base text-white line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {variant !== 'compact' && (
                  <CardDescription className="text-neutral-400 text-xs md:text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className={`pt-0 ${styles.cardPadding}`}>
                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold text-sm md:text-base">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-neutral-400 line-through text-xs">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                    <span className="text-neutral-300 text-xs">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-neutral-500 text-xs">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs group-hover:bg-primary group-hover:scale-105 transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Added to cart:', product.name);
                  }}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            onClick={() => window.location.href = '/products?filter=bestseller'}
          >
            View All Best Sellers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;

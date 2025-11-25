'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, generateImageUrl } from '@/lib/utils';
import { Percent, Clock, ShoppingCart, Heart, Zap } from 'lucide-react';
import type { Product } from '@/types';

export interface OfferSectionProps {
  className?: string;
  showTitle?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  timeLimit?: string;
}

const OfferSection: React.FC<OfferSectionProps> = ({
  className = '',
  showTitle = true,
  variant = 'default',
  timeLimit = '24:00:00'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const sectionRef = useRef<HTMLElement>(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const [hours, minutes, seconds] = timeLeft.split(':').map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      if (totalSeconds > 0) {
        totalSeconds -= 1;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        
        setTimeLeft(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

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

  // Mock offer products data - all have discounts
  const offerProducts: Product[] = [
    {
      id: "off1",
      name: "Gaming Laptop RTX 4070",
      description: "High-performance gaming laptop with RTX 4070 graphics",
      price: 1299.99,
      originalPrice: 1799.99,
      images: [
        { id: "off1", url: generateImageUrl(400, 400, 'laptop'), alt: "Gaming Laptop RTX 4070", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "GamerTech",
      inStock: true,
      stockQuantity: 15,
      rating: 4.7,
      reviewCount: 298,
      tags: ["gaming", "laptop", "offer", "limited"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off2",
      name: "Wireless Earbuds Pro Max",
      description: "Premium wireless earbuds with spatial audio",
      price: 179.99,
      originalPrice: 249.99,
      images: [
        { id: "off2", url: generateImageUrl(400, 400, 'earbuds'), alt: "Wireless Earbuds Pro Max", isPrimary: true }
      ],
      category: { id: "audio", name: "Audio", slug: "audio" },
      brand: "AudioTech",
      inStock: true,
      stockQuantity: 32,
      rating: 4.6,
      reviewCount: 445,
      tags: ["wireless", "earbuds", "offer", "spatial-audio"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off3",
      name: "4K Smart TV 55 inch",
      description: "Ultra HD Smart TV with HDR and built-in streaming",
      price: 599.99,
      originalPrice: 899.99,
      images: [
        { id: "off3", url: generateImageUrl(400, 400, 'tv'), alt: "4K Smart TV 55 inch", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "TechVision",
      inStock: true,
      stockQuantity: 8,
      rating: 4.5,
      reviewCount: 167,
      tags: ["tv", "4k", "smart", "offer"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off4",
      name: "Professional Coffee Machine",
      description: "Espresso machine with milk frother and grinder",
      price: 449.99,
      originalPrice: 699.99,
      images: [
        { id: "off4", url: generateImageUrl(400, 400, 'coffee'), alt: "Professional Coffee Machine", isPrimary: true }
      ],
      category: { id: "home", name: "Home", slug: "home" },
      brand: "BrewMaster",
      inStock: true,
      stockQuantity: 12,
      rating: 4.8,
      reviewCount: 234,
      tags: ["coffee", "espresso", "offer", "kitchen"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off5",
      name: "Smartphone 256GB",
      description: "Latest flagship smartphone with triple camera system",
      price: 799.99,
      originalPrice: 999.99,
      images: [
        { id: "off5", url: generateImageUrl(400, 400, 'phone'), alt: "Smartphone 256GB", isPrimary: true }
      ],
      category: { id: "phones", name: "Phones", slug: "phones" },
      brand: "TechMobile",
      inStock: true,
      stockQuantity: 24,
      rating: 4.4,
      reviewCount: 512,
      tags: ["smartphone", "camera", "offer", "5g"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off6",
      name: "Electric Bicycle",
      description: "Eco-friendly e-bike with long-range battery",
      price: 1199.99,
      originalPrice: 1599.99,
      images: [
        { id: "off6", url: generateImageUrl(400, 400, 'bicycle'), alt: "Electric Bicycle", isPrimary: true }
      ],
      category: { id: "sports", name: "Sports", slug: "sports" },
      brand: "EcoRide",
      inStock: true,
      stockQuantity: 6,
      rating: 4.3,
      reviewCount: 89,
      tags: ["bicycle", "electric", "offer", "eco"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off7",
      name: "Wireless Charging Pad",
      description: "Fast wireless charger compatible with all devices",
      price: 29.99,
      originalPrice: 49.99,
      images: [
        { id: "off7", url: generateImageUrl(400, 400, 'charger'), alt: "Wireless Charging Pad", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "ChargeTech",
      inStock: true,
      stockQuantity: 78,
      rating: 4.2,
      reviewCount: 156,
      tags: ["wireless", "charging", "offer", "fast"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off8",
      name: "Robotic Vacuum Cleaner",
      description: "Smart robot vacuum with mapping and app control",
      price: 299.99,
      originalPrice: 449.99,
      images: [
        { id: "off8", url: generateImageUrl(400, 400, 'vacuum'), alt: "Robotic Vacuum Cleaner", isPrimary: true }
      ],
      category: { id: "home", name: "Home", slug: "home" },
      brand: "CleanBot",
      inStock: true,
      stockQuantity: 18,
      rating: 4.6,
      reviewCount: 278,
      tags: ["robot", "vacuum", "offer", "smart"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off9",
      name: "Drone 4K Camera",
      description: "Professional drone with 4K camera and gimbal",
      price: 599.99,
      originalPrice: 799.99,
      images: [
        { id: "off9", url: generateImageUrl(400, 400, 'drone'), alt: "Drone 4K Camera", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "SkyTech",
      inStock: true,
      stockQuantity: 9,
      rating: 4.5,
      reviewCount: 134,
      tags: ["drone", "camera", "offer", "4k"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off10",
      name: "Portable SSD 2TB",
      description: "Ultra-fast portable SSD for backup and storage",
      price: 199.99,
      originalPrice: 299.99,
      images: [
        { id: "off10", url: generateImageUrl(400, 400, 'ssd'), alt: "Portable SSD 2TB", isPrimary: true }
      ],
      category: { id: "electronics", name: "Electronics", slug: "electronics" },
      brand: "StoreTech",
      inStock: true,
      stockQuantity: 45,
      rating: 4.7,
      reviewCount: 201,
      tags: ["ssd", "storage", "offer", "portable"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off11",
      name: "Bluetooth Headphones",
      description: "Premium over-ear headphones with 30h battery life",
      price: 149.99,
      originalPrice: 219.99,
      images: [
        { id: "off11", url: generateImageUrl(400, 400, 'headphones'), alt: "Bluetooth Headphones", isPrimary: true }
      ],
      category: { id: "audio", name: "Audio", slug: "audio" },
      brand: "AudioPro",
      inStock: true,
      stockQuantity: 38,
      rating: 4.4,
      reviewCount: 312,
      tags: ["headphones", "bluetooth", "offer", "battery"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "off12",
      name: "Smart Home Hub",
      description: "Central hub for all your smart home devices",
      price: 89.99,
      originalPrice: 139.99,
      images: [
        { id: "off12", url: generateImageUrl(400, 400, 'smarthub'), alt: "Smart Home Hub", isPrimary: true }
      ],
      category: { id: "home", name: "Home", slug: "home" },
      brand: "SmartTech",
      inStock: true,
      stockQuantity: 27,
      rating: 4.3,
      reviewCount: 178,
      tags: ["smart-home", "hub", "offer", "automation"],
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
      className={`bg-gradient-to-b from-neutral-900 to-neutral-950 ${styles.container} ${className}`}
    >
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Title with Flash Sale Icon */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h2 className={`font-bold text-white ${styles.title}`}>
                ⚡ Flash Sale
              </h2>
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto mb-6">
              Limited time offers on premium products - Don't miss out!
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold text-lg">
                  Ends in: {timeLeft}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={`grid ${styles.grid} gap-6`}>
          {offerProducts.map((product, index) => {
            const discountPercentage = Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100);
            
            return (
              <Card 
                key={product.id} 
                className={`bg-neutral-800 border-neutral-700 border-2 border-red-500/30 overflow-hidden hover:shadow-xl hover:shadow-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 group cursor-pointer transform ${
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
                    
                    {/* Flash Sale Badge */}
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                      <Percent className="w-3 h-3" />
                      -{discountPercentage}%
                    </div>

                    {/* Limited Stock Badge */}
                    {product.stockQuantity <= 20 && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                        Only {product.stockQuantity} left!
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <CardHeader className={`pb-2 ${styles.cardPadding}`}>
                  <CardTitle className="text-sm md:text-base text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                    {product.name}
                  </CardTitle>
                  {variant !== 'compact' && (
                    <CardDescription className="text-neutral-400 text-xs md:text-sm line-clamp-2">
                      {product.description}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className={`pt-0 ${styles.cardPadding}`}>
                  {/* Price with emphasis on savings */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-400 font-bold text-sm md:text-base">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-neutral-500 line-through text-xs">
                        {formatPrice(product.originalPrice!)}
                      </span>
                    </div>
                    <div className="text-green-400 text-xs font-semibold">
                      Save {formatPrice(product.originalPrice! - product.price)}!
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-neutral-300 text-xs">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-xs">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Add to Cart Button with urgency */}
                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-xs group-hover:scale-105 transition-all duration-200 font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Added to cart:', product.name);
                    }}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Grab Deal Now!
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Offers Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            variant="outline" 
            size="lg"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 bg-transparent"
            onClick={() => window.location.href = '/products?filter=offers'}
          >
            View All Flash Offers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;

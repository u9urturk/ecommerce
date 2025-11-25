'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, Users, ShoppingBag, Sparkles } from 'lucide-react';
import { generateImageUrl } from '@/lib/utils';
import { useLoadingNavigation } from '@/contexts/loading-context';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  showStats?: boolean;
  showFeaturedCategories?: boolean;
  backgroundImage?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Welcome to Aspaio Oz",
  subtitle = "Premium E-Commerce Experience",
  description = "Discover amazing products and enjoy a seamless shopping experience with our curated collection of high-quality items.",
  primaryButtonText = "Shop Now",
  secondaryButtonText = "Learn More",
  primaryButtonLink = '/products',
  secondaryButtonLink = '/about',
  showStats = true,
  showFeaturedCategories = true,
  backgroundImage = generateImageUrl(1920, 1080, 'hero'),
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { navigateWithLoading } = useLoadingNavigation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock stats data
  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: ShoppingBag, value: "25K+", label: "Products Sold" },
    { icon: Star, value: "4.9", label: "Customer Rating" },
    { icon: Sparkles, value: "99%", label: "Satisfaction Rate" }
  ];

  // Mock featured categories
  const featuredCategories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Latest tech gadgets and accessories",
      image: generateImageUrl(300, 200, 'electronics'),
      itemCount: "2.5K+ items"
    },
    {
      id: "fashion",
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image: generateImageUrl(300, 200, 'fashion'),
      itemCount: "1.8K+ items"
    },
    {
      id: "home-garden",
      name: "Home & Garden",
      description: "Beautiful items for your space",
      image: generateImageUrl(300, 200, 'home'),
      itemCount: "3.2K+ items"
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      description: "Equipment for active lifestyle",
      image: generateImageUrl(300, 200, 'sports'),
      itemCount: "1.2K+ items"
    },
    {
      id: "beauty",
      name: "Beauty & Care",
      description: "Cosmetics and personal care",
      image: generateImageUrl(300, 200, 'beauty'),
      itemCount: "890+ items"
    },
    {
      id: "automotive",
      name: "Automotive",
      description: "Car accessories and tools",
      image: generateImageUrl(300, 200, 'automotive'),
      itemCount: "750+ items"
    }
  ];

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen flex flex-col justify-center items-center overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Hero Text */}
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {subtitle}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            {title.split(' ').map((word, index) => (
              <span 
                key={index} 
                className={`inline-block transition-all duration-700 delay-${index * 100}`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <p className={`text-xl md:text-2xl text-neutral-200 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {description}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button
              onClick={() => navigateWithLoading(primaryButtonLink, { message: 'Ürünler yükleniyor...' })}
              className="btn-primary text-lg px-8 py-4 h-14 min-w-48 group"
            >
              {primaryButtonText}
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigateWithLoading(secondaryButtonLink, { message: 'Sayfa yükleniyor...' })}
              variant="outline"
              className="text-lg px-8 py-4 h-14 min-w-48 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              {secondaryButtonText}
            </Button>
          </div>

          {/* Stats Section */}
          {showStats && (
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-primary mb-3" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-neutral-300 text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Categories */}
        {showFeaturedCategories && (
          <div className={`transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              Popular Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category, index) => (
                <div 
                  key={category.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer hover:-translate-y-2"
                  onClick={() => window.location.href = `/products/category/${category.id}`}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {category.itemCount}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-neutral-300 text-sm">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

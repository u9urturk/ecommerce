'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Laptop, Smartphone, Headphones, Camera, Watch, Gamepad2, Home, Shirt } from 'lucide-react';
import { useAutoHide } from '@/hooks/useAutoHide';

type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count: number;
  color: string;
  href: string;
};

export interface CategoryNavProps {
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  autoHide?: boolean;
  hideDelay?: number;
  showOnTop?: boolean;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory = 'all',
  onCategoryChange,
  variant = 'default',
  className = '',
  autoHide = true,
  hideDelay = 2000,
  showOnTop = false
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // Use the auto-hide hook
  const {
    isVisible,
    elementRef,
    handleMouseEnter,
    handleMouseLeave
  } = useAutoHide({
    autoHide,
    hideDelay,
    showOnTop,
    scrollThreshold: 150,
    topThreshold: 80,
    animationDuration: 300,
    hideDirection: 'up',
    easing: 'power2.out'
  });

  // Sync containerRef with hook's elementRef
  useEffect(() => {
    if (containerRef.current && elementRef.current !== containerRef.current) {
      (elementRef as React.MutableRefObject<HTMLElement | null>).current = containerRef.current;
    }
  }, [elementRef]);

  // Mock categories data - in real app this would come from props or API
  const categories: Category[] = [
    {
      id: 'all',
      name: 'All Products',
      icon: ShoppingBag,
      count: 1248,
      color: 'hsl(var(--primary))',
      href: '/products'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: Laptop,
      count: 234,
      color: 'hsl(220, 70%, 50%)',
      href: '/products/electronics'
    },
    {
      id: 'phones',
      name: 'Smartphones',
      icon: Smartphone,
      count: 89,
      color: 'hsl(150, 70%, 45%)',
      href: '/products/phones'
    },
    {
      id: 'audio',
      name: 'Audio & Music',
      icon: Headphones,
      count: 156,
      color: 'hsl(260, 70%, 55%)',
      href: '/products/audio'
    },
    {
      id: 'cameras',
      name: 'Photography',
      icon: Camera,
      count: 67,
      color: 'hsl(35, 85%, 55%)',
      href: '/products/cameras'
    },
    {
      id: 'wearables',
      name: 'Wearables',
      icon: Watch,
      count: 112,
      color: 'hsl(320, 75%, 55%)',
      href: '/products/wearables'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: Gamepad2,
      count: 198,
      color: 'hsl(15, 80%, 55%)',
      href: '/products/gaming'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: Home,
      count: 334,
      color: 'hsl(120, 60%, 50%)',
      href: '/products/home'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: Shirt,
      count: 567,
      color: 'hsl(300, 65%, 55%)',
      href: '/products/fashion'
    }
  ];

  // Check scroll position and update navigation buttons
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Smooth scroll function
  const scrollToPosition = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container || isScrolling) return;

    setIsScrolling(true);
    const scrollAmount = 300;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    setTimeout(() => setIsScrolling(false), 300);
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange?.(categoryId);
  };

  // Set up scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  // Variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'h-12',
          item: 'px-3 py-2 text-sm',
          icon: 'w-4 h-4'
        };
      case 'featured':
        return {
          container: 'h-20',
          item: 'px-6 py-4 text-base',
          icon: 'w-6 h-6'
        };
      default:
        return {
          container: 'h-16',
          item: 'px-4 py-3 text-sm',
          icon: 'w-5 h-5'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      ref={containerRef}
      className={`category-nav-container relative bg-white/80 backdrop-blur-md border border-neutral-200/30 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={() => scrollToPosition('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-105"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-600" />
        </button>
      )}

      {/* Scrollable Categories Container */}
      <div
        ref={scrollContainerRef}
        className={`flex items-center gap-2 overflow-x-auto overflow-y-hidden px-3 py-2 scrollbar-hide ${styles.container}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                flex-shrink-0 flex items-center gap-2 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md group
                ${styles.item}
                ${isActive 
                  ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-primary/30'
                }
              `}
            >
              <Icon 
                className={`${styles.icon} transition-transform group-hover:scale-110 ${
                  isActive ? '' : ''
                }`}
              />
              <span className="font-medium whitespace-nowrap">
                {category.name}
              </span>
              {variant !== 'compact' && (
                <span className={`
                  text-xs px-2 py-0.5 rounded-full font-semibold
                  ${isActive 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-neutral-100 text-neutral-500'
                  }
                `}>
                  {category.count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={() => scrollToPosition('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-105"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-neutral-600" />
        </button>
      )}

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryNav;

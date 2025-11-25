'use client';

import { useMemo } from 'react';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { useUI } from '@/contexts/ui-context';

// Cart Selectors - Only re-render when specific values change
export const useCartSelectors = () => {
  const cart = useCart();
  
  return useMemo(() => ({
    // Basic selectors
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    isEmpty: cart.isEmpty,
    itemCount: cart.items.length,
    
    // Computed selectors
    subtotal: cart.totalPrice,
    shipping: cart.totalPrice > 500 ? 0 : 50,
    tax: cart.totalPrice * 0.18,
    finalTotal: cart.totalPrice + (cart.totalPrice > 500 ? 0 : 50) + (cart.totalPrice * 0.18),
    
    // Status selectors
    hasItems: cart.items.length > 0,
    isLarge: cart.totalItems >= 5,
    qualifiesForFreeShipping: cart.totalPrice > 500,
    
    // Item selectors
    firstItem: cart.items[0] || null,
    lastItem: cart.items[cart.items.length - 1] || null,
    mostExpensiveItem: cart.items.reduce((max, item) => 
      item.product.price > (max?.product.price || 0) ? item : max, cart.items[0] || null),
    
    // Category breakdown
    categoryBreakdown: cart.items.reduce((acc, item) => {
      const category = item.product.category?.name || 'Uncategorized';
      acc[category] = (acc[category] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>),
  }), [cart.items, cart.totalItems, cart.totalPrice, cart.isEmpty]);
};

// Auth Selectors
export const useAuthSelectors = () => {
  const auth = useAuth();
  
  return useMemo(() => ({
    // Basic selectors
    isLoggedIn: auth.isAuthenticated,
    userName: auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : null,
    userInitials: auth.user ? `${auth.user.firstName[0]}${auth.user.lastName[0]}` : null,
    userEmail: auth.user?.email || null,
    
    // Status selectors
    hasProfile: !!auth.user,
    hasAddresses: (auth.user?.addresses?.length || 0) > 0,
    hasDefaultAddress: auth.user?.addresses?.some(addr => addr.isDefault) || false,
    
    // Permission selectors
    canOrder: auth.isAuthenticated && !auth.isLoading,
    canViewOrders: auth.isAuthenticated,
    canEditProfile: auth.isAuthenticated,
  }), [auth.user, auth.isAuthenticated, auth.isLoading]);
};

// UI Selectors
export const useUISelectors = () => {
  const ui = useUI();
  
  return useMemo(() => ({
    // Basic selectors
    isDarkMode: ui.theme === 'dark',
    isLightMode: ui.theme === 'light',
    isSystemMode: ui.theme === 'system',
    
    // Navigation selectors
    hasOpenModals: ui.modals.length > 0,
    hasNotifications: ui.notifications.length > 0,
    notificationCount: ui.notifications.length,
    
    // Status selectors
    isMenuOpen: ui.isMenuOpen,
    isSearchOpen: ui.isSearchOpen,
    isLoading: ui.isLoading,
    isMobile: ui.isMobile,
    
    // Responsive selectors
    isDesktop: !ui.isMobile && ['lg', 'xl', '2xl'].includes(ui.breakpoint),
    isTablet: ui.breakpoint === 'md',
    isSmall: ['sm'].includes(ui.breakpoint),
    
    // Scroll selectors
    isScrollingDown: ui.scrollDirection === 'down',
    isScrollingUp: ui.scrollDirection === 'up',
    isAtTop: ui.lastScrollY <= 100,
  }), [ui.theme, ui.modals.length, ui.notifications.length, ui.isMenuOpen, 
       ui.isSearchOpen, ui.isLoading, ui.isMobile, ui.breakpoint, 
       ui.scrollDirection, ui.lastScrollY]);
};

// Combined Selectors for common use cases
export const useShoppingSelectors = () => {
  const cart = useCartSelectors();
  const auth = useAuthSelectors();
  
  return useMemo(() => ({
    // Shopping flow selectors
    canProceedToCheckout: cart.hasItems && auth.canOrder,
    needsLogin: cart.hasItems && !auth.isLoggedIn,
    needsAddress: auth.isLoggedIn && !auth.hasDefaultAddress,
    
    // Recommendation selectors
    shouldShowUpsells: cart.hasItems && cart.totalPrice < 300,
    shouldShowCrossSells: cart.itemCount >= 1 && cart.itemCount <= 3,
    shouldShowFreeShippingPromo: !cart.qualifiesForFreeShipping && cart.totalPrice > 200,
    
    // Display selectors
    checkoutButtonText: !auth.isLoggedIn ? 'Giriş Yap ve Ödeme Yap' : 'Ödeme Yap',
    cartSummaryTitle: `Sepetim (${cart.totalItems})`,
    shippingMessage: cart.qualifiesForFreeShipping 
      ? 'Ücretsiz kargo kazandınız!' 
      : `₺${(500 - cart.subtotal).toFixed(2)} daha harcayın, ücretsiz kargo kazanın`,
  }), [cart, auth]);
};

// Performance monitoring selectors
export const usePerformanceSelectors = () => {
  const cart = useCart();
  const auth = useAuth();
  const ui = useUI();
  
  return useMemo(() => ({
    // Render indicators
    cartRenderKey: `cart-${cart.items.length}-${cart.totalPrice}`,
    authRenderKey: `auth-${auth.isAuthenticated}-${auth.user?.id}`,
    uiRenderKey: `ui-${ui.theme}-${ui.breakpoint}-${ui.isMenuOpen}`,
    
    // Performance flags
    shouldUseVirtualization: cart.items.length > 50,
    shouldLazyLoadImages: cart.items.length > 10,
    shouldDebounceSearch: ui.isSearchOpen,
    
    // Memory management
    largeCartWarning: cart.items.length > 100,
    shouldClearCache: ui.notifications.length > 20,
  }), [cart.items.length, cart.totalPrice, auth.isAuthenticated, auth.user?.id,
       ui.theme, ui.breakpoint, ui.isMenuOpen, ui.isSearchOpen, ui.notifications.length]);
};
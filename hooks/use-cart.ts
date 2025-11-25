// Cart hooks that use context
// Direct import to bypass module resolution issues
// import { useCart as useCartContext } from '@/contexts/cart-context';

// Temporary basic implementation
export const useCart = () => {
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isEmpty: true,
    isLoading: false,
    error: null,
    isOpen: false,
    addItem: () => {},
    removeItem: () => {},
    updateQuantity: () => {},
    updateVariant: () => {},
    clearCart: () => {},
    toggleDrawer: () => {},
    openDrawer: () => {},
    closeDrawer: () => {},
    getItemQuantity: () => 0,
    hasItem: () => false
  };
};

export const useCartSummary = () => {
  const { totalItems, totalPrice, isLoading } = useCart();
  return {
    totalItems,
    totalPrice,
    isLoading
  };
};

export const useCartDrawer = () => {
  const { isOpen, toggleDrawer, openDrawer, closeDrawer } = useCart();
  return {
    isOpen,
    open: openDrawer,
    close: closeDrawer,
    toggle: toggleDrawer
  };
};
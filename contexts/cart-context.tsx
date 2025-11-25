'use client';

import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import { CartItem, Product } from '@/types';

// Cart State Interface
interface CartState {
    items: CartItem[];
    isLoading: boolean;
    error: string | null;
    isOpen: boolean; // For cart drawer
}

// Cart Actions
type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; variant?: string } }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'UPDATE_VARIANT'; payload: { id: string; variant: string } }
    | { type: 'CLEAR_CART' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'TOGGLE_DRAWER' }
    | { type: 'SET_DRAWER'; payload: boolean }
    | { type: 'LOAD_CART'; payload: CartItem[] };

// Initial State
const initialState: CartState = {
    items: [],
    isLoading: false,
    error: null,
    isOpen: false,
};

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, quantity = 1, variant } = action.payload;
            const existingItemIndex = state.items.findIndex(
                item => item.product.id === product.id && item.variant === variant
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity,
                };
                return {
                    ...state,
                    items: updatedItems,
                    error: null,
                };
            }

            const newItem: CartItem = {
                id: `${product.id}-${variant || 'default'}-${Date.now()}`,
                product,
                quantity,
                variant,
                addedAt: new Date(),
            };

            return {
                ...state,
                items: [...state.items, newItem],
                error: null,
            };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                error: null,
            };

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                ),
                error: null,
            };
        }

        case 'UPDATE_VARIANT':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, variant: action.payload.variant }
                        : item
                ),
                error: null,
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                error: null,
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case 'TOGGLE_DRAWER':
            return {
                ...state,
                isOpen: !state.isOpen,
            };

        case 'SET_DRAWER':
            return {
                ...state,
                isOpen: action.payload,
            };

        case 'LOAD_CART':
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                error: null,
            };

        default:
            return state;
    }
}

// Context Type
interface CartContextType {
    // State
    items: CartItem[];
    isLoading: boolean;
    error: string | null;
    isOpen: boolean;

    // Computed Values
    totalItems: number;
    totalPrice: number;
    isEmpty: boolean;

    // Actions
    addItem: (product: Product, quantity?: number, variant?: string) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    updateVariant: (id: string, variant: string) => void;
    clearCart: () => void;
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;

    // Utilities
    getItemQuantity: (productId: string, variant?: string) => number;
    hasItem: (productId: string, variant?: string) => boolean;
}

// Create Context
const CartContext = createContext<CartContextType | null>(null);

// Provider Props
interface CartProviderProps {
    children: React.ReactNode;
}

// Cart Provider Component
export function CartProvider({ children }: CartProviderProps) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [isHydrated, setIsHydrated] = React.useState(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('cart-items');
            if (stored) {
                const items: CartItem[] = JSON.parse(stored);
                console.log('💾 Loading cart from localStorage:', items);
                dispatch({ type: 'LOAD_CART', payload: items });
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage whenever items change (after hydration)
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem('cart-items', JSON.stringify(state.items));
                console.log('💾 Saving cart to localStorage:', state.items);
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        }
    }, [state.items, isHydrated]);

    // Computed values with memoization
    const totalItems = useMemo(
        () => state.items.reduce((total, item) => total + item.quantity, 0),
        [state.items]
    );

    const totalPrice = useMemo(
        () => state.items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        ),
        [state.items]
    );

    const isEmpty = useMemo(() => state.items.length === 0, [state.items]);

    // Actions with useCallback for performance
    const addItem = useCallback((product: Product, quantity = 1, variant?: string) => {

        dispatch({
            type: 'ADD_ITEM',
            payload: { product, quantity, variant }
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }, []);

    const updateVariant = useCallback((id: string, variant: string) => {
        dispatch({ type: 'UPDATE_VARIANT', payload: { id, variant } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const toggleDrawer = useCallback(() => {
        dispatch({ type: 'TOGGLE_DRAWER' });
    }, []);

    const openDrawer = useCallback(() => {
        dispatch({ type: 'SET_DRAWER', payload: true });
    }, []);

    const closeDrawer = useCallback(() => {
        dispatch({ type: 'SET_DRAWER', payload: false });
    }, []);

    // Utility functions
    const getItemQuantity = useCallback((productId: string, variant?: string) => {
        const item = state.items.find(
            item => item.product.id === productId && item.variant === variant
        );
        return item?.quantity || 0;
    }, [state.items]);

    const hasItem = useCallback((productId: string, variant?: string) => {
        return state.items.some(
            item => item.product.id === productId && item.variant === variant
        );
    }, [state.items]);

    // Context value with memoization
    const value = useMemo(
        () => ({
            // State
            items: state.items,
            isLoading: state.isLoading,
            error: state.error,
            isOpen: state.isOpen,

            // Computed values
            totalItems,
            totalPrice,
            isEmpty,

            // Actions
            addItem,
            removeItem,
            updateQuantity,
            updateVariant,
            clearCart,
            toggleDrawer,
            openDrawer,
            closeDrawer,

            // Utilities
            getItemQuantity,
            hasItem,
        }),
        [
            state.items,
            state.isLoading,
            state.error,
            state.isOpen,
            totalItems,
            totalPrice,
            isEmpty,
            addItem,
            removeItem,
            updateQuantity,
            updateVariant,
            clearCart,
            toggleDrawer,
            openDrawer,
            closeDrawer,
            getItemQuantity,
            hasItem,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom Hook
export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
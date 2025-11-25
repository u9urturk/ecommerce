'use client';

import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

// Modal Types
export interface Modal {
  id: string;
  component: React.ComponentType<any>;
  props?: any;
  options?: {
    closable?: boolean;
    backdrop?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  };
}

// UI State Interface
interface UIState {
  theme: Theme;
  isLoading: boolean;
  loadingText?: string;
  notifications: Notification[];
  modals: Modal[];
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isMobile: boolean;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  scrollDirection: 'up' | 'down' | 'none';
  lastScrollY: number;
}

// UI Actions
type UIAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean; text?: string } }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'createdAt'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'OPEN_MODAL'; payload: Omit<Modal, 'id'> }
  | { type: 'CLOSE_MODAL'; payload: string }
  | { type: 'CLOSE_ALL_MODALS' }
  | { type: 'TOGGLE_MENU' }
  | { type: 'SET_MENU'; payload: boolean }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'SET_SEARCH'; payload: boolean }
  | { type: 'SET_MOBILE'; payload: boolean }
  | { type: 'SET_BREAKPOINT'; payload: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }
  | { type: 'SET_SCROLL'; payload: { direction: 'up' | 'down' | 'none'; y: number } };

// Initial State
const initialState: UIState = {
  theme: 'system',
  isLoading: false,
  notifications: [],
  modals: [],
  isMenuOpen: false,
  isSearchOpen: false,
  isMobile: false,
  breakpoint: 'lg',
  scrollDirection: 'none',
  lastScrollY: 0,
};

// UI Reducer
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loadingText: action.payload.text,
      };

    case 'ADD_NOTIFICATION': {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };

      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    }

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    case 'OPEN_MODAL': {
      const newModal: Modal = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      return {
        ...state,
        modals: [...state.modals, newModal],
      };
    }

    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: state.modals.filter(m => m.id !== action.payload),
      };

    case 'CLOSE_ALL_MODALS':
      return {
        ...state,
        modals: [],
      };

    case 'TOGGLE_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case 'SET_MENU':
      return {
        ...state,
        isMenuOpen: action.payload,
      };

    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearchOpen: !state.isSearchOpen,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        isSearchOpen: action.payload,
      };

    case 'SET_MOBILE':
      return {
        ...state,
        isMobile: action.payload,
      };

    case 'SET_BREAKPOINT':
      return {
        ...state,
        breakpoint: action.payload,
      };

    case 'SET_SCROLL':
      return {
        ...state,
        scrollDirection: action.payload.direction,
        lastScrollY: action.payload.y,
      };

    default:
      return state;
  }
}

// Context Type
interface UIContextType {
  // State
  theme: Theme;
  isLoading: boolean;
  loadingText?: string;
  notifications: Notification[];
  modals: Modal[];
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isMobile: boolean;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  scrollDirection: 'up' | 'down' | 'none';
  lastScrollY: number;

  // Theme Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Loading Actions
  setLoading: (isLoading: boolean, text?: string) => void;
  startLoading: (text?: string) => void;
  stopLoading: () => void;

  // Notification Actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  showSuccess: (title: string, message?: string) => string;
  showError: (title: string, message?: string) => string;
  showWarning: (title: string, message?: string) => string;
  showInfo: (title: string, message?: string) => string;

  // Modal Actions
  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  // Navigation Actions
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;

  // Responsive Actions
  setMobile: (isMobile: boolean) => void;
  setBreakpoint: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => void;
  setScroll: (direction: 'up' | 'down' | 'none', y: number) => void;
}

// Create Context
const UIContext = createContext<UIContextType | null>(null);

// Provider Props
interface UIProviderProps {
  children: React.ReactNode;
}

// UI Provider Component
export function UIProvider({ children }: UIProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Theme Actions
  const setTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    localStorage.setItem('theme', theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [state.theme, setTheme]);

  // Loading Actions
  const setLoading = useCallback((isLoading: boolean, text?: string) => {
    dispatch({ type: 'SET_LOADING', payload: { isLoading, text } });
  }, []);

  const startLoading = useCallback((text?: string) => {
    setLoading(true, text);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  // Notification Actions
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

    // Auto remove notification after duration
    if (notification.duration !== 0) {
      const duration = notification.duration || 5000;
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, []);

  // Convenience notification methods
  const showSuccess = useCallback((title: string, message?: string) => {
    return addNotification({ title, message, type: 'success' });
  }, [addNotification]);

  const showError = useCallback((title: string, message?: string) => {
    return addNotification({ title, message, type: 'error', duration: 0 });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message?: string) => {
    return addNotification({ title, message, type: 'warning' });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message?: string) => {
    return addNotification({ title, message, type: 'info' });
  }, [addNotification]);

  // Modal Actions
  const openModal = useCallback((modal: Omit<Modal, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    dispatch({ type: 'OPEN_MODAL', payload: modal });
    return id;
  }, []);

  const closeModal = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_MODAL', payload: id });
  }, []);

  const closeAllModals = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL_MODALS' });
  }, []);

  // Navigation Actions
  const toggleMenu = useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, []);

  const openMenu = useCallback(() => {
    dispatch({ type: 'SET_MENU', payload: true });
  }, []);

  const closeMenu = useCallback(() => {
    dispatch({ type: 'SET_MENU', payload: false });
  }, []);

  const toggleSearch = useCallback(() => {
    dispatch({ type: 'TOGGLE_SEARCH' });
  }, []);

  const openSearch = useCallback(() => {
    dispatch({ type: 'SET_SEARCH', payload: true });
  }, []);

  const closeSearch = useCallback(() => {
    dispatch({ type: 'SET_SEARCH', payload: false });
  }, []);

  // Responsive Actions
  const setMobile = useCallback((isMobile: boolean) => {
    dispatch({ type: 'SET_MOBILE', payload: isMobile });
  }, []);

  const setBreakpoint = useCallback((breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
    dispatch({ type: 'SET_BREAKPOINT', payload: breakpoint });
  }, []);

  const setScroll = useCallback((direction: 'up' | 'down' | 'none', y: number) => {
    dispatch({ type: 'SET_SCROLL', payload: { direction, y } });
  }, []);

  // Initialize theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, []);

  // Context value with memoization
  const value = useMemo(
    () => ({
      // State
      theme: state.theme,
      isLoading: state.isLoading,
      loadingText: state.loadingText,
      notifications: state.notifications,
      modals: state.modals,
      isMenuOpen: state.isMenuOpen,
      isSearchOpen: state.isSearchOpen,
      isMobile: state.isMobile,
      breakpoint: state.breakpoint,
      scrollDirection: state.scrollDirection,
      lastScrollY: state.lastScrollY,

      // Theme Actions
      setTheme,
      toggleTheme,

      // Loading Actions
      setLoading,
      startLoading,
      stopLoading,

      // Notification Actions
      addNotification,
      removeNotification,
      clearNotifications,
      showSuccess,
      showError,
      showWarning,
      showInfo,

      // Modal Actions
      openModal,
      closeModal,
      closeAllModals,

      // Navigation Actions
      toggleMenu,
      openMenu,
      closeMenu,
      toggleSearch,
      openSearch,
      closeSearch,

      // Responsive Actions
      setMobile,
      setBreakpoint,
      setScroll,
    }),
    [
      state.theme,
      state.isLoading,
      state.loadingText,
      state.notifications,
      state.modals,
      state.isMenuOpen,
      state.isSearchOpen,
      state.isMobile,
      state.breakpoint,
      state.scrollDirection,
      state.lastScrollY,
      setTheme,
      toggleTheme,
      setLoading,
      startLoading,
      stopLoading,
      addNotification,
      removeNotification,
      clearNotifications,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      openModal,
      closeModal,
      closeAllModals,
      toggleMenu,
      openMenu,
      closeMenu,
      toggleSearch,
      openSearch,
      closeSearch,
      setMobile,
      setBreakpoint,
      setScroll,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// Custom Hook
export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
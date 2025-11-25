'use client';

import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { User } from '@/types';

// Auth State Interface
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Auth Actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'INITIALIZE'; payload: { user: User | null } }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial State
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  isInitialized: false,
};

// Auth Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        isInitialized: true,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
        isInitialized: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      };

    case 'UPDATE_USER':
      if (!state.user) return state;
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null,
      };

    case 'INITIALIZE':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isInitialized: true,
        isLoading: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Login/Register Interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Context Type
interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;

  // Utilities
  hasPermission: (permission: string) => boolean;
  isEmailVerified: () => boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider Props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Mock API functions (replace with real API calls)
const mockAPI = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        id: '1',
        email: credentials.email,
        firstName: 'Test',
        lastName: 'User',
        addresses: [],
        preferences: {
          currency: 'USD',
          language: 'en',
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    throw new Error('Invalid credentials');
  },

  async register(data: RegisterData): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      addresses: [],
      preferences: {
        currency: 'USD',
        language: 'en',
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Clear session storage, etc.
  },

  async getCurrentUser(): Promise<User | null> {
    // Check if user is logged in (check token, etc.)
    return null;
  },
};

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state (check if user is already logged in)
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const user = await mockAPI.getCurrentUser();
        dispatch({ type: 'INITIALIZE', payload: { user } });
      } catch (error) {
        dispatch({ type: 'INITIALIZE', payload: { user: null } });
      }
    };

    initializeAuth();
  }, []);

  // Actions with useCallback for performance
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const user = await mockAPI.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      
      // Store token in localStorage or httpOnly cookie
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      const user = await mockAPI.register(data);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
      
      // Store token in localStorage or httpOnly cookie
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await mockAPI.logout();
      dispatch({ type: 'LOGOUT' });
      
      // Remove token from storage
      localStorage.removeItem('auth_token');
    } catch (error) {
      // Log error but still logout locally
      console.error('Logout error:', error);
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('auth_token');
    }
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: data });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Utility functions
  const hasPermission = useCallback((permission: string) => {
    // Add role-based permission logic here
    return state.isAuthenticated;
  }, [state.isAuthenticated]);

  const isEmailVerified = useCallback(() => {
    // Add email verification logic here
    return state.user?.email ? true : false;
  }, [state.user]);

  // Context value with memoization
  const value = useMemo(
    () => ({
      // State
      user: state.user,
      isLoading: state.isLoading,
      isAuthenticated: state.isAuthenticated,
      error: state.error,
      isInitialized: state.isInitialized,

      // Actions
      login,
      register,
      logout,
      updateUser,
      clearError,

      // Utilities
      hasPermission,
      isEmailVerified,
    }),
    [
      state.user,
      state.isLoading,
      state.isAuthenticated,
      state.error,
      state.isInitialized,
      login,
      register,
      logout,
      updateUser,
      clearError,
      hasPermission,
      isEmailVerified,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom Hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
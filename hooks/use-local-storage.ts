'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useSSRSafeLocalStorage<T>(key: string, initialValue: T) {
  const [hasMounted, setHasMounted] = useState(false);
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    setIsLoading(true);
    
    // Small delay to ensure localStorage is available
    const timeoutId = setTimeout(() => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsedItem = JSON.parse(item);
          setStoredValue(parsedItem);
          console.log(`Loaded from localStorage [${key}]:`, parsedItem);
        } else {
          console.log(`No data found in localStorage for key: ${key}`);
        }
      } catch (error) {
        console.log(`Error reading localStorage key "${key}":`, error);
      } finally {
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (hasMounted) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        console.log(`Saved to localStorage [${key}]:`, valueToStore);
      }
    } catch (error) {
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isLoading] as const;
}
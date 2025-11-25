'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export interface UseAutoHideOptions {
  autoHide?: boolean;
  hideDelay?: number;
  showOnTop?: boolean;
  scrollThreshold?: number;
  topThreshold?: number;
  animationDuration?: number;
  hideDirection?: 'up' | 'down' | 'left' | 'right';
  easing?: string;
}

export interface UseAutoHideReturn {
  isVisible: boolean;
  lastScrollY: number;
  isHovering: boolean;
  elementRef: React.RefObject<HTMLElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  forceShow: () => void;
  forceHide: () => void;
  setExpanded: (expanded: boolean) => void;
}

export const useAutoHide = ({
  autoHide = true,
  hideDelay = 2000,
  showOnTop = true,
  scrollThreshold = 200,
  topThreshold = 100,
  animationDuration = 300,
  hideDirection = 'up',
  easing = 'power2.out'
}: UseAutoHideOptions = {}): UseAutoHideReturn => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const elementRef = useRef<HTMLElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibilityTlRef = useRef<gsap.core.Timeline | null>(null);

  // Clear timeout helper
  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Get transform values based on hide direction
  const getHideTransform = useCallback(() => {
    switch (hideDirection) {
      case 'up': return { y: -100, x: 0 };
      case 'down': return { y: 100, x: 0 };
      case 'left': return { y: 0, x: -100 };
      case 'right': return { y: 0, x: 100 };
      default: return { y: -100, x: 0 };
    }
  }, [hideDirection]);

  // Scroll detection effect
  useEffect(() => {
    if (!autoHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show on scroll to top or when near top
      if (currentScrollY < topThreshold && showOnTop) {
        setIsVisible(true);
        clearHideTimeout();
        return;
      }

      // Show when scrolling up
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        clearHideTimeout();
        
        // Set timer to hide after delay when not hovering or expanded
        if (!isHovering && !isExpanded) {
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
          }, hideDelay);
        }
      } 
      // Hide when scrolling down and past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        if (!isHovering && !isExpanded) {
          setIsVisible(false);
          clearHideTimeout();
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearHideTimeout();
    };
  }, [
    autoHide, 
    lastScrollY, 
    isHovering, 
    isExpanded, 
    hideDelay, 
    showOnTop, 
    scrollThreshold, 
    topThreshold,
    clearHideTimeout
  ]);

  // Visibility animation effect
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Kill any existing visibility timeline
    if (visibilityTlRef.current) {
      visibilityTlRef.current.kill();
    }

    const transform = getHideTransform();
    const tl = gsap.timeline();
    
    if (isVisible) {
      tl.to(element, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: animationDuration / 1000,
        ease: easing
      });
    } else {
      tl.to(element, {
        x: transform.x,
        y: transform.y,
        opacity: 0,
        duration: animationDuration / 1000,
        ease: easing.replace('out', 'in')
      });
    }

    visibilityTlRef.current = tl;

    return () => {
      tl.kill();
      visibilityTlRef.current = null;
    };
  }, [isVisible, animationDuration, easing, getHideTransform]);

  // Mouse handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setIsVisible(true);
    clearHideTimeout();
  }, [clearHideTimeout]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    
    // Only set hide timeout if conditions are met
    if (autoHide && !isExpanded && window.scrollY > topThreshold) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    }
  }, [autoHide, isExpanded, topThreshold, hideDelay]);

  // Force show/hide functions
  const forceShow = useCallback(() => {
    setIsVisible(true);
    clearHideTimeout();
  }, [clearHideTimeout]);

  const forceHide = useCallback(() => {
    setIsVisible(false);
    clearHideTimeout();
  }, [clearHideTimeout]);

  // Set expanded state (prevents auto-hide when expanded)
  const setExpanded = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);
    if (expanded) {
      setIsVisible(true); // Force visibility when expanding
      clearHideTimeout();
    }
  }, [clearHideTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearHideTimeout();
      if (visibilityTlRef.current) {
        visibilityTlRef.current.kill();
      }
    };
  }, [clearHideTimeout]);

  return {
    isVisible,
    lastScrollY,
    isHovering,
    elementRef,
    handleMouseEnter,
    handleMouseLeave,
    forceShow,
    forceHide,
    setExpanded
  };
};
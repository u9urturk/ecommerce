'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { ShoppingCart } from 'lucide-react';
import { useAutoHide } from '@/hooks/useAutoHide';
import { useLoadingNavigation } from '@/contexts/loading-context';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  variant?: 'default' | 'brand' | 'minimal';
  cartItemsCount?: number;
  autoHide?: boolean;
  hideDelay?: number;
  showOnTop?: boolean;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  variant = 'brand',
  cartItemsCount = 0,
  autoHide = true,
  hideDelay = 3000,
  showOnTop = true
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  // Loading navigation
  const { navigateWithLoading } = useLoadingNavigation();

  // Use the auto-hide hook
  const {
    isVisible,
    elementRef,
    handleMouseEnter,
    handleMouseLeave,
    setExpanded: setAutoHideExpanded
  } = useAutoHide({
    autoHide,
    hideDelay,
    showOnTop,
    scrollThreshold: 200,
    topThreshold: 100,
    animationDuration: 400,
    hideDirection: 'up',
    easing: 'power2.out'
  });

  // Sync expanded state with auto-hide hook
  React.useEffect(() => {
    setAutoHideExpanded(isExpanded);
  }, [isExpanded, setAutoHideExpanded]);

  // Sync navRef with hook's elementRef
  React.useEffect(() => {
    if (navRef.current && elementRef.current !== navRef.current) {
      (elementRef as React.MutableRefObject<HTMLElement | null>).current = navRef.current;
    }
  }, [elementRef]);

  // Brand-aware theming system
  const getTheme = () => {
    switch (variant) {
      case 'brand':
        return {
          nav: 'bg-white/30 backdrop-blur-md border border-neutral-200/30',
          hamburger: 'text-brand hover:text-brand',
          button: 'bg-brand hover:bg-brand-dark text-white',
          badge: 'bg-accent text-white'
        };
      case 'minimal':
        return {
          nav: 'bg-neutral-50/60 backdrop-blur-md border border-neutral-300/20',
          hamburger: 'text-neutral-600 hover:text-neutral-900',
          button: 'bg-neutral-800 hover:bg-neutral-900 text-white',
          badge: 'bg-danger text-white'
        };
      default:
        return {
          nav: 'bg-white/75 backdrop-blur-md border border-neutral-200/25',
          hamburger: 'text-neutral-700 hover:text-brand',
          button: 'bg-primary hover:bg-primary/90 text-primary-foreground',
          badge: 'bg-accent text-white'
        };
    }
  };

  const theme = getTheme();

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      // Force visibility when menu opens handled by hook
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] transition-all duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl transition-all duration-300 relative overflow-hidden will-change-[height,transform] ${theme.nav}`}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none transition-colors duration-300 ${theme.hamburger}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <img src={logo} alt={logoAlt} className="logo h-[64px]" />
          </div>

          <button
            type="button"
            className={`card-nav-cta-button inline-flex sm:hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-3 md:px-4 items-center h-full font-medium cursor-pointer transition-all duration-300 gap-1 md:gap-2 relative text-sm md:text-base ${theme.button}`}
            onClick={() => navigateWithLoading('/cart', { message: 'Sepet yükleniyor...' })}
            aria-label="Sepete git"
          >
            <div className="relative">
              <ShoppingCart size={16} className="md:w-[18px] md:h-[18px]" />
              {cartItemsCount > 0 && (
                <div className={`absolute -top-2 -right-2 text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold text-[10px] md:text-xs ${theme.badge}`}>
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </div>
              )}
            </div>
            <span className="hidden sm:inline md:inline">Sepetim</span>
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithLoading(lnk.href, { message: `${lnk.label} yükleniyor...` });
                    }}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;

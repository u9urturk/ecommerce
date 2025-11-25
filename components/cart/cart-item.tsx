'use client';

import React from 'react';
import { Trash2, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/cart-context';

interface CartItemProps {
  item: CartItemType;
  showRemove?: boolean;
  showQuantityControls?: boolean;
  showWishlist?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'detailed';
  className?: string;
}

export function CartItem({ 
  item, 
  showRemove = true, 
  showQuantityControls = true,
  showWishlist = false,
  size = 'md',
  variant = 'default',
  className = '' 
}: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  // Enhanced size system with config values
  const sizeClasses = {
    sm: {
      container: 'p-3 gap-3',
      image: 'w-16 h-16',
      content: 'gap-2',
      title: 'text-sm font-medium',
      price: 'text-sm font-semibold',
      meta: 'text-xs',
      button: 'w-7 h-7 text-xs',
      quantity: 'min-w-[1.5rem] text-xs',
      icon: 14,
    },
    md: {
      container: 'p-4 gap-4',
      image: 'w-20 h-20',
      content: 'gap-3',
      title: 'text-base font-semibold',
      price: 'text-base font-bold',
      meta: 'text-sm',
      button: 'w-9 h-9 text-sm',
      quantity: 'min-w-[2rem] text-sm',
      icon: 16,
    },
    lg: {
      container: 'p-6 gap-6',
      image: 'w-24 h-24',
      content: 'gap-4',
      title: 'text-lg font-bold',
      price: 'text-lg font-bold',
      meta: 'text-base',
      button: 'w-10 h-10 text-base',
      quantity: 'min-w-[2.5rem] text-base',
      icon: 18,
    },
  };

  // Variant styles using config colors
  const variantClasses = {
    default: {
      container: 'bg-card border border-border hover:shadow-card transition-all duration-300',
      content: 'space-y-1',
      actions: 'bg-muted/30 rounded-md p-1',
    },
    minimal: {
      container: 'bg-background border-b border-border/50 hover:bg-muted/20 transition-colors',
      content: 'space-y-0.5',
      actions: 'bg-transparent',
    },
    detailed: {
      container: 'bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 rounded-lg',
      content: 'space-y-2',
      actions: 'bg-muted/40 rounded-lg p-1.5',
    },
  };

  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];
  
  // Türk vergi sistemi hesaplamaları
  const { quantity } = item;
  const basePrice = item.product.price;
  
  // Türkiye KDV oranları: %18 genel, %8 kitap/gıda
  const vatRate = item.product.category?.name === 'Kitap' || 
                  item.product.category?.name === 'Gıda' || 
                  item.product.tags?.includes('kitap') ||
                  item.product.tags?.includes('gıda') ? 0.08 : 0.18;
  
  // Türkiye'de fiyatlar genelde KDV dahil gösterilir
  const priceIncludingVat = basePrice; // KDV dahil fiyat
  const priceExcludingVat = basePrice / (1 + vatRate); // KDV hariç fiyat
  const vatAmountPerItem = priceIncludingVat - priceExcludingVat; // Birim başına KDV
  const totalVatAmount = vatAmountPerItem * quantity; // Toplam KDV
  const itemTotal = priceIncludingVat * quantity; // Toplam tutar
  
  // İndirim hesaplamaları
  const hasDiscount = item.product.originalPrice && item.product.originalPrice > item.product.price;
  const discountPercent = hasDiscount ? Math.round(((item.product.originalPrice! - item.product.price) / item.product.originalPrice!) * 100) : 0;

  return (
    <div className={`cart-item flex items-start ${sizes.container} ${variants.container} ${className}`}>
      {/* Product Image */}
      <div className={`product-image flex-shrink-0 ${sizes.image} overflow-hidden rounded-lg bg-neutral-100 group relative`}>
        {item.product.images && item.product.images.length > 0 ? (
          <img 
            src={item.product.images[0].url} 
            alt={item.product.images[0].alt || item.product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-6 h-6" />
          </div>
        )}
        
        {/* Stock indicator */}
        {!item.product.inStock && (
          <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center">
            <span className="text-destructive text-xs font-medium bg-background/90 px-2 py-1 rounded">
              Stokta Yok
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className={`product-details flex-1 min-w-0 ${variants.content}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`product-name text-foreground truncate ${sizes.title}`}>
              {item.product.name}
            </h3>
            
            {/* Product meta */}
            <div className={`flex items-center gap-2 mt-1 ${sizes.meta} text-muted-foreground`}>
              {item.variant && (
                <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">
                  {item.variant}
                </span>
              )}
              {item.product.brand && (
                <span>{item.product.brand}</span>
              )}
            </div>

            {/* Price section - KDV dahil/hariç gösterimi */}
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-foreground ${sizes.price}`}>
                ₺{priceIncludingVat.toFixed(2)}
              </span>
              
              {variant === 'detailed' && (
                <span className={`text-muted-foreground ${sizes.meta}`}>
                  (KDV Hariç: ₺{priceExcludingVat.toFixed(2)})
                </span>
              )}
              
              {hasDiscount && (
                <>
                  <span className={`text-muted-foreground line-through ${sizes.meta}`}>
                    ₺{item.product.originalPrice!.toFixed(2)}
                  </span>
                  <span className="bg-success text-white px-1.5 py-0.5 rounded text-xs font-medium">
                    %{discountPercent} indirim
                  </span>
                </>
              )}
            </div>

            {/* KDV bilgisi gösterimi */}
            <div className={`${sizes.meta} text-muted-foreground mt-1 flex items-center gap-2`}>
              <span className="inline-flex items-center gap-1">
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium">
                  KDV %{(vatRate * 100).toFixed(0)}
                </span>
                <span>₺{vatAmountPerItem.toFixed(2)}</span>
              </span>
              {quantity > 1 && (
                <span className="text-xs">
                  (Toplam KDV: ₺{totalVatAmount.toFixed(2)})
                </span>
              )}
            </div>

            {/* Total price for multiple items */}
            {item.quantity > 1 && (
              <div className={`${sizes.meta} text-muted-foreground mt-1`}>
                <div className="flex items-center gap-2">
                  <span>{item.quantity} × ₺{priceIncludingVat.toFixed(2)} = ₺{itemTotal.toFixed(2)}</span>
                </div>
                {variant === 'detailed' && (
                  <div className="text-xs mt-0.5">
                    KDV Hariç Toplam: ₺{(priceExcludingVat * quantity).toFixed(2)}
                  </div>
                )}
              </div>
            )}

            {/* Stock warning */}
            {item.product.inStock && item.product.stockQuantity <= 5 && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-warning text-xs">
                  Sadece {item.product.stockQuantity} adet kaldı
                </span>
              </div>
            )}
          </div>

          {/* Action buttons (top right) */}
          <div className="flex items-center gap-1">
            {showWishlist && (
              <button
                className={`flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors ${sizes.button}`}
                aria-label="Favorilere ekle"
              >
                <Heart size={sizes.icon} />
              </button>
            )}
            
            {showRemove && (
              <button
                onClick={handleRemove}
                className={`flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors ${sizes.button}`}
                aria-label="Ürünü kaldır"
              >
                <Trash2 size={sizes.icon} />
              </button>
            )}
          </div>
        </div>

        {/* Quantity Controls (bottom section) */}
        {showQuantityControls && (
          <div className="flex items-center justify-between mt-3">
            <div className={`quantity-controls inline-flex items-center ${variants.actions}`}>
              <button
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                className={`flex items-center justify-center bg-background hover:bg-muted border border-border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizes.button}`}
                aria-label="Miktarı azalt"
              >
                <Minus size={sizes.icon} />
              </button>
              
              <span className={`text-center font-medium text-foreground px-3 ${sizes.quantity}`}>
                {item.quantity}
              </span>
              
              <button
                onClick={handleIncrement}
                disabled={!item.product.inStock || (item.product.stockQuantity > 0 && item.quantity >= item.product.stockQuantity)}
                className={`flex items-center justify-center bg-background hover:bg-muted border border-border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizes.button}`}
                aria-label="Miktarı artır"
              >
                <Plus size={sizes.icon} />
              </button>
            </div>

            {/* Total price badge */}
            <div className="text-right">
              <div className={`font-bold text-foreground ${sizes.price}`}>
                ₺{itemTotal.toFixed(2)}
              </div>
              {variant === 'detailed' && (
                <div className={`${sizes.meta} text-muted-foreground space-y-0.5`}>
                  <div>Birim: ₺{priceIncludingVat.toFixed(2)} (KDV dahil)</div>
                  {quantity > 1 && (
                    <div className="text-xs">
                      <div>Ara Toplam: ₺{(priceExcludingVat * quantity).toFixed(2)}</div>
                      <div>KDV (%{(vatRate * 100).toFixed(0)}): ₺{totalVatAmount.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
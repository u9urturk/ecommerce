'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard, Calculator, Receipt } from "lucide-react";

// Inline Badge component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
}

const Badge = ({ className = "", variant = "default", children, ...props }: BadgeProps) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive: "border-transparent bg-destructive text-destructive-foreground",
    outline: "text-foreground border-border hover:bg-muted",
    success: "border-transparent bg-success text-white",
    warning: "border-transparent bg-warning text-white",
  };

  return (
    <div 
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Inline Separator component  
const Separator = ({ className = "" }) => {
  return <div className={`h-[1px] w-full bg-border ${className}`} />;
};

export function CartSummary() {
  const { items, totalItems, totalPrice } = useCart();
  const router = useRouter();

  // Türk vergi sistemi hesaplamaları
  const calculateTotals = () => {
    let subtotalExcludingVat = 0;
    let totalVatAmount = 0;
    let totalWithVat = 0;

    items.forEach(item => {
      const quantity = item.quantity;
      const priceIncludingVat = item.product.price;
      
      // KDV oranı belirleme: %18 genel, %8 kitap/gıda
      const vatRate = item.product.category?.name === 'Kitap' || 
                      item.product.category?.name === 'Gıda' || 
                      item.product.tags?.includes('kitap') ||
                      item.product.tags?.includes('gıda') ? 0.08 : 0.18;
      
      // Fiyat hesaplamaları (Türkiye'de fiyatlar KDV dahil)
      const priceExcludingVat = priceIncludingVat / (1 + vatRate);
      const vatAmount = priceIncludingVat - priceExcludingVat;
      
      subtotalExcludingVat += priceExcludingVat * quantity;
      totalVatAmount += vatAmount * quantity;
      totalWithVat += priceIncludingVat * quantity;
    });

    return {
      subtotalExcludingVat,
      totalVatAmount,
      totalWithVat,
      vatRate18Items: items.filter(item => !(
        item.product.category?.name === 'Kitap' || 
        item.product.category?.name === 'Gıda' || 
        item.product.tags?.includes('kitap') ||
        item.product.tags?.includes('gıda')
      )).reduce((sum, item) => sum + item.quantity, 0),
      vatRate8Items: items.filter(item => (
        item.product.category?.name === 'Kitap' || 
        item.product.category?.name === 'Gıda' || 
        item.product.tags?.includes('kitap') ||
        item.product.tags?.includes('gıda')
      )).reduce((sum, item) => sum + item.quantity, 0)
    };
  };

  const totals = calculateTotals();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="space-y-6 sticky top-6">
      {/* Sipariş Özeti */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Sipariş Özeti
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ürün Sayısı */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Toplam Ürün</span>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {totalItems} adet
            </Badge>
          </div>

          <Separator className="bg-border" />

          {/* Fiyat Detayları */}
          <div className="space-y-3">
            {/* Ara Toplam (KDV Hariç) */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Ara Toplam (KDV Hariç)</span>
              <span className="font-medium text-foreground">
                ₺{totals.subtotalExcludingVat.toFixed(2)}
              </span>
            </div>

            {/* KDV Detayları */}
            <div className="space-y-2 pl-4 border-l-2 border-primary/20">
              {totals.vatRate18Items > 0 && (
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      KDV %18
                    </Badge>
                    <span className="text-muted-foreground">
                      ({totals.vatRate18Items} ürün)
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    ₺{(items.filter(item => !(
                      item.product.category?.name === 'Kitap' || 
                      item.product.category?.name === 'Gıda' || 
                      item.product.tags?.includes('kitap') ||
                      item.product.tags?.includes('gıda')
                    )).reduce((sum, item) => {
                      const priceIncludingVat = item.product.price;
                      const vatAmount = priceIncludingVat - (priceIncludingVat / 1.18);
                      return sum + (vatAmount * item.quantity);
                    }, 0)).toFixed(2)}
                  </span>
                </div>
              )}

              {totals.vatRate8Items > 0 && (
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-success text-success">
                      KDV %8
                    </Badge>
                    <span className="text-muted-foreground">
                      ({totals.vatRate8Items} ürün)
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    ₺{(items.filter(item => (
                      item.product.category?.name === 'Kitap' || 
                      item.product.category?.name === 'Gıda' || 
                      item.product.tags?.includes('kitap') ||
                      item.product.tags?.includes('gıda')
                    )).reduce((sum, item) => {
                      const priceIncludingVat = item.product.price;
                      const vatAmount = priceIncludingVat - (priceIncludingVat / 1.08);
                      return sum + (vatAmount * item.quantity);
                    }, 0)).toFixed(2)}
                  </span>
                </div>
              )}

              {/* Toplam KDV */}
              <Separator className="bg-border/50" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Toplam KDV</span>
                <span className="font-semibold text-foreground">
                  ₺{totals.totalVatAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Genel Toplam */}
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">Toplam Tutar</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    ₺{totals.totalWithVat.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    KDV dahil
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ödeme Butonu */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4">
          <Button 
            onClick={handleCheckout}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Ödemeye Geç
            <span className="ml-auto text-sm opacity-90">
              ₺{totals.totalWithVat.toFixed(2)}
            </span>
          </Button>
          
          <div className="mt-3 text-center">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Receipt className="w-3 h-3" />
              Güvenli ödeme • 256-bit SSL şifrelemeli
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kargo Bilgisi */}
      <Card className="bg-success/5 border-success/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
            <div>
              <h4 className="font-medium text-success text-sm mb-1">
                Ücretsiz Kargo
              </h4>
              <p className="text-xs text-muted-foreground">
                150₺ ve üzeri alışverişlerde kargo ücretsiz. 
                Siparişiniz 1-2 iş günü içinde kargoda.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
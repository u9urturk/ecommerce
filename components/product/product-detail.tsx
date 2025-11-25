'use client';

import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { CartItem, Product } from '@/types';

export interface ProductDetailProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'minimal' | 'premium';
  onAddToCart?: (product:Product, quantity: number) => void;
  onAddToWishlist?: (productId: string) => void;
  onShare?: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  className = '',
  variant = 'default',
  onAddToCart,
  onAddToWishlist,
  onShare
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'shipping'>('description');

  // Mock additional product data - in real app this would come from props
  const productSpecs = {
    'Brand': product.brand,
    'Model': product.name,
    'Category': product.category.name,
    'Weight': '1.2 kg',
    'Dimensions': '25 x 15 x 10 cm',
    'Warranty': '2 Years',
    'Country of Origin': 'Germany',
    'Material': 'Premium Aluminum',
    'Color Options': ['Black', 'Silver', 'Space Gray'],
    'Connectivity': 'Bluetooth 5.0, WiFi 6'
  };

  const features = [
    '✓ Premium build quality',
    '✓ 2-year international warranty',
    '✓ Free shipping worldwide',
    '✓ 30-day money-back guarantee',
    '✓ Expert customer support',
    '✓ Eco-friendly packaging'
  ];

  const shippingInfo = {
    'Standard Delivery': '3-5 business days - Free',
    'Express Delivery': '1-2 business days - $9.99',
    'Same Day Delivery': 'Available in select cities - $19.99',
    'International Shipping': '7-14 business days - Calculated at checkout'
  };

  // Handle quantity changes
  const updateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product.id);
  };

  // Handle share
  const handleShare = () => {
    onShare?.(product);
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Stock status
  const getStockStatus = () => {
    if (product.stockQuantity === 0) return { text: 'Out of Stock', color: 'text-red-500' };
    if (product.stockQuantity <= 5) return { text: `Only ${product.stockQuantity} left!`, color: 'text-orange-500' };
    return { text: 'In Stock', color: 'text-green-500' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className={`product-detail ${className}`}>
      {/* Product Header */}
      <div className="product-header mb-6">
        {/* Brand & Category */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="font-medium text-brand">{product.brand}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600">{product.category.name}</span>
        </div>

        {/* Product Name */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
          {product.name}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-neutral-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Stock Status */}
          <div className={`font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </div>
        </div>

        {/* Pricing */}
        <div className="pricing mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-brand">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-sm font-bold">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Price includes all taxes. Free shipping on orders over $50.
          </p>
        </div>
      </div>

      {/* Product Actions */}
      <Card className="mb-6 shadow-card border-border">
        <CardContent className="p-6">
          {/* Quantity Selector */}
          <div className="quantity-selector mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(-1)}
                disabled={quantity <= 1}
                className="w-8 h-8 p-0 border-border hover:border-brand hover:text-brand transition-colors"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="bg-muted border border-border rounded px-4 py-2 min-w-[60px] text-center font-medium text-foreground">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(1)}
                disabled={quantity >= product.stockQuantity}
                className="w-8 h-8 p-0 border-border hover:border-brand hover:text-brand transition-colors"
              >
                <Plus className="w-3 h-3" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                {product.stockQuantity} available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className="flex-1 bg-brand hover:bg-brand-dark text-white font-bold py-3 transition-all duration-300 ease-brand-ease"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className={`p-3 border-border transition-colors ${isWishlisted ? 'text-destructive border-destructive/30 hover:bg-destructive/10' : 'hover:border-brand hover:text-brand'}`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="p-3 border-border hover:border-brand hover:text-brand transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="mb-6 shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Award className="w-5 h-5 text-brand" />
            Why Choose This Product?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-success font-bold">{feature.split(' ')[0]}</span>
                <span className="text-muted-foreground">{feature.substring(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Information Tabs */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <div className="flex flex-wrap gap-4">
            {['description', 'specifications', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`pb-2 border-b-2 transition-all duration-300 ease-brand-ease capitalize font-medium ${
                  activeTab === tab 
                    ? 'border-brand text-brand' 
                    : 'border-transparent text-muted-foreground hover:text-brand hover:border-brand/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Product Description</h3>
                <p className="text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-neutral-700">{feature.substring(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(productSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-neutral-100 pb-2">
                    <span className="font-medium text-neutral-700">{key}</span>
                    <span className="text-neutral-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Delivery Options
                </h3>
                <div className="space-y-3">
                  {Object.entries(shippingInfo).map(([method, details]) => (
                    <div key={method} className="flex justify-between items-center border border-neutral-200 rounded-lg p-3">
                      <span className="font-medium">{method}</span>
                      <span className="text-neutral-600">{details}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Secure Payment</div>
                    <div className="text-sm text-green-600">256-bit SSL encryption</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <RotateCcw className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Easy Returns</div>
                    <div className="text-sm text-blue-600">30-day return policy</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-800">Warranty</div>
                    <div className="text-sm text-purple-600">2 years international</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
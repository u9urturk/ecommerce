'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import CategoryNav from "@/components/product/category-nav";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/types";

// Mock data for demonstration with Lorem Picsum images
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      { id: "1", url: "https://picsum.photos/400/400?random=1", alt: "Premium Headphones", isPrimary: true }
    ],
    category: { id: "1", name: "Electronics", slug: "electronics" },
    brand: "AudioTech",
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 128,
    tags: ["wireless", "noise-cancelling", "premium"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring",
    price: 199.99,
    images: [
      { id: "2", url: "https://picsum.photos/400/400?random=2", alt: "Smart Watch", isPrimary: true }
    ],
    category: { id: "1", name: "Electronics", slug: "electronics" },
    brand: "TechWear",
    inStock: true,
    stockQuantity: 15,
    rating: 4.2,
    reviewCount: 89,
    tags: ["smartwatch", "health", "fitness"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX graphics",
    price: 1299.99,
    originalPrice: 1499.99,
    images: [
      { id: "3", url: "https://picsum.photos/400/400?random=3", alt: "Gaming Laptop", isPrimary: true }
    ],
    category: { id: "1", name: "Electronics", slug: "electronics" },
    brand: "GamerTech",
    inStock: true,
    stockQuantity: 8,
    rating: 4.7,
    reviewCount: 156,
    tags: ["gaming", "laptop", "high-performance"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation",
    price: 149.99,
    images: [
      { id: "4", url: "https://picsum.photos/400/400?random=4", alt: "Wireless Earbuds", isPrimary: true }
    ],
    category: { id: "1", name: "Electronics", slug: "electronics" },
    brand: "AudioTech",
    inStock: true,
    stockQuantity: 42,
    rating: 4.3,
    reviewCount: 234,
    tags: ["wireless", "earbuds", "noise-cancelling"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor with HDR support",
    price: 399.99,
    originalPrice: 499.99,
    images: [
      { id: "5", url: "https://picsum.photos/400/400?random=5", alt: "4K Monitor", isPrimary: true }
    ],
    category: { id: "1", name: "Electronics", slug: "electronics" },
    brand: "DisplayTech",
    inStock: false,
    stockQuantity: 0,
    rating: 4.6,
    reviewCount: 98,
    tags: ["monitor", "4k", "hdr"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical gaming keyboard",
    price: 129.99,
    images: [
      { id: "6", url: "https://picsum.photos/400/400?random=6", alt: "Mechanical Keyboard", isPrimary: true }
    ],
    category: { id: "1", name: "Electronics", slug: "electronics" },
    brand: "KeyTech",
    inStock: true,
    stockQuantity: 18,
    rating: 4.4,
    reviewCount: 167,
    tags: ["keyboard", "mechanical", "gaming", "rgb"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Here you would typically filter products based on category
    console.log('Category changed to:', categoryId);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={handleBackClick}
            variant="outline"
            className="border-border hover:border-brand hover:text-brand transition-all duration-300 ease-brand-ease group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Products</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our amazing collection of products carefully curated just for you
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12 sticky top-3 z-20">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            variant="featured"
            className="mb-6"
          />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="bg-neutral-800 border-neutral-700 overflow-hidden hover:shadow-lg hover:shadow-brand/20 hover:border-brand/30 transition-all duration-300 cursor-pointer group">
              <div className="aspect-square bg-neutral-700 relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.images[0]?.url} 
                  alt={product.images[0]?.alt || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                
                {/* Stock Badge */}
                {product.stockQuantity <= 10 && product.inStock && (
                  <div className="absolute top-2 right-2 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
                    Only {product.stockQuantity} left!
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* View Details Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm"
                    className="bg-brand hover:bg-brand-dark text-white font-medium shadow-lg"
                    onClick={(e) => e.preventDefault()} // Prevent double navigation
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white line-clamp-2 group-hover:text-brand-light transition-colors duration-300">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-neutral-400 line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-brand">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-neutral-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-warning">★</span>
                    <span className="text-sm text-neutral-300">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    product.inStock 
                      ? 'bg-success/20 text-success border border-success/30' 
                      : 'bg-destructive/20 text-destructive border border-destructive/30'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-brand hover:bg-brand-dark text-white transition-all duration-300"
                    disabled={!product.inStock}
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Quick add to cart functionality
                      console.log(`Quick add to cart: ${product.name}`);
                    }}
                  >
                    {product.inStock ? 'Quick Add' : 'Out of Stock'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 border-border hover:border-brand hover:text-brand transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add to wishlist functionality
                      console.log(`Add to wishlist: ${product.name}`);
                    }}
                  >
                    ♡
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

        {mockProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-400 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
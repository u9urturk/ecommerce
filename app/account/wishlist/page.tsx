'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Heart,
  ShoppingCart,
  Search,
  Filter,
  Grid3X3,
  List,
  X,
  Star,
  Eye,
  Share2,
  Package,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  addedDate: string;
  brand: string;
}

// Mock data
const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 52999.99,
    originalPrice: 54999.99,
    image: '/api/placeholder/300/300',
    category: 'Telefon',
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    addedDate: '2024-11-15T10:30:00Z',
    brand: 'Apple'
  },
  {
    id: '2',
    name: 'AirPods Pro 2. Nesil',
    price: 7999.99,
    image: '/api/placeholder/300/300',
    category: 'Kulaklık',
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    addedDate: '2024-11-10T15:20:00Z',
    brand: 'Apple'
  },
  {
    id: '3',
    name: 'Samsung Galaxy Watch 6',
    price: 4299.99,
    originalPrice: 4999.99,
    image: '/api/placeholder/300/300',
    category: 'Akıllı Saat',
    rating: 4.4,
    reviewCount: 156,
    inStock: false,
    addedDate: '2024-11-08T09:45:00Z',
    brand: 'Samsung'
  },
  {
    id: '4',
    name: 'MacBook Air M2 13"',
    price: 34999.99,
    image: '/api/placeholder/300/300',
    category: 'Laptop',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    addedDate: '2024-11-05T14:10:00Z',
    brand: 'Apple'
  },
  {
    id: '5',
    name: 'Sony WH-1000XM5',
    price: 8999.99,
    image: '/api/placeholder/300/300',
    category: 'Kulaklık',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    addedDate: '2024-11-02T11:25:00Z',
    brand: 'Sony'
  },
  {
    id: '6',
    name: 'iPad Air 11" M2',
    price: 21999.99,
    originalPrice: 23999.99,
    image: '/api/placeholder/300/300',
    category: 'Tablet',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    addedDate: '2024-10-28T16:40:00Z',
    brand: 'Apple'
  }
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const categories = Array.from(new Set(wishlistItems.map(item => item.category)));

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const removeSelectedItems = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const addToCart = (itemId: string) => {
    // Add to cart logic
    console.log('Adding to cart:', itemId);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < Math.floor(rating) 
                ? 'text-warning fill-current' 
                : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          {rating} ({wishlistItems.find(item => item.rating === rating)?.reviewCount})
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Hesabım
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Heart className="w-8 h-8 text-danger" />
              Favorilerim
            </h1>
            <p className="text-muted-foreground">
              Beğendiğiniz {wishlistItems.length} ürün listelenmiştir
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Ürün adı veya marka ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={categoryFilter === 'all' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter('all')}
                  >
                    Tümü
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                    <span className="text-sm text-primary font-medium">
                      {selectedItems.length} seçili
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeSelectedItems}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllItems}
                >
                  {selectedItems.length === filteredItems.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                </Button>

                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Content */}
        {filteredItems.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm || categoryFilter !== 'all' ? 'Arama kriterlerinize uygun ürün bulunamadı' : 'Henüz favoriniz yok'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Farklı arama terimleri veya filtreler deneyebilirsiniz'
                  : 'Beğendiğiniz ürünleri favorilerinize ekleyin'
                }
              </p>
              {!searchTerm && categoryFilter === 'all' && (
                <Link href="/products">
                  <Button className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Ürünleri Keşfet
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className={`shadow-card hover:shadow-lg transition-all duration-200 ${
                  selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
                } ${
                  viewMode === 'list' ? 'flex-row' : ''
                }`}
              >
                <div className={`${viewMode === 'list' ? 'flex' : 'block'}`}>
                  {/* Image */}
                  <div className={`relative ${
                    viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                  } overflow-hidden ${viewMode === 'grid' ? 'rounded-t-lg' : 'rounded-l-lg'}`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleItemSelection(item.id)}
                      className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedItems.includes(item.id)
                          ? 'bg-primary border-primary'
                          : 'bg-background/80 border-border hover:border-primary'
                      }`}
                    >
                      {selectedItems.includes(item.id) && (
                        <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                      )}
                    </button>

                    {/* Remove from Wishlist */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center transition-all hover:border-destructive group"
                    >
                      <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                    </button>

                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-destructive/90 text-destructive-foreground text-xs font-medium rounded">
                        Stokta Yok
                      </div>
                    )}

                    {/* Discount Badge */}
                    {item.originalPrice && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-success/90 text-success-foreground text-xs font-medium rounded">
                        %{Math.round((1 - item.price / item.originalPrice) * 100)} İndirim
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'flex justify-between h-full' : 'space-y-3'}`}>
                      <div className={`${viewMode === 'list' ? 'flex-1 pr-4' : ''}`}>
                        {/* Category & Brand */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.brand}
                          </span>
                        </div>

                        {/* Product Name */}
                        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                          {item.name}
                        </h3>

                        {/* Rating */}
                        <div className="mb-3">
                          {renderStars(item.rating)}
                        </div>

                        {/* Added Date */}
                        <p className="text-xs text-muted-foreground mb-3">
                          Eklenme: {formatDate(item.addedDate)}
                        </p>

                        {/* Price */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">
                              {formatCurrency(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatCurrency(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={`${
                        viewMode === 'list' 
                          ? 'flex flex-col justify-between w-32' 
                          : 'space-y-2'
                      }`}>
                        <Button
                          onClick={() => addToCart(item.id)}
                          disabled={!item.inStock}
                          className="w-full flex items-center gap-2"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {item.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                        </Button>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="flex items-center gap-2">
              Daha Fazla Ürün Yükle
              <Package className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

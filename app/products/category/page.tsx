'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Kategoriler
const categories = [
  { 
    id: 'electronics', 
    name: 'Elektronik', 
    description: 'Bilgisayar, telefon ve teknoloji ürünleri',
    productCount: 1240,
    image: 'https://picsum.photos/400/200?random=electronics'
  },
  { 
    id: 'phones', 
    name: 'Telefonlar', 
    description: 'Akıllı telefon ve aksesuar çeşitleri',
    productCount: 350,
    image: 'https://picsum.photos/400/200?random=phones'
  },
  { 
    id: 'audio', 
    name: 'Ses & Müzik', 
    description: 'Kulaklık, hoparlör ve ses sistemleri',
    productCount: 180,
    image: 'https://picsum.photos/400/200?random=audio'
  },
  { 
    id: 'gaming', 
    name: 'Oyun', 
    description: 'Gaming ekipmanları ve oyun konsolu',
    productCount: 420,
    image: 'https://picsum.photos/400/200?random=gaming'
  },
  { 
    id: 'wearables', 
    name: 'Giyilebilir Teknoloji', 
    description: 'Akıllı saat, fitness takipçisi',
    productCount: 95,
    image: 'https://picsum.photos/400/200?random=wearables'
  },
  { 
    id: 'cameras', 
    name: 'Fotoğrafçılık', 
    description: 'Kamera, lens ve fotoğraf ekipmanları',
    productCount: 160,
    image: 'https://picsum.photos/400/200?random=cameras'
  },
  { 
    id: 'home', 
    name: 'Ev & Yaşam', 
    description: 'Ev dekorasyonu ve yaşam ürünleri',
    productCount: 890,
    image: 'https://picsum.photos/400/200?random=home'
  },
  { 
    id: 'fashion', 
    name: 'Moda', 
    description: 'Giyim, ayakkabı ve moda aksesuarları',
    productCount: 1560,
    image: 'https://picsum.photos/400/200?random=fashion'
  },
  { 
    id: 'books', 
    name: 'Kitap & Dergi', 
    description: 'Kitap, dergi ve eğitim materyalleri',
    productCount: 780,
    image: 'https://picsum.photos/400/200?random=books'
  },
  { 
    id: 'sports', 
    name: 'Spor & Outdoor', 
    description: 'Spor malzemeleri ve açık hava ürünleri',
    productCount: 620,
    image: 'https://picsum.photos/400/200?random=sports'
  },
  { 
    id: 'beauty', 
    name: 'Kozmetik & Bakım', 
    description: 'Kozmetik, kişisel bakım ve sağlık ürünleri',
    productCount: 940,
    image: 'https://picsum.photos/400/200?random=beauty'
  },
  { 
    id: 'automotive', 
    name: 'Otomotiv', 
    description: 'Araç aksesuarları ve otomotiv ürünleri',
    productCount: 320,
    image: 'https://picsum.photos/400/200?random=automotive'
  }
];

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Ürünler
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              Kategoriler
            </h1>
            <p className="text-muted-foreground">
              {categories.length} kategori mevcut
            </p>
          </div>
        </div>

        {/* Categories Introduction */}
        <div className="text-center mb-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Kategorileri Keşfet
            </h2>
            <p className="text-muted-foreground">
              İhtiyacınız olan ürünleri daha kolay bulmak için kategorilerimize göz atın. 
              Her kategoride binlerce ürün seçeneği sizleri bekliyor.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
            >
              <Link href={`/products?category=${category.id}`} className="block">
                {/* Image */}
                <div className="aspect-[2/1] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {category.productCount.toLocaleString()} ürün
                        </span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-primary hover:text-primary group-hover:translate-x-1 transition-transform"
                      >
                        Keşfet →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Aradığınızı Bulamadınız mı?
            </h3>
            <p className="text-muted-foreground mb-6">
              Binlerce ürün arasından aradığınızı bulmak için arama özelliğini kullanın 
              veya tüm ürünlere göz atın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto">
                  Ürün Ara
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Tüm Ürünler
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

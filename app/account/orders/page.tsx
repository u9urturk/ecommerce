'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Package,
  Search,
  Filter,
  Calendar,
  MapPin,
  CreditCard,
  Download,
  RefreshCw,
  Eye,
  Star,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned';
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-11-20T10:30:00Z',
    status: 'delivered',
    total: 299.99,
    shippingAddress: {
      name: 'Mehmet Yılmaz',
      address: 'Kadıköy Mah. Moda Cad. No: 123/5',
      city: 'İstanbul / Kadıköy'
    },
    paymentMethod: '**** 1234',
    trackingNumber: 'TK123456789',
    items: [
      {
        id: '1',
        name: 'iPhone 15 Pro Max Kılıfı',
        image: '/api/placeholder/80/80',
        price: 149.99,
        quantity: 1,
        variant: 'Mavi'
      },
      {
        id: '2',
        name: 'AirPods Pro 2. Nesil',
        image: '/api/placeholder/80/80',
        price: 150.00,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-11-18T15:45:00Z',
    status: 'shipping',
    total: 149.50,
    shippingAddress: {
      name: 'Mehmet Yılmaz',
      address: 'Kadıköy Mah. Moda Cad. No: 123/5',
      city: 'İstanbul / Kadıköy'
    },
    paymentMethod: '**** 5678',
    trackingNumber: 'TK987654321',
    estimatedDelivery: '2024-11-26',
    items: [
      {
        id: '3',
        name: 'Samsung Galaxy Watch',
        image: '/api/placeholder/80/80',
        price: 149.50,
        quantity: 1,
        variant: 'Siyah'
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-11-15T09:20:00Z',
    status: 'processing',
    total: 89.99,
    shippingAddress: {
      name: 'Mehmet Yılmaz',
      address: 'İş Adresi - Levent Plaza Kat: 12',
      city: 'İstanbul / Şişli'
    },
    paymentMethod: '**** 9012',
    items: [
      {
        id: '4',
        name: 'Bluetooth Kulaklık',
        image: '/api/placeholder/80/80',
        price: 89.99,
        quantity: 1,
        variant: 'Beyaz'
      }
    ]
  }
];

const statusConfig = {
  pending: { 
    label: 'Onay Bekliyor', 
    color: 'text-warning bg-warning/10',
    icon: Clock
  },
  confirmed: { 
    label: 'Onaylandı', 
    color: 'text-primary bg-primary/10',
    icon: CheckCircle
  },
  processing: { 
    label: 'Hazırlanıyor', 
    color: 'text-primary bg-primary/10',
    icon: Package
  },
  shipping: { 
    label: 'Kargoda', 
    color: 'text-warning bg-warning/10',
    icon: Truck
  },
  delivered: { 
    label: 'Teslim Edildi', 
    color: 'text-success bg-success/10',
    icon: CheckCircle
  },
  cancelled: { 
    label: 'İptal Edildi', 
    color: 'text-destructive bg-destructive/10',
    icon: X
  },
  returned: { 
    label: 'İade Edildi', 
    color: 'text-muted-foreground bg-muted',
    icon: RefreshCw
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: keyof typeof statusConfig) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <IconComponent className="w-4 h-4" />
        {config.label}
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Siparişlerim</h1>
            <p className="text-muted-foreground">
              Geçmiş ve mevcut siparişlerinizi takip edin
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Sipariş numarası veya ürün adı ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'all', label: 'Tümü' },
                  { key: 'pending', label: 'Onay Bekliyor' },
                  { key: 'processing', label: 'Hazırlanıyor' },
                  { key: 'shipping', label: 'Kargoda' },
                  { key: 'delivered', label: 'Teslim Edildi' }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={statusFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(filter.key)}
                    className="whitespace-nowrap"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="text-center py-16">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'Arama kriterlerinize uygun sipariş bulunamadı' : 'Henüz siparişiniz yok'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Farklı arama terimleri veya filtreler deneyebilirsiniz'
                    : 'Alışverişe başlayın ve ilk siparişinizi verin'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Link href="/products">
                    <Button className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Alışverişe Başla
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="shadow-card hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Sipariş Tarihi: {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      {order.trackingNumber && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Takip No: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          {item.variant && (
                            <p className="text-sm text-muted-foreground">Varyant: {item.variant}</p>
                          )}
                          <p className="text-sm text-muted-foreground">Adet: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Teslimat Adresi</p>
                          <p className="text-sm text-muted-foreground">{order.shippingAddress.name}</p>
                          <p className="text-sm text-muted-foreground">{order.shippingAddress.address}</p>
                          <p className="text-sm text-muted-foreground">{order.shippingAddress.city}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Ödeme Yöntemi</p>
                          <p className="text-sm text-muted-foreground">Kart: {order.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.estimatedDelivery && (
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Tahmini Teslimat</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.estimatedDelivery).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="text-right md:text-left">
                        <p className="text-sm text-muted-foreground">Toplam Tutar</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(order.total)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Detayları Gör
                    </Button>

                    {order.status === 'shipping' && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Kargo Takip
                      </Button>
                    )}

                    {order.status === 'delivered' && (
                      <>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Değerlendir
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4" />
                          İade Et
                        </Button>
                      </>
                    )}

                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Fatura İndir
                    </Button>

                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Destek
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredOrders.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="flex items-center gap-2">
              Daha Fazla Sipariş Yükle
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

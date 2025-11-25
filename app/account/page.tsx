'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Bell, 
  Shield, 
  CreditCard,
  Settings,
  Camera,
  Edit3,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  Phone,
  Mail,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  defaultAddress: {
    title: string;
    address: string;
    city: string;
  };
}

// Mock data - gerçek uygulamada API'den gelecek
const mockUser: UserProfile = {
  id: '1',
  name: 'Mehmet Yılmaz',
  email: 'mehmet@example.com',
  phone: '+90 532 123 45 67',
  avatar: '/api/placeholder/150/150',
  memberSince: '2023-06-15',
  totalOrders: 24,
  totalSpent: 15680,
  loyaltyPoints: 1250,
  defaultAddress: {
    title: 'Ev Adresi',
    address: 'Kadıköy Mah. Moda Cad. No: 123/5',
    city: 'İstanbul / Kadıköy'
  }
};

const recentOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-11-20',
    total: 299.99,
    status: 'delivered',
    items: 3
  },
  {
    id: 'ORD-2024-002',
    date: '2024-11-18',
    total: 149.50,
    status: 'shipping',
    items: 2
  },
  {
    id: 'ORD-2024-003',
    date: '2024-11-15',
    total: 89.99,
    status: 'processing',
    items: 1
  }
];

const quickActions = [
  {
    icon: Package,
    title: 'Siparişlerim',
    description: `${mockUser.totalOrders} sipariş`,
    href: '/account/orders',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: Heart,
    title: 'Favorilerim',
    description: '12 ürün',
    href: '/account/wishlist',
    color: 'text-danger',
    bgColor: 'bg-danger/10'
  },
  {
    icon: MapPin,
    title: 'Adreslerim',
    description: '3 adres',
    href: '/account/addresses',
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    icon: CreditCard,
    title: 'Ödeme Yöntemleri',
    description: '2 kart',
    href: '/account/payment-methods',
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  }
];

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile>(mockUser);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { label: 'Teslim Edildi', class: 'badge-success' },
      shipping: { label: 'Kargoda', class: 'badge-warning' },
      processing: { label: 'Hazırlanıyor', class: 'badge-primary' },
      cancelled: { label: 'İptal Edildi', class: 'badge-danger' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing;
    
    return (
      <span className={`badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4" />
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hesabım</h1>
            <p className="text-muted-foreground">
              Profil bilgilerinizi yönetin ve siparişlerinizi takip edin
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardContent className="p-0">
                <nav className="space-y-1 p-2">
                  {[
                    { icon: User, label: 'Profil Bilgileri', href: '/account', active: true },
                    { icon: Edit3, label: 'Profili Düzenle', href: '/account/profile' },
                    { icon: Package, label: 'Siparişlerim', href: '/account/orders' },
                    { icon: Heart, label: 'Favorilerim', href: '/account/wishlist' },
                    { icon: MapPin, label: 'Adreslerim', href: '/account/addresses' },
                    { icon: CreditCard, label: 'Ödeme Yöntemleri', href: '/account/payment-methods' },
                    { icon: Bell, label: 'Bildirimler', href: '/account/notifications' },
                    { icon: Shield, label: 'Güvenlik', href: '/account/security' },
                    { icon: Settings, label: 'Ayarlar', href: '/account/settings' }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all hover:bg-accent ${
                        item.active 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Header Card */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                      <Camera className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Üye olma: {new Date(user.memberSince).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>

                    <Link href="/account/profile">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Profili Düzenle
                      </Button>
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex flex-col gap-4">
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">{user.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Toplam Sipariş</div>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-success">{formatCurrency(user.totalSpent)}</div>
                      <div className="text-sm text-muted-foreground">Toplam Harcama</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Card key={action.href} className="shadow-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <Link href={action.href} className="block">
                      <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                        <action.icon className={`w-6 h-6 ${action.color}`} />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Row (Mobile) */}
            <div className="md:hidden grid grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-primary">{user.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Sipariş</div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-success">{formatCurrency(user.totalSpent)}</div>
                  <div className="text-sm text-muted-foreground">Harcama</div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-warning">{user.loyaltyPoints}</div>
                  <div className="text-sm text-muted-foreground">Puan</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Son Siparişler</CardTitle>
                  <Link href="/account/orders">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      Tümünü Gör
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('tr-TR')} • {order.items} ürün
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground mb-1">{formatCurrency(order.total)}</div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}

                {recentOrders.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-2">Henüz siparişiniz yok</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Alışverişe başlayın ve ilk siparişinizi verin
                    </p>
                    <Link href="/products">
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Alışverişe Başla
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Default Address */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Varsayılan Adres</CardTitle>
                  <Link href="/account/addresses">
                    <Button variant="outline" size="sm">Düzenle</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{user.defaultAddress.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {user.defaultAddress.address}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {user.defaultAddress.city}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loyalty Program */}
            <Card className="shadow-card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Sadakat Puanlarınız</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Daha fazla alışveriş yapın, daha fazla puan kazanın!
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((user.loyaltyPoints / 2000) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {user.loyaltyPoints} / 2000
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{user.loyaltyPoints}</div>
                    <div className="text-sm text-muted-foreground">Puan</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

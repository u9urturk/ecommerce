'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Home,
  Building2,
  Star,
  Copy,
  Phone,
  User,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Address {
  id: string;
  title: string;
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
  instructions?: string;
}

// Mock data
const mockAddresses: Address[] = [
  {
    id: '1',
    title: 'Ev Adresi',
    name: 'Mehmet Yılmaz',
    phone: '+90 532 123 45 67',
    address: 'Kadıköy Mahallesi, Moda Caddesi, No: 123/5 Daire: 12',
    district: 'Kadıköy',
    city: 'İstanbul',
    postalCode: '34710',
    isDefault: true,
    type: 'home',
    instructions: 'Apartman girişi cadde üzerinde, kapıcı bulunmaktadır.'
  },
  {
    id: '2',
    title: 'İş Yeri',
    name: 'Mehmet Yılmaz',
    phone: '+90 212 555 99 88',
    address: 'Levent Mahallesi, Büyükdere Caddesi, Levent Plaza Kat: 12 No: 45',
    district: 'Şişli',
    city: 'İstanbul',
    postalCode: '34394',
    isDefault: false,
    type: 'work',
    instructions: 'Plaza girişinde kimlik göstermek gerekiyor.'
  },
  {
    id: '3',
    title: 'Annem Evi',
    name: 'Ayşe Yılmaz',
    phone: '+90 532 987 65 43',
    address: 'Bostancı Mahallesi, Sahil Yolu, No: 67/3',
    district: 'Kadıköy',
    city: 'İstanbul',
    postalCode: '34744',
    isDefault: false,
    type: 'other',
    instructions: 'Sahil yolundan girerken sağ tarafta.'
  }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    title: '',
    name: '',
    phone: '',
    address: '',
    district: '',
    city: '',
    postalCode: '',
    type: 'home',
    instructions: ''
  });

  const getAddressTypeIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5 text-primary" />;
      case 'work':
        return <Building2 className="w-5 h-5 text-warning" />;
      default:
        return <MapPin className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const setDefaultAddress = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const deleteAddress = (addressId: string) => {
    if (addresses.length <= 1) {
      alert('En az bir adres bulunmalıdır!');
      return;
    }
    
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    if (addressToDelete?.isDefault && addresses.length > 1) {
      // If deleting default address, make another one default
      setAddresses(prev => {
        const filtered = prev.filter(addr => addr.id !== addressId);
        if (filtered.length > 0) {
          filtered[0].isDefault = true;
        }
        return filtered;
      });
    } else {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    }
  };

  const copyAddress = (address: Address) => {
    const addressText = `${address.name}\n${address.phone}\n${address.address}\n${address.district}/${address.city} ${address.postalCode}`;
    navigator.clipboard.writeText(addressText);
    // Show toast notification here
  };

  const saveAddress = () => {
    if (!newAddress.title || !newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city) {
      alert('Lütfen zorunlu alanları doldurun!');
      return;
    }

    const addressToSave = {
      ...newAddress,
      id: editingAddress || Date.now().toString(),
      isDefault: addresses.length === 0 || newAddress.isDefault || false
    } as Address;

    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress ? addressToSave : addr
      ));
    } else {
      setAddresses(prev => [...prev, addressToSave]);
    }

    // Reset form
    setNewAddress({
      title: '',
      name: '',
      phone: '',
      address: '',
      district: '',
      city: '',
      postalCode: '',
      type: 'home',
      instructions: ''
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const startEditing = (address: Address) => {
    setNewAddress(address);
    setEditingAddress(address.id);
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setNewAddress({
      title: '',
      name: '',
      phone: '',
      address: '',
      district: '',
      city: '',
      postalCode: '',
      type: 'home',
      instructions: ''
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              <MapPin className="w-8 h-8 text-primary" />
              Adreslerim
            </h1>
            <p className="text-muted-foreground">
              Teslimat adreslerinizi yönetin ({addresses.length} adres)
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Adres Ekle
          </Button>
        </div>

        {/* Add/Edit Address Form */}
        {showAddForm && (
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                <Button variant="ghost" size="sm" onClick={cancelForm}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Adres Başlığı *</label>
                  <Input
                    placeholder="Ev, İş, Diğer..."
                    value={newAddress.title || ''}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Adres Tipi</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'home', label: 'Ev', icon: Home },
                      { value: 'work', label: 'İş', icon: Building2 },
                      { value: 'other', label: 'Diğer', icon: MapPin }
                    ].map(({ value, label, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={newAddress.type === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewAddress(prev => ({ ...prev, type: value as Address['type'] }))}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Ad Soyad *</label>
                  <Input
                    placeholder="Ad Soyad"
                    value={newAddress.name || ''}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefon *</label>
                  <Input
                    placeholder="+90 5XX XXX XX XX"
                    value={newAddress.phone || ''}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adres *</label>
                <Input
                  placeholder="Mahalle, sokak, cadde, bina no, daire no..."
                  value={newAddress.address || ''}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">İlçe</label>
                  <Input
                    placeholder="İlçe"
                    value={newAddress.district || ''}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, district: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Şehir *</label>
                  <Input
                    placeholder="Şehir"
                    value={newAddress.city || ''}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Posta Kodu</label>
                  <Input
                    placeholder="34XXX"
                    value={newAddress.postalCode || ''}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Teslimat Talimatları</label>
                <Input
                  placeholder="Opsiyonel teslimat notları..."
                  value={newAddress.instructions || ''}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, instructions: e.target.value }))}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault || false}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isDefault" className="text-sm text-foreground">
                  Bu adresi varsayılan adres yap
                </label>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button onClick={saveAddress} className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {editingAddress ? 'Güncelle' : 'Kaydet'}
                </Button>
                <Button variant="outline" onClick={cancelForm}>
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Addresses List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <Card 
              key={address.id} 
              className={`shadow-card hover:shadow-lg transition-all duration-200 ${
                address.isDefault ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getAddressTypeIcon(address.type)}
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {address.title}
                        {address.isDefault && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                            <Star className="w-3 h-3 fill-current" />
                            Varsayılan
                          </div>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {address.type === 'home' ? 'Ev Adresi' : address.type === 'work' ? 'İş Adresi' : 'Diğer'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyAddress(address)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(address)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAddress(address.id)}
                      className="text-destructive hover:text-destructive/80"
                      disabled={addresses.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{address.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{address.phone}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="text-foreground">
                        <p>{address.address}</p>
                        <p>
                          {address.district && `${address.district}, `}
                          {address.city}
                          {address.postalCode && ` ${address.postalCode}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {address.instructions && (
                      <div className="bg-muted/50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Teslimat Notu:</strong> {address.instructions}
                        </p>
                      </div>
                    )}

                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultAddress(address.id)}
                        className="flex items-center gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Varsayılan Yap
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {addresses.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="text-center py-16">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Henüz kayıtlı adresiniz yok
                </h3>
                <p className="text-muted-foreground mb-6">
                  Hızlı teslimat için adreslerinizi kaydedin
                </p>
                <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Adresimi Ekle
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

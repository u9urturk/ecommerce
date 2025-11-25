'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  CreditCard,
  Plus,
  Edit3,
  Trash2,
  Star,
  Shield,
  Calendar,
  Eye,
  EyeOff,
  Check,
  X,
  Wallet,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  name: string;
  cardNumber?: string;
  expiryDate?: string;
  cardHolder?: string;
  brand?: 'visa' | 'mastercard' | 'amex' | 'troy';
  bankName?: string;
  accountNumber?: string;
  walletType?: string;
  isDefault: boolean;
  addedDate: string;
}

// Mock data
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Ana Kartım',
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/26',
    cardHolder: 'MEHMET YILMAZ',
    brand: 'visa',
    isDefault: true,
    addedDate: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    type: 'card',
    name: 'İş Kartım',
    cardNumber: '**** **** **** 5678',
    expiryDate: '08/25',
    cardHolder: 'MEHMET YILMAZ',
    brand: 'mastercard',
    isDefault: false,
    addedDate: '2024-03-20T14:45:00Z'
  },
  {
    id: '3',
    type: 'bank',
    name: 'Garanti BBVA',
    bankName: 'Garanti BBVA',
    accountNumber: '**** **** 4567',
    isDefault: false,
    addedDate: '2024-02-10T09:15:00Z'
  }
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<string | null>(null);
  const [showCardDetails, setShowCardDetails] = useState<string | null>(null);
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: 'card',
    name: '',
    cardNumber: '',
    expiryDate: '',
    cardHolder: '',
    brand: 'visa'
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCardBrandIcon = (brand: string) => {
    const brandColors = {
      visa: 'from-blue-600 to-blue-700',
      mastercard: 'from-red-600 to-orange-600',
      amex: 'from-green-600 to-teal-600',
      troy: 'from-purple-600 to-pink-600'
    };
    
    return (
      <div className={`w-8 h-8 rounded bg-gradient-to-r ${brandColors[brand as keyof typeof brandColors] || brandColors.visa} flex items-center justify-center text-white text-xs font-bold`}>
        {brand?.toUpperCase().slice(0, 2)}
      </div>
    );
  };

  const getPaymentTypeIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5 text-primary" />;
      case 'bank':
        return <Building className="w-5 h-5 text-success" />;
      case 'wallet':
        return <Wallet className="w-5 h-5 text-warning" />;
      default:
        return <CreditCard className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const setDefaultMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })));
  };

  const deleteMethod = (methodId: string) => {
    if (paymentMethods.length <= 1) {
      alert('En az bir ödeme yöntemi bulunmalıdır!');
      return;
    }
    
    const methodToDelete = paymentMethods.find(method => method.id === methodId);
    if (methodToDelete?.isDefault && paymentMethods.length > 1) {
      setPaymentMethods(prev => {
        const filtered = prev.filter(method => method.id !== methodId);
        if (filtered.length > 0) {
          filtered[0].isDefault = true;
        }
        return filtered;
      });
    } else {
      setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    }
  };

  const saveMethod = () => {
    if (!newMethod.name || (!newMethod.cardNumber && newMethod.type === 'card')) {
      alert('Lütfen zorunlu alanları doldurun!');
      return;
    }

    const methodToSave = {
      ...newMethod,
      id: editingMethod || Date.now().toString(),
      isDefault: paymentMethods.length === 0 || newMethod.isDefault || false,
      addedDate: editingMethod 
        ? paymentMethods.find(m => m.id === editingMethod)?.addedDate || new Date().toISOString()
        : new Date().toISOString()
    } as PaymentMethod;

    if (editingMethod) {
      setPaymentMethods(prev => prev.map(method => 
        method.id === editingMethod ? methodToSave : method
      ));
    } else {
      setPaymentMethods(prev => [...prev, methodToSave]);
    }

    // Reset form
    setNewMethod({
      type: 'card',
      name: '',
      cardNumber: '',
      expiryDate: '',
      cardHolder: '',
      brand: 'visa'
    });
    setShowAddForm(false);
    setEditingMethod(null);
  };

  const startEditing = (method: PaymentMethod) => {
    setNewMethod(method);
    setEditingMethod(method.id);
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setNewMethod({
      type: 'card',
      name: '',
      cardNumber: '',
      expiryDate: '',
      cardHolder: '',
      brand: 'visa'
    });
    setShowAddForm(false);
    setEditingMethod(null);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
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
              <CreditCard className="w-8 h-8 text-primary" />
              Ödeme Yöntemlerim
            </h1>
            <p className="text-muted-foreground">
              Kart ve hesap bilgilerinizi güvenle saklayın ({paymentMethods.length} yöntem)
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Ödeme Yöntemi
          </Button>
        </div>

        {/* Security Notice */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Güvenlik Bilgisi</h3>
                <p className="text-sm text-muted-foreground">
                  Ödeme bilgileriniz 256-bit SSL şifrelemesi ile korunmaktadır. 
                  Kart bilgileriniz sadece şifreli olarak saklanır ve asla tam haliyle görüntülenmez.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Payment Method Form */}
        {showAddForm && (
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingMethod ? 'Ödeme Yöntemini Düzenle' : 'Yeni Ödeme Yöntemi Ekle'}
                <Button variant="ghost" size="sm" onClick={cancelForm}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Type Selection */}
              <div className="form-group">
                <label className="form-label">Ödeme Tipi</label>
                <div className="flex gap-2">
                  {[
                    { value: 'card', label: 'Kredi/Banka Kartı', icon: CreditCard },
                    { value: 'bank', label: 'Banka Hesabı', icon: Building },
                    { value: 'wallet', label: 'Dijital Cüzdan', icon: Wallet }
                  ].map(({ value, label, icon: Icon }) => (
                    <Button
                      key={value}
                      variant={newMethod.type === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewMethod(prev => ({ ...prev, type: value as PaymentMethod['type'] }))}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ödeme Yöntemi Adı *</label>
                <Input
                  placeholder="Ana Kartım, İş Kartım, vs..."
                  value={newMethod.name || ''}
                  onChange={(e) => setNewMethod(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {newMethod.type === 'card' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Kart Numarası *</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={newMethod.cardNumber || ''}
                        onChange={(e) => setNewMethod(prev => ({ 
                          ...prev, 
                          cardNumber: formatCardNumber(e.target.value) 
                        }))}
                        maxLength={19}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Son Kullanma Tarihi *</label>
                      <Input
                        placeholder="AA/YY"
                        value={newMethod.expiryDate || ''}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setNewMethod(prev => ({ ...prev, expiryDate: value }));
                        }}
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Kart Üzerindeki İsim *</label>
                      <Input
                        placeholder="MEHMET YILMAZ"
                        value={newMethod.cardHolder || ''}
                        onChange={(e) => setNewMethod(prev => ({ 
                          ...prev, 
                          cardHolder: e.target.value.toUpperCase() 
                        }))}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Kart Markası</label>
                      <div className="flex gap-2">
                        {[
                          { value: 'visa', label: 'Visa' },
                          { value: 'mastercard', label: 'Mastercard' },
                          { value: 'amex', label: 'Amex' },
                          { value: 'troy', label: 'Troy' }
                        ].map(({ value, label }) => (
                          <Button
                            key={value}
                            variant={newMethod.brand === value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNewMethod(prev => ({ ...prev, brand: value as any }))}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {newMethod.type === 'bank' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Banka Adı *</label>
                    <Input
                      placeholder="Garanti BBVA, İş Bankası, vs..."
                      value={newMethod.bankName || ''}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, bankName: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hesap Numarası *</label>
                    <Input
                      placeholder="TR00 0000 0000 0000 0000 00"
                      value={newMethod.accountNumber || ''}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, accountNumber: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              {newMethod.type === 'wallet' && (
                <div className="form-group">
                  <label className="form-label">Cüzdan Tipi *</label>
                  <Input
                    placeholder="PayPal, Apple Pay, Google Pay, vs..."
                    value={newMethod.walletType || ''}
                    onChange={(e) => setNewMethod(prev => ({ ...prev, walletType: e.target.value }))}
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newMethod.isDefault || false}
                  onChange={(e) => setNewMethod(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isDefault" className="text-sm text-foreground">
                  Bu ödeme yöntemini varsayılan yap
                </label>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button onClick={saveMethod} className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {editingMethod ? 'Güncelle' : 'Kaydet'}
                </Button>
                <Button variant="outline" onClick={cancelForm}>
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card 
              key={method.id} 
              className={`shadow-card hover:shadow-lg transition-all duration-200 ${
                method.isDefault ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {getPaymentTypeIcon(method.type)}
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {method.name}
                        {method.isDefault && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                            <Star className="w-3 h-3 fill-current" />
                            Varsayılan
                          </div>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ekleme: {formatDate(method.addedDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(method)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMethod(method.id)}
                      className="text-destructive hover:text-destructive/80"
                      disabled={paymentMethods.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {method.type === 'card' && (
                      <>
                        <div className="flex items-center gap-3">
                          {method.brand && getCardBrandIcon(method.brand)}
                          <div>
                            <p className="font-medium text-foreground">{method.cardNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              Son kullanma: {method.expiryDate}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <span className="text-foreground">{method.cardHolder}</span>
                        </div>
                      </>
                    )}

                    {method.type === 'bank' && (
                      <>
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-success" />
                          <span className="font-medium text-foreground">{method.bankName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5"></div>
                          <span className="text-foreground">{method.accountNumber}</span>
                        </div>
                      </>
                    )}

                    {method.type === 'wallet' && (
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-warning" />
                        <span className="font-medium text-foreground">{method.walletType}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between">
                    {method.type === 'card' && (
                      <div className="mb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCardDetails(
                            showCardDetails === method.id ? null : method.id
                          )}
                          className="flex items-center gap-2"
                        >
                          {showCardDetails === method.id ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              Gizle
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              Detayları Göster
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultMethod(method.id)}
                        className="flex items-center gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Varsayılan Yap
                      </Button>
                    )}
                  </div>
                </div>

                {/* Card Details (when revealed) */}
                {showCardDetails === method.id && method.type === 'card' && (
                  <div className="mt-4 pt-4 border-t border-border bg-muted/30 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Kart Numarası:</span>
                        <p className="font-mono">•••• •••• •••• 1234</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CVV:</span>
                        <p className="font-mono">•••</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Güvenlik amacıyla tam bilgiler gösterilmemektedir.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {paymentMethods.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="text-center py-16">
                <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Henüz kayıtlı ödeme yönteminiz yok
                </h3>
                <p className="text-muted-foreground mb-6">
                  Hızlı ödeme için kart ve hesap bilgilerinizi kaydedin
                </p>
                <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Ödeme Yöntemimi Ekle
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

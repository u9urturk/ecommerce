'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  User,
  Camera,
  Save,
  X,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other' | '';
  avatar: string;
  bio: string;
  // Preferences
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  // Privacy
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showPhone: boolean;
}

// Mock data
const mockProfile: UserProfile = {
  id: '1',
  firstName: 'Mehmet',
  lastName: 'Yılmaz',
  email: 'mehmet@example.com',
  phone: '+90 532 123 45 67',
  birthDate: '1990-05-15',
  gender: 'male',
  avatar: '/api/placeholder/150/150',
  bio: 'E-ticaret tutkunuyum, teknoloji ile ilgili ürünleri araştırmayı ve denemeyi seviyorum.',
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
  orderUpdates: true,
  profileVisibility: 'private',
  showEmail: false,
  showPhone: false
};

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'preferences' | 'privacy'>('personal');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Profile updated:', profile);
      // Show success message
      alert('Profil başarıyla güncellendi!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Profil güncellenirken bir hata oluştu!');
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor!');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert('Yeni şifre en az 8 karakter olmalıdır!');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Password changed');
      alert('Şifre başarıyla değiştirildi!');
      
      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowChangePassword(false);
    } catch (error) {
      console.error('Password change error:', error);
      alert('Şifre değiştirilirken bir hata oluştu!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfile('avatar', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'personal' as const, label: 'Kişisel Bilgiler', icon: User },
    { id: 'preferences' as const, label: 'Tercihler', icon: Bell },
    { id: 'privacy' as const, label: 'Gizlilik', icon: Shield }
  ];

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
            <h1 className="text-3xl font-bold text-foreground">Profili Düzenle</h1>
            <p className="text-muted-foreground">
              Hesap bilgilerinizi ve tercihlerinizi yönetin
            </p>
          </div>
          <Button 
            onClick={saveProfile} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            {/* Avatar Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Profil Fotoğrafı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt="Profil" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="w-4 h-4 text-primary-foreground" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Fotoğrafınızı değiştirin</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      JPG, PNG veya GIF formatında, maksimum 2MB
                    </p>
                    <Button variant="outline" size="sm" onClick={() => updateProfile('avatar', '')}>
                      Fotoğrafı Kaldır
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Ad *</label>
                    <Input
                      value={profile.firstName}
                      onChange={(e) => updateProfile('firstName', e.target.value)}
                      placeholder="Adınız"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Soyad *</label>
                    <Input
                      value={profile.lastName}
                      onChange={(e) => updateProfile('lastName', e.target.value)}
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">E-posta *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        placeholder="ornek@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        placeholder="+90 5XX XXX XX XX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Doğum Tarihi</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={profile.birthDate}
                        onChange={(e) => updateProfile('birthDate', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cinsiyet</label>
                    <select
                      value={profile.gender}
                      onChange={(e) => updateProfile('gender', e.target.value)}
                      className="form-input"
                    >
                      <option value="">Seçiniz</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hakkımda</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                    rows={3}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Şifre Değiştir
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowChangePassword(!showChangePassword)}
                  >
                    {showChangePassword ? 'İptal' : 'Şifre Değiştir'}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showChangePassword && (
                <CardContent className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Mevcut Şifre *</label>
                    <Input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Mevcut şifrenizi girin"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Yeni Şifre *</label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="En az 8 karakter"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Yeni Şifre Tekrar *</label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                  </div>
                  <Button 
                    onClick={changePassword}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Şifreyi Değiştir
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">E-posta Bildirimleri</h4>
                    <p className="text-sm text-muted-foreground">Önemli bilgilendirmeler için e-posta alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.emailNotifications}
                      onChange={(e) => updateProfile('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">SMS Bildirimleri</h4>
                    <p className="text-sm text-muted-foreground">Acil durumlar için SMS alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.smsNotifications}
                      onChange={(e) => updateProfile('smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Pazarlama E-postaları</h4>
                    <p className="text-sm text-muted-foreground">Özel teklifler ve kampanyalar hakkında bilgi alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.marketingEmails}
                      onChange={(e) => updateProfile('marketingEmails', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Sipariş Güncellemeleri</h4>
                    <p className="text-sm text-muted-foreground">Sipariş durumu değişikliklerinde bilgilendirilme</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.orderUpdates}
                      onChange={(e) => updateProfile('orderUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Gizlilik Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Profil Görünürlüğü</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={profile.profileVisibility === 'public' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateProfile('profileVisibility', 'public')}
                    >
                      Herkese Açık
                    </Button>
                    <Button
                      variant={profile.profileVisibility === 'private' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateProfile('profileVisibility', 'private')}
                    >
                      Gizli
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Profilinizin diğer kullanıcılar tarafından görünebilirlik durumu
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">E-posta Adresini Göster</h4>
                    <p className="text-sm text-muted-foreground">E-posta adresiniz profilinizde görünsün mü?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.showEmail}
                      onChange={(e) => updateProfile('showEmail', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Telefon Numarasını Göster</h4>
                    <p className="text-sm text-muted-foreground">Telefon numaranız profilinizde görünsün mü?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.showPhone}
                      onChange={(e) => updateProfile('showPhone', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-2">Veri İşleme</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Verilerinizle ilgili işlemler
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Verilerimi İndir
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive/80">
                    Hesabımı Sil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

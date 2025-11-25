# E-Ticaret Profil Modülü

Bu modül, e-ticaret platformu için kapsamlı bir kullanıcı profil yönetim sistemi sağlar. Tailwind CSS tasarım sistemi kullanılarak modern ve responsive bir arayüz oluşturulmuştur.

## 🚀 Özellikler

### 📋 Ana Profil Sayfası (`/account`)
- Kullanıcı bilgileri özeti
- Sipariş istatistikleri
- Hızlı eylem kartları
- Son siparişler listesi
- Varsayılan adres bilgisi
- Sadakat programı durumu

### 📦 Sipariş Yönetimi (`/account/orders`)
- Detaylı sipariş listeleme
- Sipariş durumu takibi
- Arama ve filtreleme
- Sipariş detayları görüntüleme
- Fatura indirme
- Kargo takip entegrasyonu
- Değerlendirme ve iade işlemleri

### ❤️ Favori Ürünler (`/account/wishlist`)
- Grid ve liste görünümleri
- Kategori bazlı filtreleme
- Toplu işlemler (seçme, silme)
- Sepete ekleme
- Stok durumu kontrolü
- Ürün paylaşma

### 🏠 Adres Yönetimi (`/account/addresses`)
- Çoklu adres kaydetme
- Adres türü belirleme (Ev, İş, Diğer)
- Varsayılan adres ayarlama
- Detaylı adres formu
- Teslimat talimatları
- Adres düzenleme ve silme

### 💳 Ödeme Yöntemleri (`/account/payment-methods`)
- Kredi/Banka kartı ekleme
- Banka hesabı kaydetme
- Dijital cüzdan entegrasyonu
- Güvenli kart bilgisi saklama
- Varsayılan ödeme yöntemi
- Kart markası desteği (Visa, Mastercard, Amex, Troy)

### ✏️ Profil Düzenleme (`/account/profile`)
- Kişisel bilgiler düzenleme
- Profil fotoğrafı yükleme
- Şifre değiştirme
- Bildirim tercihleri
- Gizlilik ayarları
- Veri indirme/silme seçenekleri

## 🎨 Tasarım Sistemi

### Renk Paleti
```css
/* Ana marka renkleri */
--primary: 263 67% 51%;        /* Brand Purple #6D28D9 */
--primary-foreground: 210 40% 98%;
--secondary: 0 0% 18%;         /* Açık gri card'lar için */
--accent: 263 67% 65%;         /* Brand Light #8B5CF6 */

/* Durum renkleri */
--success: 142.1 70.6% 45.3%;  /* Yeşil */
--warning: 38.1 96.1% 65.9%;   /* Turuncu */
--danger: 0 62.8% 30.6%;       /* Kırmızı */
```

### Tipografi
- **Font**: Inter (sans-serif)
- **Boyutlar**: xs (12px) - 3xl (28px)
- **Ağırlıklar**: normal, medium, semibold, bold

### Spacing & Layout
- **Container**: Merkezi, responsive padding
- **Grid**: CSS Grid ve Flexbox kullanımı
- **Breakpoints**: sm, md, lg, xl
- **Shadows**: Subtle elevation sistem

## 🛠 Teknoloji Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState/useEffect
- **TypeScript**: Tam tip güvenliği

## 📱 Responsive Tasarım

### Mobile First Yaklaşım
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Adaptif Özellikler
- Esnek grid sistemleri
- Hamburger menüler
- Touch-friendly butonlar
- Swipe gestures desteği

## 🔒 Güvenlik Özellikleri

### Veri Koruma
- Kart numaralarının maskelenmesi
- SSL şifrelemesi bildirimi
- Güvenli form validasyonları
- GDPR uyumlu veri yönetimi

### Kullanıcı Kontrolü
- Gizlilik ayarları
- Veri indirme/silme hakları
- Bildirim tercih yönetimi
- Profil görünürlük kontrolü

## 🎯 UX/UI Prensipleri

### Kullanıcı Deneyimi
- **Tutarlılık**: Standart tasarım dili
- **Clarity**: Net bilgi hiyerarşisi
- **Feedback**: Anlık durum bildirimleri
- **Efficiency**: Minimum tıklama ile maksimum işlev

### Erişilebilirlik
- Keyboard navigasyonu
- Screen reader desteği
- Yüksek kontrast oranları
- ARIA etiketleri

## 📁 Dosya Yapısı

```
app/account/
├── page.tsx                    # Ana profil sayfası
├── loading.tsx                 # Ana loading state
├── orders/
│   ├── page.tsx               # Siparişler listesi
│   └── loading.tsx            # Siparişler loading
├── wishlist/
│   ├── page.tsx               # Favori ürünler
│   └── loading.tsx            # Wishlist loading
├── addresses/
│   ├── page.tsx               # Adres yönetimi
│   └── loading.tsx            # Adresler loading
├── payment-methods/
│   ├── page.tsx               # Ödeme yöntemleri
│   └── loading.tsx            # Ödeme loading
└── profile/
    ├── page.tsx               # Profil düzenleme
    └── loading.tsx            # Profil loading

components/loading/
└── account-skeletons.tsx      # Tüm skeleton componentleri
```

## 🔄 State Management

### Local State Patterns
```typescript
// Temel form state yönetimi
const [formData, setFormData] = useState<FormType>(initialData);

// Optimistic updates
const updateProfile = (field: keyof Profile, value: any) => {
  setProfile(prev => ({ ...prev, [field]: value }));
};

// Loading states
const [isLoading, setIsLoading] = useState(false);
```

### Validation Patterns
```typescript
// Form validation
const validateForm = () => {
  const errors: {[key: string]: string} = {};
  
  if (!formData.email) {
    errors.email = 'E-posta gereklidir';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Geçerli bir e-posta adresi girin';
  }
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

## 💡 En İyi Uygulamalar

### Performance
- Lazy loading implementasyonu
- Image optimization
- Bundle splitting
- Memoization kullanımı

### SEO
- Semantic HTML yapısı
- Meta tag optimizasyonu
- Structured data
- Sitemap entegrasyonu

### Maintainability
- Component-based architecture
- Type-safe development
- Consistent naming conventions
- Comprehensive error handling

## 🚦 Getting Started

1. **Geliştirme sunucusunu başlat**:
```bash
npm run dev
```

2. **Ana profil sayfasını ziyaret et**:
```
http://localhost:3000/account
```

3. **Diğer modülleri keşfet**:
- Siparişler: `/account/orders`
- Favoriler: `/account/wishlist` 
- Adresler: `/account/addresses`
- Ödeme: `/account/payment-methods`
- Profil: `/account/profile`

## 🔮 Gelecek Planları

- [ ] Real-time bildirimler
- [ ] Advanced analytics
- [ ] Social login integrations
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering options
- [ ] Export/Import functionality

## 📝 License

Bu modül MIT lisansı altında lisanslanmıştır.

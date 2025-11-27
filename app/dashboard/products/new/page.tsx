'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import * as React from 'react'
import { ArrowLeft, Upload, X, Plus, Save, Eye, Star, Crown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../../../lib/utils'

interface ProductFormData {
  name: string
  description: string
  category: string
  tags: string[]
  price: number
  cost: number
  stock: number
  status: 'active' | 'inactive' | 'draft'
  featured: boolean
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  images: string[]
}

interface UploadedImage {
  file: File
  url: string
  isMain: boolean
}

const categories = [
  'Elektronik',
  'Bilgisayar',
  'Telefon & Aksesuar',
  'Giyim',
  'Ayakkabı',
  'Ev & Yaşam',
  'Spor & Outdoor',
  'Kitap & Müzik',
  'Kozmetik',
  'Diğer'
]

export default function NewProductPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'seo' | 'media'>('general')
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    tags: [],
    price: 0,
    cost: 0,
    stock: 0,
    status: 'draft',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    images: []
  })
  const [newTag, setNewTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [targetMarginPercent, setTargetMarginPercent] = useState(30) // Default %30 kar marjı
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [uploadErrors, setUploadErrors] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [seoSuggestions, setSeoSuggestions] = useState({
    title: '',
    description: '',
    keywords: [] as string[]
  })

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  // Kar marjı hesaplamaları
  const calculateMargin = () => {
    if (formData.price > 0 && formData.cost > 0) {
      return ((formData.price - formData.cost) / formData.price) * 100
    }
    return 0
  }

  const calculateProfitAmount = () => {
    return formData.price - formData.cost
  }

  const calculatePriceFromMargin = (margin: number) => {
    if (formData.cost > 0 && margin > 0 && margin < 100) {
      return formData.cost / (1 - margin / 100)
    }
    return 0
  }

  const applyTargetMargin = () => {
    const newPrice = calculatePriceFromMargin(targetMarginPercent)
    if (newPrice > 0) {
      setFormData(prev => ({
        ...prev,
        price: Math.round(newPrice * 100) / 100 // 2 decimal places
      }))
    }
  }

  const getMarginColor = (margin: number) => {
    if (margin >= 40) return 'text-green-500'
    if (margin >= 20) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getMarginBarColor = (margin: number) => {
    if (margin >= 40) return 'bg-green-500'
    if (margin >= 20) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // Dosya yükleme fonksiyonları
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const maxFileSizeMB = 5
  const maxFiles = 10

  const validateImage = (file: File): string | null => {
    // Dosya türü kontrolü
    if (!allowedImageTypes.includes(file.type)) {
      return `${file.name}: Sadece JPG, PNG, WebP ve GIF formatları kabul edilir.`
    }

    // Dosya boyutu kontrolü (MB cinsinden)
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxFileSizeMB) {
      return `${file.name}: Dosya boyutu ${maxFileSizeMB}MB'dan küçük olmalıdır. (Mevcut: ${fileSizeMB.toFixed(2)}MB)`
    }

    return null
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const errors: string[] = []
    const validImages: UploadedImage[] = []

    // Toplam dosya sayısı kontrolü
    if (uploadedImages.length + files.length > maxFiles) {
      errors.push(`Maksimum ${maxFiles} dosya yükleyebilirsiniz.`)
      setUploadErrors(errors)
      return
    }

    files.forEach(file => {
      const error = validateImage(file)
      if (error) {
        errors.push(error)
      } else {
        // Aynı dosyanın daha önce yüklenip yüklenimdiğini kontrol et
        const isDuplicate = uploadedImages.some(img => 
          img.file.name === file.name && img.file.size === file.size
        )
        if (isDuplicate) {
          errors.push(`${file.name}: Bu dosya zaten yüklendi.`)
        } else {
          const imageUrl = URL.createObjectURL(file)
          validImages.push({
            file: file,
            url: imageUrl,
            isMain: uploadedImages.length === 0 && validImages.length === 0 // İlk yüklenen otomatik ana olur
          })
        }
      }
    })

    if (validImages.length > 0) {
      setUploadedImages(prev => [...prev, ...validImages])
      // Form data'ya dosya URL'lerini ekle
      const newImageUrls = validImages.map(img => img.url)
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImageUrls]
      }))
    }

    setUploadErrors(errors)
    // Input'u temizle
    if (event.target) {
      event.target.value = ''
    }
  }

  const setMainImage = (targetIndex: number) => {
    setUploadedImages(prev => prev.map((img, index) => ({
      ...img,
      isMain: index === targetIndex
    })))
  }

  const removeImage = (index: number) => {
    const imageToRemove = uploadedImages[index]
    
    // URL'yi temizle
    URL.revokeObjectURL(imageToRemove.url)
    
    // Ana görsel siliniyorsa ve başka görsel varsa ilkini ana yap
    const updatedImages = uploadedImages.filter((_, i) => i !== index)
    if (imageToRemove.isMain && updatedImages.length > 0) {
      updatedImages[0].isMain = true
    }
    
    setUploadedImages(updatedImages)
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getMainImageUrl = (): string | null => {
    const mainImage = uploadedImages.find(img => img.isMain)
    return mainImage ? mainImage.url : null
  }

  // Utility function to generate URL slug
  const generateSlug = (text: string): string => {
    if (!text) return 'urun'
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-')
  }

  // SEO yardımcı fonksiyonlar
  const generateSeoSuggestions = () => {
    if (!formData.name || !formData.category) return

    const productName = formData.name
    const category = formData.category
    const keywords = formData.tags

    // Otomatik title önerisi
    const suggestedTitle = `${productName} - ${category} | MyShop`

    // Otomatik description önerisi
    const suggestedDescription = `${productName} ${category.toLowerCase()}, ${formData.description ? formData.description.substring(0, 80) + '...' : 'kaliteli ürün'}. Ücretsiz kargo, güvenli alışveriş, hızlı teslimat.`

    // Anahtar kelime önerileri
    const suggestedKeywords = [
      productName.toLowerCase(),
      category.toLowerCase(),
      ...keywords,
      `${productName} fiyat`,
      `${productName} satın al`,
      `${category} ürünleri`
    ].slice(0, 8)

    setSeoSuggestions({
      title: suggestedTitle,
      description: suggestedDescription,
      keywords: suggestedKeywords
    })
  }

  const applySeoSuggestion = (type: 'title' | 'description') => {
    if (type === 'title') {
      handleInputChange('seoTitle', seoSuggestions.title)
    } else {
      handleInputChange('seoDescription', seoSuggestions.description)
    }
  }

  const getSeoScore = () => {
    let score = 0
    const title = formData.seoTitle || formData.name
    const description = formData.seoDescription || formData.description

    // Title kontrolleri
    if (title.length >= 30 && title.length <= 60) score += 25
    else if (title.length > 0) score += 10

    // Description kontrolleri  
    if (description.length >= 120 && description.length <= 160) score += 25
    else if (description.length > 0) score += 10

    // Ana kelime kontrolü
    if (formData.name && title.toLowerCase().includes(formData.name.toLowerCase())) score += 20

    // Kategori kontrolü
    if (formData.category && description.toLowerCase().includes(formData.category.toLowerCase())) score += 15

    // Call-to-action kontrolü
    const ctaWords = ['satın al', 'sipariş', 'hemen', 'indirim', 'kampanya', 'ücretsiz']
    if (ctaWords.some(word => description.toLowerCase().includes(word))) score += 15

    return Math.min(score, 100)
  }

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getSeoRecommendations = () => {
    const recommendations = []
    const title = formData.seoTitle || formData.name
    const description = formData.seoDescription || formData.description

    if (!title || title.length < 30) {
      recommendations.push('SEO başlığınız çok kısa. En az 30 karakter olmalı.')
    }
    if (title && title.length > 60) {
      recommendations.push('SEO başlığınız çok uzun. 60 karakterden kısa olmalı.')
    }
    if (!description || description.length < 120) {
      recommendations.push('SEO açıklamanız çok kısa. En az 120 karakter olmalı.')
    }
    if (description && description.length > 160) {
      recommendations.push('SEO açıklamanız çok uzun. 160 karakterden kısa olmalı.')
    }
    if (formData.name && !title.toLowerCase().includes(formData.name.toLowerCase())) {
      recommendations.push('Başlığınızda ürün adı geçmiyor. Ana kelimeyi ekleyin.')
    }
    if (!description.includes('ücretsiz') && !description.includes('kargo') && !description.includes('teslimat')) {
      recommendations.push('Açıklamanıza çekici kelimeler ekleyin (ücretsiz kargo, hızlı teslimat vb.)')
    }

    return recommendations
  }

  // formData değiştiğinde SEO önerilerini güncelle
  React.useEffect(() => {
    generateSeoSuggestions()
  }, [formData.name, formData.category, formData.description, formData.tags])

  const handleSubmit = (status: 'draft' | 'active') => {
    const updatedData = { ...formData, status }
    console.log('Ürün kaydediliyor:', updatedData)
    // API call yapılacak
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/dashboard/products" 
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Yeni Ürün Ekle</h1>
          <p className="text-muted-foreground">
            Mağazanıza yeni ürün ekleyin
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="btn-secondary"
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Düzenle' : 'Önizle'}
          </button>
          <button
            onClick={() => handleSubmit('draft')}
            className="btn-secondary"
          >
            Taslak Kaydet
          </button>
          <button
            onClick={() => handleSubmit('active')}
            className="btn-primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Kaydet & Yayınla
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-4 sticky top-6">
            <nav className="space-y-2">
              {[
                { id: 'general', label: 'Genel Bilgiler', icon: '📝' },
                { id: 'inventory', label: 'Stok & Fiyat', icon: '📦' },
                { id: 'media', label: 'Medya', icon: '🖼️' },
                { id: 'seo', label: 'SEO', icon: '🔍' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
            
            {/* Progress */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground mb-2">Tamamlanma</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ 
                    width: `${
                      (formData.name ? 20 : 0) +
                      (formData.description ? 20 : 0) +
                      (formData.category ? 20 : 0) +
                      (formData.price > 0 && formData.cost > 0 ? 20 : 0) +
                      (uploadedImages.length > 0 ? 20 : 0)
                    }%` 
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {
                  (formData.name ? 20 : 0) +
                  (formData.description ? 20 : 0) +
                  (formData.category ? 20 : 0) +
                  (formData.price > 0 && formData.cost > 0 ? 20 : 0) +
                  (uploadedImages.length > 0 ? 20 : 0)
                }% tamamlandı
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Genel Bilgiler</h3>
                
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Ürün Adı *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="form-input"
                      placeholder="Ürün adını girin..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ürün Açıklaması</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="form-input min-h-32"
                      placeholder="Ürünün detaylı açıklamasını girin..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kategori *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="form-input"
                    >
                      <option value="">Kategori seçin...</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="form-group">
                    <label className="form-label">Etiketler</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="form-input flex-1"
                        placeholder="Etiket ekle..."
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="btn-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 text-xs rounded-full"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Durum</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="form-input"
                      >
                        <option value="draft">Taslak</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => handleInputChange('featured', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm font-medium">Öne Çıkan Ürün</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Stok & Fiyatlandırma</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Maliyet (₺) *</label>
                      <input
                        type="number"
                        value={formData.cost}
                        onChange={(e) => handleInputChange('cost', Number(e.target.value))}
                        className="form-input"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Ürünün size olan maliyeti
                      </p>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Satış Fiyatı (₺) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', Number(e.target.value))}
                        className="form-input"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Müşteriden alacağınız fiyat
                      </p>
                    </div>
                  </div>

                  {/* Kar Marjı Hedefleyici */}
                  {formData.cost > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        🎯 Kar Marjı Hedefleyici
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium min-w-fit">
                            Hedef Kar Marjı:
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="80"
                            step="5"
                            value={targetMarginPercent}
                            onChange={(e) => setTargetMarginPercent(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="min-w-fit font-medium">
                            %{targetMarginPercent}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            Önerilen Satış Fiyatı:
                          </span>
                          <span className="font-bold text-primary">
                            ₺{calculatePriceFromMargin(targetMarginPercent).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={applyTargetMargin}
                            className="btn-secondary text-xs px-3 py-1"
                          >
                            Uygula
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Kar Analizi */}
                  {formData.price > 0 && formData.cost > 0 && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-4">📊 Kar Analizi</h4>
                      
                      <div className="space-y-4">
                        {/* Kar Marjı Bar */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Kar Marjı</span>
                            <span className={`font-bold text-lg ${getMarginColor(calculateMargin())}`}>
                              %{calculateMargin().toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${getMarginBarColor(calculateMargin())}`}
                              style={{ width: `${Math.min(calculateMargin(), 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Düşük (0-20%)</span>
                            <span>Orta (20-40%)</span>
                            <span>Yüksek (40%+)</span>
                          </div>
                        </div>

                        {/* Kar Detayları */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-background rounded-lg p-3">
                            <div className="text-xs text-muted-foreground">Kar Miktarı</div>
                            <div className="text-lg font-bold text-green-600">
                              ₺{calculateProfitAmount().toFixed(2)}
                            </div>
                          </div>
                          <div className="bg-background rounded-lg p-3">
                            <div className="text-xs text-muted-foreground">Net Kar Oranı</div>
                            <div className={`text-lg font-bold ${getMarginColor(calculateMargin())}`}>
                              %{calculateMargin().toFixed(1)}
                            </div>
                          </div>
                        </div>

                        {/* Kar Marjı Tavsiyeleri */}
                        <div className="text-xs text-muted-foreground bg-background rounded-lg p-3">
                          {calculateMargin() >= 40 && "🟢 Excellent! Yüksek kar marjınız var."}
                          {calculateMargin() >= 20 && calculateMargin() < 40 && "🟡 Good! Sağlıklı bir kar marjınız var."}
                          {calculateMargin() > 0 && calculateMargin() < 20 && "🟠 Low! Kar marjınızı artırmayı düşünün."}
                          {calculateMargin() <= 0 && "🔴 Warning! Zarar ediyorsunuz, fiyatları gözden geçirin."}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Stok Miktarı</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', Number(e.target.value))}
                      className="form-input"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  {/* İndirim/Kampanya Bilgilendirmesi */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">💡 İndirim & Kampanya Bilgisi</h4>
                    <p className="text-sm text-blue-700">
                      Ürünlere özel indirimler ve kategori bazlı kampanyalar için ayrı bir kampanya yönetim modülü kullanılacaktır. 
                      Bu sayede daha detaylı kampanya planlaması yapabileceksiniz.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Medya</h3>
                
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Ürün Resimlerini Yükleyin</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      JPG, PNG, WebP veya GIF formatında, maksimum {maxFileSizeMB}MB
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Maksimum {maxFiles} dosya • {uploadedImages.length}/{maxFiles} yüklendi
                    </p>
                    
                    <div className="space-y-3">
                      <label className="btn-primary cursor-pointer inline-block">
                        <input
                          type="file"
                          multiple
                          accept={allowedImageTypes.join(',')}
                          onChange={handleFileSelect}
                          className="hidden"
                          disabled={uploadedImages.length >= maxFiles}
                        />
                        {uploadedImages.length >= maxFiles ? 'Maksimum Dosya Sayısı' : 'Resim Seç'}
                      </label>
                      
                      {uploadedImages.length > 0 && (
                        <p className="text-xs text-success">
                          ✓ {uploadedImages.length} dosya başarıyla yüklendi
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Error Messages */}
                  {uploadErrors.length > 0 && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <h5 className="font-medium text-destructive mb-2">❌ Yükleme Hataları:</h5>
                      <ul className="text-sm text-destructive space-y-1">
                        {uploadErrors.map((error, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-destructive">•</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setUploadErrors([])}
                        className="text-xs text-destructive hover:underline mt-2"
                      >
                        Hataları Temizle
                      </button>
                    </div>
                  )}

                  {/* Upload Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">📝 Yükleme Kuralları:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Desteklenen formatlar:</strong> JPG, PNG, WebP, GIF</li>
                      <li>• <strong>Maksimum boyut:</strong> {maxFileSizeMB}MB dosya başına</li>
                      <li>• <strong>Maksimum dosya sayısı:</strong> {maxFiles} adet</li>
                      <li>• <strong>Önerilen boyutlar:</strong> En az 800x600px (daha yüksek çözünürlük önerilir)</li>
                      <li>• <strong>İlk resim:</strong> Ana ürün resmi olarak kullanılacaktır</li>
                    </ul>
                  </div>
                  
                  {/* Image preview area */}
                  {uploadedImages.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-3">Yüklenen Resimler ({uploadedImages.length}/{maxFiles})</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedImages.map((imageData, index) => (
                          <div key={index} className="relative group">
                            <div className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                              imageData.isMain ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                            }`}>
                              <img
                                src={imageData.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Controls overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                              {/* Top controls */}
                              <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                                {/* Main image toggle */}
                                <button
                                  onClick={() => setMainImage(index)}
                                  className={`p-1.5 rounded-full transition-all ${
                                    imageData.isMain 
                                      ? 'bg-yellow-500 text-white shadow-lg' 
                                      : 'bg-white/20 text-white hover:bg-yellow-500 hover:text-white'
                                  }`}
                                  title={imageData.isMain ? "Ana görsel" : "Ana görsel yap"}
                                >
                                  <Crown className="h-3 w-3" />
                                </button>

                                {/* Delete button */}
                                <button
                                  onClick={() => removeImage(index)}
                                  className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                  title="Sil"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              
                              {/* Bottom info */}
                              <div className="absolute bottom-2 left-2 right-2 text-white">
                                <div className="text-xs">
                                  <p className="font-medium truncate">{imageData.file.name}</p>
                                  <p className="text-white/80">{formatFileSize(imageData.file.size)}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Main image indicator */}
                            {imageData.isMain && (
                              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1 shadow-lg z-10">
                                <Crown className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Add more placeholder */}
                        {uploadedImages.length < maxFiles && (
                          <label className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted transition-colors">
                            <input
                              type="file"
                              multiple
                              accept={allowedImageTypes.join(',')}
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">Daha Fazla</span>
                          </label>
                        )}
                      </div>
                      
                      {/* Main image info */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                        <p className="text-sm text-yellow-700">
                          <Crown className="h-4 w-4 inline mr-1" />
                          <strong>Ana Görsel:</strong> {uploadedImages.find(img => img.isMain)?.file.name || 'Seçilmedi'}
                          <br />
                          💡 Ana görseli değiştirmek için resmin üstündeki taç iconuna tıklayın.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">SEO Optimizasyonu</h3>
                
                <div className="space-y-6">
                  {/* SEO Skor */}
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-foreground">SEO Skoru</h4>
                      <span className={`text-2xl font-bold ${getSeoScoreColor(getSeoScore())}`}>
                        {getSeoScore()}/100
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          getSeoScore() >= 80 ? 'bg-success' : 
                          getSeoScore() >= 60 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${getSeoScore()}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {getSeoScore() >= 80 ? 'Mükemmel! SEO optimizasyonu harika görünüyor.' :
                       getSeoScore() >= 60 ? 'İyi! Birkaç iyileştirme ile daha da iyi olabilir.' :
                       'SEO optimizasyonu için aşağıdaki önerileri inceleyin.'}
                    </p>
                  </div>

                  {/* SEO Önerileri */}
                  {getSeoRecommendations().length > 0 && (
                    <div className="card border-warning/20 bg-warning/5">
                      <div className="card-header pb-3">
                        <h4 className="card-title text-warning flex items-center gap-2">
                          📋 SEO Önerileri
                        </h4>
                      </div>
                      <div className="card-content">
                        <ul className="space-y-2">
                          {getSeoRecommendations().map((rec, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"></span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Otomatik Öneriler */}
                  {seoSuggestions.title && (
                    <div className="card border-primary/20 bg-primary/5">
                      <div className="card-header pb-3">
                        <h4 className="card-title text-primary flex items-center gap-2">
                          💡 Akıllı SEO Önerileri
                        </h4>
                      </div>
                      <div className="card-content space-y-4">
                        {/* Title Suggestion */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 p-3 bg-background border border-border rounded-lg">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Başlık Önerisi</span>
                            <p className="text-sm text-foreground mt-1">{seoSuggestions.title}</p>
                          </div>
                          <button
                            onClick={() => applySeoSuggestion('title')}
                            className="btn-primary text-xs px-4 py-2 h-fit"
                          >
                            Uygula
                          </button>
                        </div>

                        {/* Description Suggestion */}
                        <div className="flex items-start gap-3">
                          <div className="flex-1 p-3 bg-background border border-border rounded-lg">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Açıklama Önerisi</span>
                            <p className="text-sm text-foreground mt-1 leading-relaxed">{seoSuggestions.description}</p>
                          </div>
                          <button
                            onClick={() => applySeoSuggestion('description')}
                            className="btn-primary text-xs px-4 py-2 h-fit mt-2"
                          >
                            Uygula
                          </button>
                        </div>

                        {/* Keywords Suggestion */}
                        <div className="p-3 bg-background border border-border rounded-lg">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">Önerilen Anahtar Kelimeler</span>
                          <div className="flex flex-wrap gap-1">
                            {seoSuggestions.keywords.map((keyword, index) => (
                              <span key={index} className="badge badge-primary text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* URL Preview */}
                  <div className="card">
                    <div className="card-header pb-3">
                      <h4 className="card-title text-sm">🔗 URL Önizlemesi</h4>
                    </div>
                    <div className="card-content">
                      <div className="p-3 bg-muted/50 rounded-lg border">
                        <code className="text-sm text-primary font-mono break-all">
                          https://myshop.com/urunler/{generateSlug(formData.name)}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* SEO Title */}
                  <div className="form-group">
                    <label className="form-label">
                      SEO Başlık
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      className="form-input"
                      placeholder="Arama motorları için başlık"
                    />
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span className="text-muted-foreground">
                        {formData.seoTitle.length}/60 karakter
                      </span>
                      <div className={`flex items-center gap-1 ${
                        formData.seoTitle.length >= 30 && formData.seoTitle.length <= 60 
                          ? 'text-success' : 'text-warning'
                      }`}>
                        <span className="w-2 h-2 rounded-full ${
                          formData.seoTitle.length >= 30 && formData.seoTitle.length <= 60 
                            ? 'bg-success' : 'bg-warning'
                        }"></span>
                        <span className="font-medium">
                          {formData.seoTitle.length >= 30 && formData.seoTitle.length <= 60 ? 'Optimal' : 
                           formData.seoTitle.length < 30 ? 'Çok kısa' : 'Çok uzun'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SEO Description */}
                  <div className="form-group">
                    <label className="form-label">
                      SEO Açıklama
                    </label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      rows={3}
                      className="form-textarea"
                      placeholder="Arama motorları için açıklama"
                    />
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span className="text-muted-foreground">
                        {formData.seoDescription.length}/160 karakter
                      </span>
                      <div className={`flex items-center gap-1 ${
                        formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160 
                          ? 'text-success' : 'text-warning'
                      }`}>
                        <span className="w-2 h-2 rounded-full ${
                          formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160 
                            ? 'bg-success' : 'bg-warning'
                        }"></span>
                        <span className="font-medium">
                          {formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160 ? 'Optimal' : 
                           formData.seoDescription.length < 120 ? 'Çok kısa' : 'Çok uzun'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SEO Keywords */}
                  <div className="form-group">
                    <label className="form-label">
                      Anahtar Kelimeler
                    </label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                      className="form-input"
                      placeholder="kelime1, kelime2, kelime3"
                    />
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      Virgülle ayırarak yazın. Maksimum 8 kelime önerilir.
                    </p>
                  </div>

                  {/* Google Preview */}
                  <div className="card border-accent/20">
                    <div className="card-header pb-3">
                      <h4 className="card-title flex items-center gap-2">
                        🔍 Google Arama Önizlemesi
                      </h4>
                      <p className="card-description">
                        Ürününüzün Google'da nasıl görüneceğini inceleyin
                      </p>
                    </div>
                    <div className="card-content">
                      <div className="p-4 bg-background border border-border rounded-lg shadow-sm space-y-2">
                        <h3 className="text-lg text-primary hover:underline cursor-pointer font-normal leading-tight">
                          {formData.seoTitle || formData.name || 'Ürün Başlığı'}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-success text-sm font-mono">
                            https://myshop.com/urunler/{generateSlug(formData.name)}
                          </span>
                          <span className="text-muted-foreground text-sm">▼</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {formData.seoDescription || formData.description || 'Ürün açıklaması burada görünecek. SEO açıklamasını doldurarak müşterilerin ürününüzü daha kolay bulmasını sağlayın...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface CategoryFormData {
  name: string
  slug: string
  description: string
  parentId: string
  image: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  status: 'active' | 'inactive'
  sortOrder: number
}

interface ParentCategory {
  id: string
  name: string
}

// Mock parent categories
const parentCategories: ParentCategory[] = [
  { id: '1', name: 'Elektronik' },
  { id: '2', name: 'Giyim' },
  { id: '3', name: 'Ev & Yaşam' },
  { id: '4', name: 'Spor & Outdoor' },
  { id: '5', name: 'Kitap & Müzik' }
]

export default function NewCategoryPage() {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    image: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    status: 'active',
    sortOrder: 0
  })
  
  const [activeTab, setActiveTab] = useState<'general' | 'seo'>('general')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-generate slug from name
    if (field === 'name' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      
      // Simulate upload
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file)
        setImagePreview(imageUrl)
        setFormData(prev => ({ ...prev, image: imageUrl }))
        setIsUploading(false)
      }, 1000)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would submit to your API
  }

  const progress = (
    (formData.name ? 25 : 0) +
    (formData.description ? 25 : 0) +
    (formData.slug ? 25 : 0) +
    (formData.image ? 25 : 0)
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 lg:h-16 items-center gap-4 px-6">
              <Link 
                href="/dashboard/categories" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Kategorilere Dön</span>
              </Link>
              
              <div className="h-6 w-px bg-border"></div>
              
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Yeni Kategori Oluştur</h1>
                <p className="text-sm text-muted-foreground">
                  Yeni bir ürün kategorisi ekleyin
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  className="btn-outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Önizleme
                </button>
                <button 
                  type="submit" 
                  form="category-form"
                  className="btn-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Kategori Oluştur
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Form Content */}
            <div className="flex-1 p-6">
              <form id="category-form" onSubmit={handleSubmit} className="max-w-4xl">
                {/* Tabs */}
                <div className="flex space-x-1 p-1 bg-muted rounded-lg w-fit mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('general')}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                      activeTab === 'general'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Genel Bilgiler
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('seo')}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                      activeTab === 'seo'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    SEO Ayarları
                  </button>
                </div>

                {/* General Tab */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Temel Bilgiler</h3>
                        <p className="card-description">
                          Kategorinizin temel bilgilerini girin
                        </p>
                      </div>
                      <div className="card-content space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Kategori Adı *</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="form-input"
                              placeholder="Kategori adını girin"
                              required
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">URL Slug</label>
                            <input
                              type="text"
                              value={formData.slug}
                              onChange={(e) => handleInputChange('slug', e.target.value)}
                              className="form-input"
                              placeholder="url-slug"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              URL: /kategoriler/{formData.slug || 'kategori-adi'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Açıklama</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="form-textarea"
                            placeholder="Kategori açıklamasını girin..."
                            rows={3}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="form-group">
                            <label className="form-label">Ana Kategori</label>
                            <select
                              value={formData.parentId}
                              onChange={(e) => handleInputChange('parentId', e.target.value)}
                              className="form-input"
                            >
                              <option value="">Ana Kategori Seç</option>
                              {parentCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Durum</label>
                            <select
                              value={formData.status}
                              onChange={(e) => handleInputChange('status', e.target.value)}
                              className="form-input"
                            >
                              <option value="active">Aktif</option>
                              <option value="inactive">Pasif</option>
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Sıralama</label>
                            <input
                              type="number"
                              value={formData.sortOrder}
                              onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                              className="form-input"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Kategori Görseli</h3>
                        <p className="card-description">
                          Kategorinizi temsil eden bir görsel yükleyin
                        </p>
                      </div>
                      <div className="card-content">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Category preview"
                              className="w-32 h-32 object-cover rounded-lg border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview('')
                                setFormData(prev => ({ ...prev, image: '' }))
                              }}
                              className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={isUploading}
                            />
                            {isUploading ? (
                              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                            ) : (
                              <>
                                <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground text-center">Görsel Yükle</span>
                              </>
                            )}
                          </label>
                        )}
                        
                        <div className="mt-4 text-xs text-muted-foreground space-y-1">
                          <p>• Desteklenen formatlar: JPG, PNG, WebP</p>
                          <p>• Maksimum boyut: 2MB</p>
                          <p>• Önerilen boyutlar: 400x400px</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">SEO Optimizasyonu</h3>
                        <p className="card-description">
                          Arama motoru optimizasyonu için gerekli bilgileri girin
                        </p>
                      </div>
                      <div className="card-content space-y-4">
                        <div className="form-group">
                          <label className="form-label">SEO Başlık</label>
                          <input
                            type="text"
                            value={formData.seoTitle}
                            onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                            className="form-input"
                            placeholder="Arama motorları için başlık"
                          />
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-muted-foreground">
                              {formData.seoTitle.length}/60 karakter
                            </span>
                            <span className={`${
                              formData.seoTitle.length >= 30 && formData.seoTitle.length <= 60 
                                ? 'text-success' : 'text-warning'
                            }`}>
                              {formData.seoTitle.length >= 30 && formData.seoTitle.length <= 60 ? '✓ Optimal' : 
                               formData.seoTitle.length < 30 ? 'Çok kısa' : 'Çok uzun'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">SEO Açıklama</label>
                          <textarea
                            value={formData.seoDescription}
                            onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                            className="form-textarea"
                            placeholder="Arama motorları için açıklama"
                            rows={3}
                          />
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-muted-foreground">
                              {formData.seoDescription.length}/160 karakter
                            </span>
                            <span className={`${
                              formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160 
                                ? 'text-success' : 'text-warning'
                            }`}>
                              {formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160 ? '✓ Optimal' : 
                               formData.seoDescription.length < 120 ? 'Çok kısa' : 'Çok uzun'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Anahtar Kelimeler</label>
                          <input
                            type="text"
                            value={formData.seoKeywords}
                            onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                            className="form-input"
                            placeholder="kelime1, kelime2, kelime3"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Virgülle ayırarak yazın. Maksimum 8 kelime önerilir.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SEO Preview */}
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Google Arama Önizlemesi</h3>
                      </div>
                      <div className="card-content">
                        <div className="p-4 bg-background border border-border rounded-lg space-y-2">
                          <h3 className="text-lg text-primary hover:underline cursor-pointer">
                            {formData.seoTitle || formData.name || 'Kategori Başlığı'}
                          </h3>
                          <p className="text-success text-sm">
                            https://myshop.com/kategoriler/{formData.slug || 'kategori-adi'}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {formData.seoDescription || formData.description || 'Kategori açıklaması burada görünecek...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l border-border p-6 bg-muted/30">
              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Tamamlanma</h4>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {progress === 100 ? 'Kategori oluşturmaya hazır!' : 'Devam eden işlem...'}
                  </p>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Hızlı İşlemler</h4>
                  <div className="space-y-2">
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('general')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        activeTab === 'general' 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-accent'
                      }`}
                    >
                      📝 Genel Bilgiler
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('seo')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        activeTab === 'seo' 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-accent'
                      }`}
                    >
                      🔍 SEO Ayarları
                    </button>
                  </div>
                </div>

                {/* Tips */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">💡 İpuçları</h4>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Kategori adını kısa ve açık tutun</li>
                    <li>• SEO için anahtar kelimeler kullanın</li>
                    <li>• Kategoriler arası hiyerarşi oluşturun</li>
                    <li>• Görsel, kategoriyi temsil etmeli</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

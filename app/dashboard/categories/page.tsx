'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal, Filter, Download } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId: string | null
  parentName?: string
  productCount: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// Mock data - gerçek uygulamada API'den gelecek
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Elektronik',
    slug: 'elektronik',
    description: 'Elektronik ürünlerin kategorisi',
    image: '/placeholder-category.jpg',
    parentId: null,
    productCount: 145,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20'
  },
  {
    id: '2',
    name: 'Telefon & Aksesuar',
    slug: 'telefon-aksesuar',
    description: 'Akıllı telefonlar ve aksesuarları',
    image: '/placeholder-category.jpg',
    parentId: '1',
    parentName: 'Elektronik',
    productCount: 89,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-18'
  },
  {
    id: '3',
    name: 'Bilgisayar',
    slug: 'bilgisayar',
    description: 'Masaüstü ve dizüstü bilgisayarlar',
    image: '/placeholder-category.jpg',
    parentId: '1',
    parentName: 'Elektronik',
    productCount: 56,
    status: 'active',
    createdAt: '2024-01-16',
    updatedAt: '2024-02-19'
  },
  {
    id: '4',
    name: 'Giyim',
    slug: 'giyim',
    description: 'Kadın, erkek ve çocuk giyim',
    image: '/placeholder-category.jpg',
    parentId: null,
    productCount: 234,
    status: 'active',
    createdAt: '2024-01-17',
    updatedAt: '2024-02-21'
  },
  {
    id: '5',
    name: 'Kadın Giyim',
    slug: 'kadin-giyim',
    description: 'Kadın giyim ürünleri',
    image: '/placeholder-category.jpg',
    parentId: '4',
    parentName: 'Giyim',
    productCount: 156,
    status: 'active',
    createdAt: '2024-01-17',
    updatedAt: '2024-02-20'
  },
  {
    id: '6',
    name: 'Ev & Yaşam',
    slug: 'ev-yasam',
    description: 'Ev dekorasyonu ve yaşam ürünleri',
    image: '/placeholder-category.jpg',
    parentId: null,
    productCount: 78,
    status: 'inactive',
    createdAt: '2024-01-18',
    updatedAt: '2024-02-15'
  }
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showActions, setShowActions] = useState<string | null>(null)

  // Filtreleme
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Kategori silme
  const handleDelete = (categoryId: string) => {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId))
    }
  }

  // Durum değiştirme
  const toggleStatus = (categoryId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
        : cat
    ))
  }

  // Toplu seçim
  const handleSelectAll = (checked: boolean) => {
    setSelectedCategories(checked ? filteredCategories.map(cat => cat.id) : [])
  }

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kategoriler</h1>
          <p className="text-muted-foreground">
            Ürün kategorilerinizi yönetin ve düzenleyin
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </button>
          <Link href="/dashboard/categories/new" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kategori
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          {/* Search */}
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Kategori ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-9"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="form-input w-40"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Toplam {filteredCategories.length} kategori</span>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-accent/50 border border-accent rounded-lg">
          <span className="text-sm font-medium">
            {selectedCategories.length} kategori seçildi
          </span>
          <div className="flex gap-2">
            <button className="btn-outline text-xs px-3 py-1">
              Aktif Yap
            </button>
            <button className="btn-outline text-xs px-3 py-1">
              Pasif Yap
            </button>
            <button className="btn-outline text-destructive border-destructive text-xs px-3 py-1">
              Sil
            </button>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="card">
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-input"
                  />
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">Kategori</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ana Kategori</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ürün Sayısı</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Durum</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Oluşturma</th>
                <th className="text-right p-4 font-medium text-muted-foreground w-20">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                      className="rounded border-input"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling!.style.display = 'flex'
                          }}
                        />
                        <div className="hidden w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          IMG
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{category.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {category.description}
                        </p>
                        <code className="text-xs text-muted-foreground font-mono">
                          /{category.slug}
                        </code>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {category.parentName ? (
                      <span className="badge badge-secondary">
                        {category.parentName}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">Ana Kategori</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{category.productCount}</span>
                    <span className="text-muted-foreground text-sm ml-1">ürün</span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(category.id)}
                      className={`badge ${
                        category.status === 'active' 
                          ? 'badge-success' 
                          : 'badge-warning'
                      } cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      {category.status === 'active' ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(category.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="p-4">
                    <div className="relative flex justify-end">
                      <button
                        onClick={() => setShowActions(showActions === category.id ? null : category.id)}
                        className="p-1 hover:bg-accent rounded transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      
                      {showActions === category.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <Link
                              href={`/dashboard/categories/${category.id}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              Detayları Görüntüle
                            </Link>
                            <Link
                              href={`/dashboard/categories/${category.id}/edit`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                              Düzenle
                            </Link>
                            <button
                              onClick={() => {
                                toggleStatus(category.id)
                                setShowActions(null)
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors w-full text-left"
                            >
                              {category.status === 'active' ? 'Pasif Yap' : 'Aktif Yap'}
                            </button>
                            <div className="border-t border-border my-1"></div>
                            <button
                              onClick={() => {
                                handleDelete(category.id)
                                setShowActions(null)
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                            >
                              <Trash2 className="h-4 w-4" />
                              Sil
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Kategori bulunamadı</p>
              <Link href="/dashboard/categories/new" className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                İlk Kategorinizi Oluşturun
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close actions menu */}
      {showActions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowActions(null)}
        />
      )}
    </div>
  )
}

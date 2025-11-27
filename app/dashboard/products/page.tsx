import { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ürünler | Dashboard',
  description: 'Ürün yönetimi - ürün listesi, düzenleme ve yeni ürün ekleme',
}

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  image: string
  sku: string
  sales: number
}

const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    category: 'Elektronik',
    price: '₺42,999',
    stock: 45,
    status: 'active',
    image: '/api/placeholder/60/60',
    sku: 'IPH15PRO',
    sales: 234
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    category: 'Elektronik',
    price: '₺38,999',
    stock: 32,
    status: 'active',
    image: '/api/placeholder/60/60',
    sku: 'SGS24',
    sales: 189
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    category: 'Bilgisayar',
    price: '₺54,999',
    stock: 0,
    status: 'out_of_stock',
    image: '/api/placeholder/60/60',
    sku: 'MBAM3',
    sales: 156
  },
  {
    id: '4',
    name: 'AirPods Pro 2',
    category: 'Aksesuar',
    price: '₺8,999',
    stock: 67,
    status: 'active',
    image: '/api/placeholder/60/60',
    sku: 'APP2',
    sales: 312
  },
  {
    id: '5',
    name: 'Vintage Tişört',
    category: 'Giyim',
    price: '₺199',
    stock: 12,
    status: 'inactive',
    image: '/api/placeholder/60/60',
    sku: 'VTS001',
    sales: 45
  }
]

const getStatusBadge = (status: Product['status'], stock: number) => {
  if (status === 'out_of_stock' || stock === 0) {
    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive">Stok Yok</span>
  }
  
  if (status === 'active') {
    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success/10 text-success">Aktif</span>
  }
  
  return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground">Pasif</span>
}

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <p className="text-muted-foreground">
            Mağazanızdaki tüm ürünleri yönetin
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            İçe Aktar
          </button>
          <Link href="/dashboard/products/new" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Toplam Ürün</h3>
          <p className="text-2xl font-bold">456</p>
          <p className="text-xs text-muted-foreground">+12 bu ay</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Aktif Ürün</h3>
          <p className="text-2xl font-bold">398</p>
          <p className="text-xs text-success">87% toplam</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Stok Yok</h3>
          <p className="text-2xl font-bold">23</p>
          <p className="text-xs text-destructive">Acil takip</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Toplam Değer</h3>
          <p className="text-2xl font-bold">₺2.4M</p>
          <p className="text-xs text-muted-foreground">Stok değeri</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Ürün ara..."
                className="w-full pl-8 pr-4 py-2 border border-input rounded-lg bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background hover:bg-accent transition-colors">
              <Filter className="h-4 w-4" />
              Filtrele
            </button>
            <select className="px-3 py-2 border border-input rounded-lg bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Kategori</option>
              <option>Elektronik</option>
              <option>Giyim</option>
              <option>Aksesuar</option>
            </select>
            <select className="px-3 py-2 border border-input rounded-lg bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Durum</option>
              <option>Aktif</option>
              <option>Pasif</option>
              <option>Stok Yok</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Ürün</th>
                <th className="text-left p-4 font-medium">SKU</th>
                <th className="text-left p-4 font-medium">Kategori</th>
                <th className="text-left p-4 font-medium">Fiyat</th>
                <th className="text-left p-4 font-medium">Stok</th>
                <th className="text-left p-4 font-medium">Satış</th>
                <th className="text-left p-4 font-medium">Durum</th>
                <th className="text-left p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden flex items-center justify-center">
                        <span className="text-xs font-medium">{product.name.substring(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{product.sku}</code>
                  </td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4 font-medium">{product.price}</td>
                  <td className="p-4">
                    <span className={`text-sm ${
                      product.stock > 20 ? 'text-success' : 
                      product.stock > 5 ? 'text-warning' : 'text-destructive'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{product.sales}</td>
                  <td className="p-4">
                    {getStatusBadge(product.status, product.stock)}
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            5 üründen 1-5 arası gösteriliyor
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors disabled:opacity-50" disabled>
              Önceki
            </button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded">
              1
            </button>
            <button className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors">
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Metadata } from 'next'
import { UserPlus, Search, Filter, Mail, MoreHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Müşteriler | Dashboard',
  description: 'Müşteri yönetimi - müşteri listesi ve detayları',
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: string
  lastOrder: string
  status: 'active' | 'inactive'
  registrationDate: string
  location: string
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 532 123 4567',
    totalOrders: 15,
    totalSpent: '₺12,450',
    lastOrder: '2024-11-26',
    status: 'active',
    registrationDate: '2024-01-15',
    location: 'İstanbul, Türkiye'
  },
  {
    id: '2',
    name: 'Ayşe Kaya',
    email: 'ayse@example.com',
    phone: '+90 533 987 6543',
    totalOrders: 8,
    totalSpent: '₺4,280',
    lastOrder: '2024-11-25',
    status: 'active',
    registrationDate: '2024-03-22',
    location: 'Ankara, Türkiye'
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    phone: '+90 534 456 7890',
    totalOrders: 22,
    totalSpent: '₺18,990',
    lastOrder: '2024-11-24',
    status: 'active',
    registrationDate: '2023-11-10',
    location: 'İzmir, Türkiye'
  },
  {
    id: '4',
    name: 'Fatma Özkan',
    email: 'fatma@example.com',
    phone: '+90 535 321 0987',
    totalOrders: 3,
    totalSpent: '₺1,250',
    lastOrder: '2024-10-15',
    status: 'inactive',
    registrationDate: '2024-08-05',
    location: 'Antalya, Türkiye'
  },
  {
    id: '5',
    name: 'Ali Çelik',
    email: 'ali@example.com',
    phone: '+90 536 654 3210',
    totalOrders: 12,
    totalSpent: '₺8,750',
    lastOrder: '2024-11-20',
    status: 'active',
    registrationDate: '2024-02-28',
    location: 'Bursa, Türkiye'
  }
]

const getStatusBadge = (status: Customer['status']) => {
  if (status === 'active') {
    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success/10 text-success">Aktif</span>
  }
  return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground">Pasif</span>
}

export default function CustomersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Müşteriler</h1>
          <p className="text-muted-foreground">
            Tüm müşterilerinizi görüntüle ve yönet
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Mail className="h-4 w-4 mr-2" />
            Toplu Mail
          </button>
          <button className="btn-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            Müşteri Ekle
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Toplam Müşteri</h3>
          <p className="text-2xl font-bold">892</p>
          <p className="text-xs text-muted-foreground">+45 bu ay</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Aktif Müşteri</h3>
          <p className="text-2xl font-bold">756</p>
          <p className="text-xs text-success">%84.8 toplam</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Yeni Kayıt</h3>
          <p className="text-2xl font-bold">23</p>
          <p className="text-xs text-muted-foreground">Bu hafta</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Ortalama Sepet</h3>
          <p className="text-2xl font-bold">₺485</p>
          <p className="text-xs text-muted-foreground">Müşteri başına</p>
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
                placeholder="Müşteri ara..."
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
              <option>Tüm Durumlar</option>
              <option>Aktif</option>
              <option>Pasif</option>
            </select>
            <select className="px-3 py-2 border border-input rounded-lg bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Tüm Lokasyonlar</option>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
              <option>Antalya</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Müşteri</th>
                <th className="text-left p-4 font-medium">İletişim</th>
                <th className="text-left p-4 font-medium">Sipariş Sayısı</th>
                <th className="text-left p-4 font-medium">Toplam Harcama</th>
                <th className="text-left p-4 font-medium">Son Sipariş</th>
                <th className="text-left p-4 font-medium">Durum</th>
                <th className="text-left p-4 font-medium">Kayıt Tarihi</th>
                <th className="text-left p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm">{customer.email}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{customer.totalOrders}</td>
                  <td className="p-4 font-medium">{customer.totalSpent}</td>
                  <td className="p-4 text-sm">{customer.lastOrder}</td>
                  <td className="p-4">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="p-4 text-sm">{customer.registrationDate}</td>
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
            5 müşteriden 1-5 arası gösteriliyor
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
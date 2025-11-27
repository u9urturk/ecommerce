import { Metadata } from 'next'
import { Search, Filter, Download, Eye, MoreHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Siparişler | Dashboard',
  description: 'Sipariş yönetimi - tüm siparişleri görüntüle ve yönet',
}

interface Order {
  id: string
  customer: string
  email: string
  items: number
  amount: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  date: string
  shippingAddress: string
  paymentMethod: string
}

const orders: Order[] = [
  {
    id: '#12345',
    customer: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    items: 3,
    amount: '₺1,250',
    status: 'pending',
    date: '2024-11-26 14:30',
    shippingAddress: 'İstanbul, Türkiye',
    paymentMethod: 'Kredi Kartı'
  },
  {
    id: '#12344',
    customer: 'Ayşe Kaya',
    email: 'ayse@example.com',
    items: 1,
    amount: '₺890',
    status: 'processing',
    date: '2024-11-26 12:15',
    shippingAddress: 'Ankara, Türkiye',
    paymentMethod: 'Banka Kartı'
  },
  {
    id: '#12343',
    customer: 'Mehmet Demir',
    email: 'mehmet@example.com',
    items: 2,
    amount: '₺2,100',
    status: 'shipped',
    date: '2024-11-25 18:45',
    shippingAddress: 'İzmir, Türkiye',
    paymentMethod: 'PayPal'
  },
  {
    id: '#12342',
    customer: 'Fatma Özkan',
    email: 'fatma@example.com',
    items: 4,
    amount: '₺675',
    status: 'delivered',
    date: '2024-11-25 09:20',
    shippingAddress: 'Antalya, Türkiye',
    paymentMethod: 'Kredi Kartı'
  },
  {
    id: '#12341',
    customer: 'Ali Çelik',
    email: 'ali@example.com',
    items: 1,
    amount: '₺1,450',
    status: 'cancelled',
    date: '2024-11-24 16:00',
    shippingAddress: 'Bursa, Türkiye',
    paymentMethod: 'Banka Kartı'
  },
  {
    id: '#12340',
    customer: 'Zeynep Yurt',
    email: 'zeynep@example.com',
    items: 2,
    amount: '₺320',
    status: 'refunded',
    date: '2024-11-24 11:30',
    shippingAddress: 'Adana, Türkiye',
    paymentMethod: 'Kredi Kartı'
  }
]

const getStatusBadge = (status: Order['status']) => {
  const styles = {
    pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Bekliyor' },
    processing: { bg: 'bg-primary/10', text: 'text-primary', label: 'İşleniyor' },
    shipped: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'Kargoda' },
    delivered: { bg: 'bg-success/10', text: 'text-success', label: 'Teslim Edildi' },
    cancelled: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'İptal' },
    refunded: { bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'İade' }
  }

  const style = styles[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}

export default function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Siparişler</h1>
          <p className="text-muted-foreground">
            Tüm siparişleri görüntüle ve yönet
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Toplam Sipariş</h3>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-muted-foreground">Bu ay</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Bekleyen</h3>
          <p className="text-2xl font-bold">45</p>
          <p className="text-xs text-warning">İşlem bekliyor</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">İşleniyor</h3>
          <p className="text-2xl font-bold">89</p>
          <p className="text-xs text-primary">Hazırlanıyor</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Teslim Edildi</h3>
          <p className="text-2xl font-bold">1,045</p>
          <p className="text-xs text-success">%84.7 başarı</p>
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
                placeholder="Sipariş ID veya müşteri ara..."
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
              <option>Bekliyor</option>
              <option>İşleniyor</option>
              <option>Kargoda</option>
              <option>Teslim Edildi</option>
              <option>İptal</option>
              <option>İade</option>
            </select>
            <select className="px-3 py-2 border border-input rounded-lg bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Son 30 Gün</option>
              <option>Bu Hafta</option>
              <option>Bu Ay</option>
              <option>Son 3 Ay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Sipariş ID</th>
                <th className="text-left p-4 font-medium">Müşteri</th>
                <th className="text-left p-4 font-medium">Ürün Sayısı</th>
                <th className="text-left p-4 font-medium">Tutar</th>
                <th className="text-left p-4 font-medium">Durum</th>
                <th className="text-left p-4 font-medium">Tarih</th>
                <th className="text-left p-4 font-medium">Ödeme</th>
                <th className="text-left p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                      {order.id}
                    </code>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{order.items} ürün</td>
                  <td className="p-4 font-medium">{order.amount}</td>
                  <td className="p-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm">{order.date.split(' ')[0]}</p>
                      <p className="text-xs text-muted-foreground">{order.date.split(' ')[1]}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{order.paymentMethod}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors" title="Detayları Görüntüle">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors" title="Daha Fazla İşlem">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            6 siparişten 1-6 arası gösteriliyor
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
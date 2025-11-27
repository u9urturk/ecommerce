import { ShoppingCart, Eye, Clock } from 'lucide-react'

interface Order {
  id: string
  customer: string
  email: string
  amount: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

const orders: Order[] = [
  {
    id: '#12345',
    customer: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    amount: '₺1,250',
    status: 'pending',
    date: '2024-11-26'
  },
  {
    id: '#12344',
    customer: 'Ayşe Kaya',
    email: 'ayse@example.com',
    amount: '₺890',
    status: 'processing',
    date: '2024-11-26'
  },
  {
    id: '#12343',
    customer: 'Mehmet Demir',
    email: 'mehmet@example.com',
    amount: '₺2,100',
    status: 'shipped',
    date: '2024-11-25'
  },
  {
    id: '#12342',
    customer: 'Fatma Özkan',
    email: 'fatma@example.com',
    amount: '₺675',
    status: 'delivered',
    date: '2024-11-25'
  },
  {
    id: '#12341',
    customer: 'Ali Çelik',
    email: 'ali@example.com',
    amount: '₺1,450',
    status: 'cancelled',
    date: '2024-11-24'
  }
]

const getStatusBadge = (status: Order['status']) => {
  const styles = {
    pending: 'bg-warning/10 text-warning',
    processing: 'bg-primary/10 text-primary',
    shipped: 'bg-blue-500/10 text-blue-500',
    delivered: 'bg-success/10 text-success',
    cancelled: 'bg-destructive/10 text-destructive'
  }

  const labels = {
    pending: 'Bekliyor',
    processing: 'İşleniyor',
    shipped: 'Kargoda',
    delivered: 'Teslim Edildi',
    cancelled: 'İptal'
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function RecentOrders() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Son Siparişler</h3>
        <div className="flex items-center gap-2">
          <button className="text-sm text-muted-foreground hover:text-primary">
            Tümünü Gör
          </button>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{order.customer}</p>
                <p className="text-xs text-muted-foreground">{order.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium text-sm">{order.amount}</p>
                <p className="text-xs text-muted-foreground">{order.id}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full btn-secondary">
          Tüm Siparişleri Görüntüle
        </button>
      </div>
    </div>
  )
}
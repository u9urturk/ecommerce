import { Metadata } from 'next'
import Link from 'next/link'
import { Package, Users, ShoppingCart, TrendingUp, DollarSign, Eye } from 'lucide-react'
import StatsCard from '../../components/dashboard/stats-card'
import RecentOrders from '../../components/dashboard/recent-orders'
import SalesChart from '../../components/dashboard/sales-chart'
import TopProducts from '../../components/dashboard/top-products'

export const metadata: Metadata = {
  title: 'Dashboard | E-Commerce Admin',
  description: 'E-ticaret yönetim paneli - satışlar, siparişler ve ürün yönetimi',
}

export default function DashboardPage() {
  // Mock data - gerçek uygulamada API'den gelecek
  const stats = [
    {
      title: 'Toplam Satış',
      value: '₺124,350',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      description: 'Bu ay'
    },
    {
      title: 'Siparişler',
      value: '1,234',
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingCart,
      description: 'Bu ay'
    },
    {
      title: 'Müşteriler',
      value: '892',
      change: '+18.7%',
      trend: 'up' as const,
      icon: Users,
      description: 'Aktif müşteri'
    },
    {
      title: 'Ürünler',
      value: '456',
      change: '+4.1%',
      trend: 'up' as const,
      icon: Package,
      description: 'Stokta'
    },
    {
      title: 'Sayfa Görüntüleme',
      value: '45,210',
      change: '+22.3%',
      trend: 'up' as const,
      icon: Eye,
      description: 'Bu ay'
    },
    {
      title: 'Dönüşüm Oranı',
      value: '%3.2',
      change: '+0.8%',
      trend: 'up' as const,
      icon: TrendingUp,
      description: 'Bu ay'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Hoş geldiniz! E-ticaret mağazanızın genel durumu
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 transition-colors">
            Rapor İndir
          </button>
          <Link href="/dashboard/products/new" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors">
            Yeni Ürün Ekle
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        
        {/* Recent Orders */}
        <div>
          <RecentOrders />
        </div>
        
        {/* Top Products */}
        <div>
          <TopProducts />
        </div>
      </div>
    </div>
  )
}
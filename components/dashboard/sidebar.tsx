'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Store,
  Tag,
  Truck,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  title: string
  href?: string
  icon: any
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Ürünler',
    icon: Package,
    children: [
      { title: 'Tüm Ürünler', href: '/dashboard/products', icon: Package },
      { title: 'Yeni Ürün Ekle', href: '/dashboard/products/new', icon: Package },
      { title: 'Kategoriler', href: '/dashboard/categories', icon: Tag },
      { title: 'Stok Yönetimi', href: '/dashboard/inventory', icon: Package }
    ]
  },
  {
    title: 'Siparişler',
    icon: ShoppingCart,
    children: [
      { title: 'Tüm Siparişler', href: '/dashboard/orders', icon: ShoppingCart },
      { title: 'Bekleyen Siparişler', href: '/dashboard/orders/pending', icon: ShoppingCart },
      { title: 'Kargo Takip', href: '/dashboard/shipping', icon: Truck }
    ]
  },
  {
    title: 'Müşteriler',
    href: '/dashboard/customers',
    icon: Users
  },
  {
    title: 'Analitik',
    icon: BarChart3,
    children: [
      { title: 'Satış Raporları', href: '/dashboard/analytics/sales', icon: BarChart3 },
      { title: 'Müşteri Analizi', href: '/dashboard/analytics/customers', icon: Users },
      { title: 'Ürün Performansı', href: '/dashboard/analytics/products', icon: Package }
    ]
  },
  {
    title: 'Mağaza',
    icon: Store,
    children: [
      { title: 'Mağaza Ayarları', href: '/dashboard/store/settings', icon: Store },
      { title: 'Tema & Tasarım', href: '/dashboard/store/theme', icon: Store },
      { title: 'Ödeme Yöntemleri', href: '/dashboard/store/payments', icon: Store }
    ]
  },
  {
    title: 'İletişim',
    icon: MessageSquare,
    children: [
      { title: 'Müşteri Mesajları', href: '/dashboard/messages', icon: MessageSquare },
      { title: 'Yorumlar & Değerlendirmeler', href: '/dashboard/reviews', icon: MessageSquare }
    ]
  },
  {
    title: 'Raporlar',
    href: '/dashboard/reports',
    icon: FileText
  },
  {
    title: 'Ayarlar',
    href: '/dashboard/settings',
    icon: Settings
  }
]

interface NavItemComponentProps {
  item: NavItem
  pathname: string
  level?: number
}

function NavItemComponent({ item, pathname, level = 0 }: NavItemComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href === pathname
  const isParentActive = item.children?.some(child => child.href === pathname)

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="w-full">
      {item.href && !hasChildren ? (
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
            isActive ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground',
            level > 0 && 'ml-4 pl-7'
          )}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{item.title}</span>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
            (isActive || isParentActive) ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground',
            level > 0 && 'ml-4 pl-7'
          )}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-left truncate">{item.title}</span>
          {hasChildren && (
            <div className="ml-auto flex-shrink-0">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform" />
              )}
            </div>
          )}
        </button>
      )}

      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavItemComponent
              key={child.title}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col">
      {/* Logo */}
      <div className="flex h-14 lg:h-[60px] items-center border-b border-border px-4 lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold hover:opacity-80 transition-opacity">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">E-Commerce</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 lg:px-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavItemComponent
                key={item.title}
                item={item}
                pathname={pathname}
              />
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Store className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Admin Panel</p>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
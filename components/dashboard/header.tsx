'use client'

import { useState } from 'react'
import { 
  Search, 
  Bell, 
  User, 
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react'
import { cn } from '../../lib/utils'

export default function DashboardHeader() {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Yeni sipariş',
      message: '#12345 numaralı sipariş alındı',
      time: '2 dk önce',
      unread: true
    },
    {
      id: 2,
      title: 'Stok uyarısı',
      message: 'iPhone 15 Pro stokta azalıyor',
      time: '5 dk önce',
      unread: true
    },
    {
      id: 3,
      title: 'Ödeme onaylandı',
      message: '#12340 siparişi için ödeme alındı',
      time: '10 dk önce',
      unread: false
    }
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-1 hover:bg-accent rounded-md transition-colors"
        onClick={() => setShowMobileNav(!showMobileNav)}
      >
        {showMobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Search */}
      <div className="w-full flex-1 max-w-md">
        <form>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Ürün, sipariş veya müşteri ara..."
              className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </form>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 border border-transparent hover:border-border/50"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Tema değiştir</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 relative border border-transparent hover:border-border/50"
          >
            <Bell className="h-4 w-4" />
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium animate-pulse">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
            <span className="sr-only">Bildirimler</span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-md bg-popover border border-border shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Bildirimler</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-4 border-b border-border hover:bg-accent/50 transition-colors',
                      notification.unread && 'bg-accent/20'
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        {notification.time}
                      </span>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <button className="text-sm text-primary hover:underline">
                  Tüm bildirimleri görüntüle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@ecommerce.com</p>
            </div>
          </button>

          {/* User menu dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-md bg-popover border border-border shadow-lg z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm">
                  <p className="font-medium">Admin</p>
                  <p className="text-muted-foreground">admin@ecommerce.com</p>
                </div>
                <div className="border-t border-border my-1"></div>
                <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                  <User className="h-4 w-4" />
                  Profil
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Settings className="h-4 w-4" />
                  Ayarlar
                </button>
                <div className="border-t border-border my-1"></div>
                <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {showMobileNav && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden">
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            {/* Mobile navigation content would go here */}
            <div className="p-4">
              <h2 className="font-semibold mb-4">Navigation</h2>
              {/* Navigation items would be rendered here */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
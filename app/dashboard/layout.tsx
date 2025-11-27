import { ReactNode } from 'react'
import DashboardSidebar from '../../components/dashboard/sidebar'
import DashboardHeader from '../../components/dashboard/header'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 min-h-screen bg-card border-r border-border shadow-sm">
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <DashboardHeader />
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-background">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
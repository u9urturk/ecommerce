'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp } from 'lucide-react'

const salesData = [
  { month: 'Oca', sales: 45000, orders: 120 },
  { month: 'Şub', sales: 52000, orders: 145 },
  { month: 'Mar', sales: 48000, orders: 132 },
  { month: 'Nis', sales: 61000, orders: 167 },
  { month: 'May', sales: 55000, orders: 156 },
  { month: 'Haz', sales: 67000, orders: 189 },
  { month: 'Tem', sales: 71000, orders: 203 },
  { month: 'Ağu', sales: 69000, orders: 198 },
  { month: 'Eyl', sales: 76000, orders: 218 },
  { month: 'Eki', sales: 82000, orders: 234 },
  { month: 'Kas', sales: 89000, orders: 256 },
  { month: 'Ara', sales: 95000, orders: 278 }
]

export default function SalesChart() {
  const [activeTab, setActiveTab] = useState<'sales' | 'orders'>('sales')
  
  const maxValue = Math.max(...salesData.map(d => activeTab === 'sales' ? d.sales : d.orders))
  
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Satış Analizi</h3>
          <p className="text-sm text-muted-foreground">2024 yılı performansı</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary rounded-lg p-1">
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'sales' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Satış (₺)
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sipariş
            </button>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 flex items-end justify-between gap-2 mb-6">
        {salesData.map((data, index) => {
          const value = activeTab === 'sales' ? data.sales : data.orders
          const height = (value / maxValue) * 100
          
          return (
            <div key={data.month} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/30 transition-colors relative group"
                style={{ height: `${height}%` }}
              >
                <div
                  className="w-full bg-primary rounded-t-sm transition-all duration-300"
                  style={{ height: '100%' }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {activeTab === 'sales' 
                      ? `₺${value.toLocaleString()}` 
                      : `${value} sipariş`
                    }
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                {data.month}
              </p>
            </div>
          )
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {activeTab === 'sales' 
              ? `₺${salesData.reduce((acc, curr) => acc + curr.sales, 0).toLocaleString()}` 
              : salesData.reduce((acc, curr) => acc + curr.orders, 0).toLocaleString()
            }
          </p>
          <p className="text-xs text-muted-foreground">
            {activeTab === 'sales' ? 'Toplam Satış' : 'Toplam Sipariş'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">+23.8%</p>
          <p className="text-xs text-muted-foreground">Önceki Yıla Göre</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="h-4 w-4 text-success" />
            <p className="text-2xl font-bold text-success">↗</p>
          </div>
          <p className="text-xs text-muted-foreground">Trend</p>
        </div>
      </div>
    </div>
  )
}
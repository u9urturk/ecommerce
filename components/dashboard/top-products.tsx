import { Package, Star, TrendingUp } from 'lucide-react'

interface Product {
  id: string
  name: string
  image: string
  sales: number
  revenue: string
  stock: number
  rating: number
  category: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    image: '/api/placeholder/60/60',
    sales: 234,
    revenue: '₺187,200',
    stock: 45,
    rating: 4.8,
    category: 'Elektronik'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    image: '/api/placeholder/60/60',
    sales: 189,
    revenue: '₺151,200',
    stock: 32,
    rating: 4.6,
    category: 'Elektronik'
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    image: '/api/placeholder/60/60',
    sales: 156,
    revenue: '₺234,000',
    stock: 23,
    rating: 4.9,
    category: 'Bilgisayar'
  },
  {
    id: '4',
    name: 'AirPods Pro 2',
    image: '/api/placeholder/60/60',
    sales: 312,
    revenue: '₺93,600',
    stock: 67,
    rating: 4.7,
    category: 'Aksesuar'
  },
  {
    id: '5',
    name: 'Nike Air Max',
    image: '/api/placeholder/60/60',
    sales: 98,
    revenue: '₺49,000',
    stock: 89,
    rating: 4.5,
    category: 'Ayakkabı'
  }
]

export default function TopProducts() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">En Çok Satan Ürünler</h3>
        <div className="flex items-center gap-2">
          <button className="text-sm text-muted-foreground hover:text-primary">
            Tümünü Gör
          </button>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            {/* Rank */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {index + 1}
            </div>

            {/* Product Image */}
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{product.name}</h4>
              <p className="text-xs text-muted-foreground">{product.category}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{product.rating}</span>
              </div>
            </div>

            {/* Sales Info */}
            <div className="text-right">
              <p className="font-medium text-sm">{product.revenue}</p>
              <p className="text-xs text-muted-foreground">{product.sales} satış</p>
              <div className={`text-xs mt-1 ${
                product.stock > 50 ? 'text-success' : 
                product.stock > 20 ? 'text-warning' : 'text-destructive'
              }`}>
                {product.stock} stok
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-primary">1,234</p>
            <p className="text-xs text-muted-foreground">Toplam Satış</p>
          </div>
          <div>
            <p className="text-lg font-bold text-success">₺715K</p>
            <p className="text-xs text-muted-foreground">Toplam Gelir</p>
          </div>
        </div>
      </div>
    </div>
  )
}
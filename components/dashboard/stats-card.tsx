import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  description: string
}

export default function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description
}: StatsCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
          </div>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={cn(
          'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
          trend === 'up' 
            ? 'text-success bg-success/10' 
            : 'text-destructive bg-destructive/10'
        )}>
          <span>{change}</span>
          <span className={cn(
            'text-xs font-bold',
            trend === 'up' ? '↗️' : '↘️'
          )}>
            {trend === 'up' ? '↗️' : '↘️'}
          </span>
        </div>
      </div>
    </div>
  )
}
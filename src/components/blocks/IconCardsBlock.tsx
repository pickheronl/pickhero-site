import {
  Target,
  Zap,
  Heart,
  Users,
  Shield,
  Clock,
  Check,
  Star,
  Truck,
  Package,
  BarChart,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import type { Page } from '@/payload-types'
import { parseTitle } from '@/lib/parseTitle'
import { cn } from '@/lib/utils'

type IconCardsBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'iconCards' }
>

interface IconCardsBlockProps {
  block: IconCardsBlockType
}

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  zap: Zap,
  heart: Heart,
  users: Users,
  shield: Shield,
  clock: Clock,
  check: Check,
  star: Star,
  truck: Truck,
  package: Package,
  'bar-chart': BarChart,
  globe: Globe,
}

export default function IconCardsBlock({ block }: IconCardsBlockProps) {
  const { cards, columns = '2', backgroundColor = 'muted' } = block

  if (!cards || cards.length === 0) return null

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section
      className={cn(
        'py-20 lg:py-32',
        backgroundColor === 'muted' ? 'bg-muted/30' : 'bg-background'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        {(block.title || block.subtitle) && (
          <div className="max-w-4xl mx-auto text-center mb-12">
            {block.title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {parseTitle(block.title)}
              </h2>
            )}
            {block.subtitle && (
              <p className="text-lg text-muted-foreground">{block.subtitle}</p>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className={cn('grid gap-8 max-w-4xl mx-auto', gridCols[columns] || gridCols['2'])}>
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Target

            return (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

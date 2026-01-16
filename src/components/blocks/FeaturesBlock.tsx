import type { Page, Feature } from '@/payload-types'
import * as LucideIcons from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'

type FeaturesBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'features' }>

const iconMap: Record<string, keyof typeof LucideIcons> = {
  Zap: 'Zap',
  Package: 'Package',
  BarChart3: 'BarChart3',
  Smartphone: 'Smartphone',
  RefreshCw: 'RefreshCw',
  Shield: 'Shield',
  Building2: 'Building2',
  Clock: 'Clock',
  ShoppingCart: 'ShoppingCart',
  Hash: 'Hash',
  Briefcase: 'Briefcase',
  Code: 'Code',
  RotateCcw: 'RotateCcw',
  Tag: 'Tag',
  Printer: 'Printer',
}

export default async function FeaturesBlock({ block }: { block: FeaturesBlockType }) {
  let features = block.features as Feature[] | null

  // If no specific features selected, fetch all
  if (!features || features.length === 0) {
    const payload = await getPayload({ config })
    const allFeatures = await payload.find({
      collection: 'features',
      limit: 100,
    })
    features = allFeatures.docs
  }

  if (!features || features.length === 0) return null

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          {block.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              {block.badge}
            </div>
          )}
          {(block.title || block.titleHighlight) && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {block.title}{' '}
              {block.titleHighlight && <span className="text-gradient">{block.titleHighlight}</span>}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{block.subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const iconName = iconMap[feature.icon || 'Zap'] || 'Zap'
            const Icon = LucideIcons[iconName] as React.ComponentType<{ className?: string }>

            return (
              <div
                key={feature.id}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Integration, Media } from '@/payload-types'
import { ShoppingCart, Truck, Package, Code, Building2, MoreHorizontal, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import { parseTitle } from '@/lib/parseTitle'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type IntegrationCategory = 'webshop' | 'shipping' | 'accounting' | 'erp' | 'marketplace' | 'other'

interface IntegrationsGridBlockProps {
  badge?: string | null
  title?: string | null
  subtitle?: string | null
  showFilters?: boolean | null
  ctaText?: string | null
  ctaLink?: string | null
  integrations: Integration[]
}

const categoryInfo: Record<IntegrationCategory, { icon: typeof ShoppingCart; label: string }> = {
  webshop: { icon: ShoppingCart, label: 'Webshops' },
  shipping: { icon: Truck, label: 'Verzending' },
  accounting: { icon: Building2, label: 'Boekhouding' },
  erp: { icon: Package, label: 'ERP' },
  marketplace: { icon: ShoppingCart, label: 'Marketplaces' },
  other: { icon: MoreHorizontal, label: 'Overig' },
}

export default function IntegrationsGridBlock({
  badge,
  title,
  subtitle,
  showFilters = true,
  ctaText,
  ctaLink,
  integrations,
}: IntegrationsGridBlockProps) {
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory | 'all'>('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations =
    activeCategory === 'all'
      ? integrations
      : integrations.filter((i) => i.category === activeCategory)

  // Get unique categories from integrations
  const availableCategories = Array.from(
    new Set(integrations.map((i) => i.category).filter(Boolean))
  ) as IntegrationCategory[]

  const getCategoryIcon = (category: string | null | undefined) => {
    if (!category || !(category in categoryInfo)) return Package
    return categoryInfo[category as IntegrationCategory].icon
  }

  const ctaButton = (
    <Button variant="hero" size="lg">
      {ctaText || 'Start gratis proefperiode'}
    </Button>
  )

  return (
    <>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                {badge}
              </div>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {parseTitle(title)}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{subtitle}</p>
            )}
            {ctaLink ? (
              <Link href={ctaLink}>{ctaButton}</Link>
            ) : (
              <TrialFormDialog>{ctaButton}</TrialFormDialog>
            )}
          </div>

          {/* Category Filter */}
          {showFilters && availableCategories.length > 1 && (
            <div className="py-8 border-b border-border mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant={activeCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setActiveCategory('all')}
                  className="rounded-full"
                >
                  Alle integraties
                </Button>
                {availableCategories.map((category) => {
                  const CategoryIcon = categoryInfo[category]?.icon || Package
                  return (
                    <Button
                      key={category}
                      variant={activeCategory === category ? 'default' : 'outline'}
                      onClick={() => setActiveCategory(category)}
                      className="rounded-full gap-2"
                    >
                      <CategoryIcon className="w-4 h-4" />
                      {categoryInfo[category]?.label || category}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Integrations Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIntegrations.map((integration) => {
              const logo = integration.logo as Media | null
              const CategoryIcon = getCategoryIcon(integration.category)

              return (
                <div
                  key={integration.id}
                  onClick={() => setSelectedIntegration(integration)}
                  className="group p-6 bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-24 flex items-center">
                      {logo?.url ? (
                        <Image
                          src={logo.url}
                          alt={integration.name}
                          width={96}
                          height={48}
                          className="max-h-12 max-w-24 object-contain"
                        />
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center bg-muted rounded-lg">
                          <CategoryIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{integration.name}</h3>
                  {integration.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {integration.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Bekijk details</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* API Section */}
          <div className="mt-16 p-8 bg-gradient-hero rounded-2xl text-center">
            <Code className="w-12 h-12 mx-auto mb-4 text-primary-foreground" />
            <h3 className="text-2xl font-bold text-primary-foreground mb-3">
              Mis je een integratie?
            </h3>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Bouw je eigen koppelingen via onze uitgebreide REST API. Volledige documentatie en
              sandbox omgeving beschikbaar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild>
                <a href="https://docs.pickhero.nl/" target="_blank" rel="noopener noreferrer">
                  API Documentatie
                </a>
              </Button>
              <TrialFormDialog>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Neem contact op
                </Button>
              </TrialFormDialog>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Detail Dialog */}
      <Dialog
        open={!!selectedIntegration}
        onOpenChange={(open) => !open && setSelectedIntegration(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedIntegration && (() => {
            const logo = selectedIntegration.logo as Media | null
            const CategoryIcon = getCategoryIcon(selectedIntegration.category)

            return (
              <>
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-32 flex items-center bg-card rounded-lg p-3 border border-border">
                    {logo?.url ? (
                      <Image
                        src={logo.url}
                        alt={selectedIntegration.name}
                        width={128}
                        height={64}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <CategoryIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-1">
                      {selectedIntegration.name}
                    </DialogTitle>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      <CategoryIcon className="w-3 h-3" />
                      {categoryInfo[selectedIntegration.category as IntegrationCategory]?.label ||
                        'Integratie'}
                    </span>
                  </div>
                </div>

                <DialogDescription className="text-base text-muted-foreground mb-6">
                  {selectedIntegration.description}
                </DialogDescription>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <TrialFormDialog>
                    <Button className="flex-1">Aan de slag</Button>
                  </TrialFormDialog>
                  {selectedIntegration.url && (
                    <Button variant="outline" className="flex-1 gap-2" asChild>
                      <a
                        href={selectedIntegration.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Bezoek website
                      </a>
                    </Button>
                  )}
                </div>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>
    </>
  )
}

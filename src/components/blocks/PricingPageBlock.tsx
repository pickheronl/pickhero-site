'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, Filter, Users, Package, Zap, Shield, Headphones, Building2 } from 'lucide-react'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import type { Page, PricingPlan } from '@/payload-types'
import { cn } from '@/lib/utils'
import { parseTitle } from '@/lib/parseTitle'

type PricingPageBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'pricingPage' }
>

const allFeatures = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'users', label: 'Gebruikers', icon: Users },
  { id: 'integrations', label: 'Integraties', icon: Zap },
  { id: 'support', label: 'Prioriteit support', icon: Headphones },
  { id: 'security', label: 'Beveiliging', icon: Shield },
  { id: 'multiCompany', label: 'Multi-bedrijf', icon: Building2 },
]

export default function PricingPageBlock({ block }: { block: PricingPageBlockType }) {
  const plans = block.plans as PricingPlan[] | null
  const [ordersFilter, setOrdersFilter] = useState([0])
  const [usersFilter, setUsersFilter] = useState([0])
  const [showComparison, setShowComparison] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  if (!plans || plans.length === 0) return null

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((f) => f !== featureId) : [...prev, featureId]
    )
  }

  const resetFilters = () => {
    setOrdersFilter([0])
    setUsersFilter([0])
    setSelectedFeatures([])
  }

  const getPlanUserLimit = (plan: PricingPlan): number => {
    if (plan.isEnterprise) return Infinity

    const features = plan.features || []
    for (const f of features) {
      const text = (f.text ?? '').toLowerCase()
      if (text.includes('unlimited') || text.includes('onbeperkt')) return Infinity

      const match = text.match(/(\d+)\s*(users|gebruikers)/)
      if (match?.[1]) return Number(match[1])
    }

    return Infinity
  }

  const getPlanOrderLimit = (plan: PricingPlan): number => {
    if (plan.isEnterprise) return Infinity

    const features = plan.features || []
    for (const f of features) {
      const text = (f.text ?? '').toLowerCase()
      const isOrderText = /(orders|bestellingen)/.test(text)
      if (isOrderText && (text.includes('unlimited') || text.includes('onbeperkt'))) {
        return Infinity
      }

      const match = text.match(/(\d[\d.,]*)\s*(orders|bestellingen)/)
      if (match?.[1]) {
        const numeric = Number(match[1].replace(/[^\d]/g, ''))
        if (!Number.isNaN(numeric) && numeric > 0) return numeric
      }
    }

    const name = (plan.name ?? '').toLowerCase()
    if (name.includes('starter') || name.includes('start')) return 500
    if (name.includes('professional') || name.includes('pro')) return 3000
    if (plan.sortOrder === 1) return 500
    if (plan.sortOrder === 2) return 3000

    return 3000
  }

  // Filter plans based on selected criteria
  const filteredPlans = plans.filter((plan) => {
    // Filter by orders
    if (ordersFilter[0] > 0) {
      const requiredOrders = ordersFilter[0] * 50

      if (requiredOrders >= 5000 && !plan.isEnterprise) {
        return false
      }

      if (!plan.isEnterprise) {
        const planOrderLimit = getPlanOrderLimit(plan)
        if (requiredOrders > planOrderLimit) return false
      }
    }

    // Filter by users
    if (usersFilter[0] > 0) {
      const planUserLimit = getPlanUserLimit(plan)
      if (usersFilter[0] > planUserLimit) return false
    }

    // Filter by selected features
    if (selectedFeatures.length > 0) {
      const featureRequirements: Record<string, number> = {
        orders: 1,
        users: 1,
        integrations: 1,
        support: 2,
        security: 2,
        multiCompany: 3,
      }

      for (const featureId of selectedFeatures) {
        const requiredTier = featureRequirements[featureId] || 1
        if ((plan.sortOrder ?? 0) < requiredTier) return false
      }
    }

    return true
  })

  return (
    <section className="py-20 lg:py-32 ">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {block.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              {block.badge}
            </span>
          )}
          {block.title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {parseTitle(block.title)}
            </h1>
          )}
          {block.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{block.subtitle}</p>
          )}
        </div>

        {/* Filters Section */}
        {block.showFilters && (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Vind het juiste plan</h3>
              {(ordersFilter[0] > 0 || usersFilter[0] > 0 || selectedFeatures.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="ml-auto text-muted-foreground"
                >
                  Filters resetten
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              {/* Orders Slider */}
              <div>
                <Label className="mb-3 block">
                  Verwachte orders per maand:{' '}
                  <span className="font-semibold text-primary">
                    {ordersFilter[0] === 0
                      ? 'Alle'
                      : ordersFilter[0] >= 100
                        ? '5000+'
                        : `${ordersFilter[0] * 50}+`}
                  </span>
                </Label>
                <Slider
                  value={ordersFilter}
                  onValueChange={setOrdersFilter}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Users Slider */}
              <div>
                <Label className="mb-3 block">
                  Aantal gebruikers:{' '}
                  <span className="font-semibold text-primary">
                    {usersFilter[0] === 0 ? 'Alle' : `${usersFilter[0]}+`}
                  </span>
                </Label>
                <Slider
                  value={usersFilter}
                  onValueChange={setUsersFilter}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto mb-16">
            <p className="text-muted-foreground mb-4">
              Geen pakketten voldoen aan uw huidige filtercriteria. Pas de filters aan of neem
              contact op voor een oplossing op maat.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Filters resetten
            </Button>
          </div>
        ) : (
          <div
            className={`grid gap-8 max-w-6xl mx-auto mb-16 ${
              filteredPlans.length === 1
                ? 'md:grid-cols-1 max-w-md'
                : filteredPlans.length === 2
                  ? 'md:grid-cols-2 max-w-3xl'
                  : 'md:grid-cols-3'
            }`}
          >
            {filteredPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={cn(
                  'relative p-8 bg-card rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1',
                  plan.isPopular
                    ? 'border-primary shadow-glow'
                    : 'border-border shadow-card hover:shadow-card-hover'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-4 py-1.5 bg-gradient-hero text-primary-foreground text-sm font-semibold rounded-full">
                      Meest gekozen
                    </span>
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  )}
                </div>

                <div className="mb-6">
                  {plan.isEnterprise ? (
                    <span className="text-3xl font-bold">Op aanvraag</span>
                  ) : (
                    <>
                      {plan.priceDiscounted ? (
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">€{plan.priceDiscounted}</span>
                            <span className="text-muted-foreground">/maand</span>
                          </div>
                          <span className="text-sm text-muted-foreground line-through">
                            €{plan.priceMonthly}/maand
                          </span>
                          <span className="text-xs text-secondary-foreground font-medium mt-1">
                            Introductiekorting
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">€{plan.priceMonthly}</span>
                          <span className="text-muted-foreground">/maand</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-secondary-foreground" />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {plan.isEnterprise ? (
                  <TrialFormDialog>
                    <Button variant="outline" className="w-full" size="lg">
                      {plan.ctaText || 'Neem contact op'}
                    </Button>
                  </TrialFormDialog>
                ) : (
                  <TrialFormDialog>
                    <Button variant={plan.isPopular ? 'hero' : 'outline'} className="w-full" size="lg">
                      {plan.ctaText || 'Start gratis proefperiode'}
                    </Button>
                  </TrialFormDialog>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Comparison Toggle */}
        {block.showComparison && plans.length > 1 && (
          <>
            <div className="text-center mb-8">
              <Button variant="outline" size="lg" onClick={() => setShowComparison(!showComparison)}>
                {showComparison ? 'Vergelijking verbergen' : 'Volledig vergelijken'}
              </Button>
            </div>

            {/* Full Comparison Table */}
            {showComparison && (
              <div className="overflow-x-auto bg-card border border-border rounded-2xl max-w-5xl mx-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-semibold min-w-[200px]">Functie</th>
                      {plans.map((plan) => (
                        <th
                          key={plan.id}
                          className={cn('text-center p-4 font-semibold', plan.isPopular && 'text-primary')}
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Get max features count
                      const maxFeatures = Math.max(...plans.map((p) => p.features?.length || 0))
                      const rows = []

                      for (let i = 0; i < Math.min(maxFeatures, 8); i++) {
                        // Get the feature text from the first plan that has this index
                        const featureText = plans.find((p) => p.features?.[i])?.features?.[i]?.text

                        rows.push(
                          <tr
                            key={i}
                            className={cn('border-b border-border', i % 2 === 0 ? 'bg-background' : 'bg-muted/10')}
                          >
                            <td className="p-4 text-sm">{featureText || ''}</td>
                            {plans.map((plan) => {
                              const planFeature = plan.features?.[i]

                              return (
                                <td key={plan.id} className="text-center p-4 text-sm">
                                  {planFeature ? (
                                    <span className="text-foreground">{planFeature.text}</span>
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      }

                      return rows
                    })()}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

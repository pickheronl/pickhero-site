import { Button } from '@/components/ui/button'
import { Check, Package } from 'lucide-react'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import type { Page, PricingPlan } from '@/payload-types'
import { cn } from '@/lib/utils'
import { parseTitle } from '@/lib/parseTitle'

type PricingBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'pricing' }>

export default function PricingBlock({ block }: { block: PricingBlockType }) {
  const plans = block.plans as PricingPlan[] | null

  if (!plans || plans.length === 0) return null

  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          {block.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              {block.badge}
            </span>
          )}
          {block.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {parseTitle(block.title)}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{block.subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
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
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
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
                      <>
                        <span className="text-4xl font-bold">€{plan.priceMonthly}</span>
                        <span className="text-muted-foreground">/maand</span>
                      </>
                    )}
                  </>
                )}
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0">
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
                  <Button
                    variant={plan.isPopular ? 'hero' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.ctaText || 'Start gratis proefperiode'}
                  </Button>
                </TrialFormDialog>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

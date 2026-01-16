import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import type { Page, PricingPlan } from '@/payload-types'
import { cn } from '@/lib/utils'
import { parseTitle } from '@/lib/parseTitle'

type PricingBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'pricing' }>

export default function PricingBlock({ block }: { block: PricingBlockType }) {
  const plans = block.plans as PricingPlan[] | null

  if (!plans || plans.length === 0) return null

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          {block.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              {block.badge}
            </div>
          )}
          {block.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {parseTitle(block.title)}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{block.subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative bg-card rounded-2xl p-8 border transition-all duration-300',
                plan.isPopular
                  ? 'border-primary shadow-card-hover scale-105'
                  : 'border-border hover:border-primary/20 hover:shadow-card-hover'
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Meest gekozen
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                )}
              </div>

              <div className="text-center mb-6">
                {plan.isEnterprise ? (
                  <div className="text-2xl font-bold">Op aanvraag</div>
                ) : (
                  <>
                    {plan.priceDiscounted ? (
                      <div>
                        <span className="text-muted-foreground line-through text-lg">
                          €{plan.priceMonthly}
                        </span>
                        <span className="text-4xl font-bold ml-2">€{plan.priceDiscounted}</span>
                        <span className="text-muted-foreground">/maand</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold">€{plan.priceMonthly}</span>
                        <span className="text-muted-foreground">/maand</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              <TrialFormDialog>
                <Button
                  className={cn(
                    'w-full',
                    plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''
                  )}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  {plan.ctaText || 'Start gratis proefperiode'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </TrialFormDialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

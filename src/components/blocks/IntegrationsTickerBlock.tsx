import Image from 'next/image'
import Link from 'next/link'
import type { Page, Integration, Media } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Package } from 'lucide-react'
import { parseTitle } from '@/lib/parseTitle'

type IntegrationsTickerBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'integrationsTicker' }
>

export default async function IntegrationsTickerBlock({
  block,
}: {
  block: IntegrationsTickerBlockType
}) {
  let integrations = block.integrations as Integration[] | null

  // If no specific integrations selected, fetch all
  if (!integrations || integrations.length === 0) {
    const payload = await getPayload({ config })
    const allIntegrations = await payload.find({
      collection: 'integrations',
      limit: 100,
      where: {
        isActive: { equals: true },
      },
    })
    integrations = allIntegrations.docs
  }

  if (!integrations || integrations.length === 0) return null

  // Render a single integration card
  const IntegrationCard = ({ integration }: { integration: Integration }) => {
    const logo = integration.logo as Media | null

    return (
      <div className="group flex-shrink-0 flex flex-col items-center justify-center p-4 md:p-6 bg-card rounded-xl border border-border shadow-card mx-2 md:mx-3 w-32 md:w-40 h-28 md:h-32">
        {logo?.url ? (
          <Image
            src={logo.url}
            alt={integration.name}
            width={100}
            height={48}
            className="h-10 md:h-12 max-w-[80px] md:max-w-[100px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mb-2 md:mb-3"
          />
        ) : (
          <div className="h-10 md:h-12 w-10 md:w-12 flex items-center justify-center bg-muted rounded-lg mb-2 md:mb-3">
            <Package className="h-5 md:h-6 w-5 md:w-6 text-muted-foreground" />
          </div>
        )}
        <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
          {integration.name}
        </span>
      </div>
    )
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          {block.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              {block.badge}
            </div>
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

        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Ticker container - using CSS animation for reliable infinite scroll */}
          <div className="ticker-wrapper">
            {/* First set of items */}
            {integrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
            {/* Duplicate set for seamless loop */}
            {integrations.map((integration) => (
              <IntegrationCard key={`${integration.id}-duplicate`} integration={integration} />
            ))}
          </div>
        </div>

        {(block.ctaText || block.ctaLinkText) && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              {block.ctaText}{' '}
              {block.ctaLink && block.ctaLinkText && (
                <Link href={block.ctaLink} className="text-primary font-medium hover:underline">
                  {block.ctaLinkText}
                </Link>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

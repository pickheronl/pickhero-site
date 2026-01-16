import Image from 'next/image'
import type { Page, Integration, Media } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

type IntegrationsBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'integrations' }>

export default async function IntegrationsBlock({ block }: { block: IntegrationsBlockType }) {
  let integrations = block.integrations as Integration[] | null

  // If no specific integrations selected, fetch all
  if (!integrations || integrations.length === 0) {
    const payload = await getPayload({ config })
    const allIntegrations = await payload.find({
      collection: 'integrations',
      limit: 100,
    })
    integrations = allIntegrations.docs
  }

  if (!integrations || integrations.length === 0) return null

  return (
    <section className="py-20 lg:py-32 bg-background">
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

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {integrations.map((integration) => {
            const logo = integration.logo as Media | null
            
            return (
              <div
                key={integration.id}
                className="group bg-card rounded-xl p-4 border border-border hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 flex items-center justify-center aspect-square"
              >
                {logo?.url && (
                  <Image
                    src={logo.url}
                    alt={integration.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                )}
              </div>
            )
          })}
        </div>

        {block.ctaText && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground">{block.ctaText}</p>
          </div>
        )}
      </div>
    </section>
  )
}

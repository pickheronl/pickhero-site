import type { Page, Integration } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import IntegrationsGridBlock from './IntegrationsGridBlock'

type IntegrationsGridBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'integrationsGrid' }
>

export default async function IntegrationsGridBlockServer({
  block,
}: {
  block: IntegrationsGridBlockType
}) {
  // Fetch all active integrations
  const payload = await getPayload({ config })
  const { docs: integrations } = await payload.find({
    collection: 'integrations',
    limit: 100,
    where: {
      isActive: { equals: true },
    },
  })

  return (
    <IntegrationsGridBlock
      badge={block.badge}
      title={block.title}
      subtitle={block.subtitle}
      showFilters={block.showFilters}
      ctaText={block.ctaText}
      ctaLink={block.ctaLink}
      integrations={integrations}
    />
  )
}

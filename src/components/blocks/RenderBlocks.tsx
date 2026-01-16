import type { Page } from '@/payload-types'
import HeroBlock from './HeroBlock'
import StatsBlock from './StatsBlock'
import CTABlock from './CTABlock'
import FeaturesBlock from './FeaturesBlock'
import IntegrationsTickerBlock from './IntegrationsTickerBlock'
import IntegrationsGridBlockServer from './IntegrationsGridBlockServer'
import TestimonialsBlock from './TestimonialsBlock'
import PricingBlock from './PricingBlock'
import FAQBlock from './FAQBlock'
import RichTextBlock from './RichTextBlock'

type Block = NonNullable<Page['blocks']>[number]

const blockComponents: Record<string, React.ComponentType<{ block: Block }>> = {
  hero: HeroBlock as React.ComponentType<{ block: Block }>,
  stats: StatsBlock as React.ComponentType<{ block: Block }>,
  cta: CTABlock as React.ComponentType<{ block: Block }>,
  features: FeaturesBlock as React.ComponentType<{ block: Block }>,
  integrationsTicker: IntegrationsTickerBlock as React.ComponentType<{ block: Block }>,
  integrationsGrid: IntegrationsGridBlockServer as React.ComponentType<{ block: Block }>,
  testimonials: TestimonialsBlock as React.ComponentType<{ block: Block }>,
  pricing: PricingBlock as React.ComponentType<{ block: Block }>,
  faq: FAQBlock as React.ComponentType<{ block: Block }>,
  richText: RichTextBlock as React.ComponentType<{ block: Block }>,
}

export default function RenderBlocks({ blocks }: { blocks: Page['blocks'] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id || index} block={block} />
      })}
    </>
  )
}

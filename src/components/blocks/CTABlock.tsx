import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import type { Page } from '@/payload-types'
import { parseTitle } from '@/lib/parseTitle'

type CTABlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'cta' }>

export default function CTABlock({ block }: { block: CTABlockType }) {
  const showButton = block.ctaText && block.ctaText.trim() !== ''

  const ctaButton = showButton ? (
    <Button
      size="lg"
      className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
    >
      {block.ctaText}
      <ArrowRight className="ml-2" />
    </Button>
  ) : null

  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {parseTitle(block.title)}
        </h2>
        {block.description && (
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {block.description}
          </p>
        )}
        {showButton && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {block.ctaLink ? (
              <Link href={block.ctaLink}>{ctaButton}</Link>
            ) : (
              <TrialFormDialog>{ctaButton}</TrialFormDialog>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

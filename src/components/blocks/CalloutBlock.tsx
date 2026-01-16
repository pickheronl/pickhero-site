import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import type { Page } from '@/payload-types'
import { parseTitle } from '@/lib/parseTitle'

type CalloutBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'callout' }>

export default function CalloutBlock({ block }: { block: CalloutBlockType }) {
  const ctaButton = (
    <Button
      size="lg"
      className="bg-background text-foreground hover:bg-background/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
    >
      {block.ctaText || 'Start gratis proefperiode'}
      <ArrowRight className="ml-2" />
    </Button>
  )

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative bg-ink rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-background rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              {parseTitle(block.title)}
            </h2>
            {block.description && (
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                {block.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {block.ctaLink ? (
                <Link href={block.ctaLink}>{ctaButton}</Link>
              ) : (
                <TrialFormDialog>{ctaButton}</TrialFormDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

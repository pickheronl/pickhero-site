import type { Page } from '@/payload-types'
import { parseTitle } from '@/lib/parseTitle'

type IntroBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'intro' }>

interface IntroBlockProps {
  block: IntroBlockType
}

export default function IntroBlock({ block }: IntroBlockProps) {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {block.title && (
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              {parseTitle(block.title)}
            </h1>
          )}
          {block.description && (
            <p className="text-xl text-muted-foreground leading-relaxed">{block.description}</p>
          )}
        </div>
      </div>
    </section>
  )
}

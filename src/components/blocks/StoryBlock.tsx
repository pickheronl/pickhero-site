import type { Page } from '@/payload-types'
import { parseTitle } from '@/lib/parseTitle'

type StoryBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'story' }>

interface StoryBlockProps {
  block: StoryBlockType
}

export default function StoryBlock({ block }: StoryBlockProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {block.title && (
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              {parseTitle(block.title)}
            </h2>
          )}

          {block.paragraphs && block.paragraphs.length > 0 && (
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              {block.paragraphs.map((item, index) => {
                const isHighlighted = item.isHighlighted
                return (
                  <p
                    key={index}
                    className={
                      isHighlighted ? 'text-foreground font-medium text-xl' : undefined
                    }
                  >
                    {item.text}
                  </p>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

import type { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type RichTextBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'richText' }>

export default function RichTextBlock({ block }: { block: RichTextBlockType }) {
  if (!block.content) return null

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-lg">
        <RichText data={block.content} />
      </div>
    </section>
  )
}

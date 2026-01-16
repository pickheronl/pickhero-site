import type { Page, Faq } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@payloadcms/richtext-lexical/react'

type FAQBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'faq' }>

export default function FAQBlock({ block }: { block: FAQBlockType }) {
  const items = block.items as Faq[] | null

  if (!items || items.length === 0) return null

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          {block.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{block.title}</h2>
          )}
          {block.subtitle && (
            <p className="text-lg text-muted-foreground">{block.subtitle}</p>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={String(item.id)}
              className="bg-card rounded-xl border border-border px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer && <RichText data={item.answer} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

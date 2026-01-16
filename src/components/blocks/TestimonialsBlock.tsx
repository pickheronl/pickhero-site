import Image from 'next/image'
import type { Page, Testimonial, Media } from '@/payload-types'
import { Star } from 'lucide-react'

type TestimonialsBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'testimonials' }>

export default function TestimonialsBlock({ block }: { block: TestimonialsBlockType }) {
  const testimonials = block.testimonials as Testimonial[] | null

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => {
            const avatar = testimonial.avatar as Media | null

            return (
              <div
                key={testimonial.id}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                {testimonial.rating && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                )}
                <p className="text-foreground mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {avatar?.url && (
                    <Image
                      src={avatar.url}
                      alt={testimonial.authorName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{testimonial.authorName}</div>
                    {(testimonial.authorRole || testimonial.company) && (
                      <div className="text-sm text-muted-foreground">
                        {testimonial.authorRole}
                        {testimonial.authorRole && testimonial.company && ', '}
                        {testimonial.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

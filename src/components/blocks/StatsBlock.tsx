import type { Page } from '@/payload-types'

type StatsBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'stats' }>

export default function StatsBlock({ block }: { block: StatsBlockType }) {
  if (!block.stats || block.stats.length === 0) return null

  return (
    <section className="pb-16 lg:py-24 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {block.stats.map((stat, index) => (
            <div key={index} className="text-center px-2">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="mx-auto max-w-[26ch] text-sm sm:text-base text-primary-foreground/80 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

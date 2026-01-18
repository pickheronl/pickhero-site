import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import HeaderWrapper from '@/components/site/HeaderWrapper'
import FooterWrapper from '@/components/site/FooterWrapper'
import RenderBlocks from '@/components/blocks/RenderBlocks'

// Allow dynamic paths not returned by generateStaticParams to be cached on-demand
export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

const getPageBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const { docs: pages } = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      })
      return pages[0] || null
    },
    [`page-${slug}`],
    { tags: [`page-${slug}`, 'pages'] }
  )

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 100,
    select: { slug: true },
  })

  return pages
    .filter((page) => page.slug && page.slug !== 'home')
    .map((page) => ({ slug: page.slug }))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)()

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderWrapper />
      <main className="pt-20 bg-gradient-subtle">
        <RenderBlocks blocks={page.blocks} />
      </main>
      <FooterWrapper />
    </div>
  )
}

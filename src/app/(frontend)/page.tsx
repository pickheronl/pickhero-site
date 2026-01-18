import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import HeaderWrapper from '@/components/site/HeaderWrapper'
import FooterWrapper from '@/components/site/FooterWrapper'
import RenderBlocks from '@/components/blocks/RenderBlocks'

const getHomePage = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      depth: 2,
      limit: 1,
    })
    return pages[0] || null
  },
  ['page-home'],
  { tags: ['page-home', 'pages'] }
)

export default async function HomePage() {
  const page = await getHomePage()

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderWrapper />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Homepage niet gevonden</h1>
          <p className="text-muted-foreground">
            Maak een pagina aan met slug &quot;home&quot; in de Payload admin.
          </p>
        </main>
        <FooterWrapper />
      </div>
    )
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

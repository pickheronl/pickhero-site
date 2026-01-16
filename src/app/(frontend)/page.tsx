import { getPayload } from 'payload'
import config from '@payload-config'
import HeaderWrapper from '@/components/site/HeaderWrapper'
import FooterWrapper from '@/components/site/FooterWrapper'
import RenderBlocks from '@/components/blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    depth: 2,
    limit: 1,
  })

  const page = pages[0]

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
      <main>
        <RenderBlocks blocks={page.blocks} />
      </main>
      <FooterWrapper />
    </div>
  )
}

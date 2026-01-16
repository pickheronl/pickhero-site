import { getPayload } from 'payload'
import config from '@payload-config'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import RenderBlocks from '@/components/blocks/RenderBlocks'

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
        <Header />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Homepage niet gevonden</h1>
          <p className="text-muted-foreground">
            Maak een pagina aan met slug &quot;home&quot; in de Payload admin.
          </p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RenderBlocks blocks={page.blocks} />
      </main>
      <Footer />
    </div>
  )
}

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import HeaderWrapper from '@/components/site/HeaderWrapper'
import FooterWrapper from '@/components/site/FooterWrapper'
import RenderBlocks from '@/components/blocks/RenderBlocks'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  const page = pages[0]

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

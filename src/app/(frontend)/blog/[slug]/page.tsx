import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import HeaderWrapper from '@/components/site/HeaderWrapper'
import FooterWrapper from '@/components/site/FooterWrapper'
import { Button } from '@/components/ui/button'
import { RichText } from '@payloadcms/richtext-lexical/react'
import TrialFormDialog from '@/components/site/TrialFormDialog'
import type { Post } from '@/payload-types'

// Allow dynamic paths not returned by generateStaticParams to be cached on-demand
export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { isPublished: { equals: true } },
    limit: 100,
    select: { slug: true },
  })

  return posts.filter((post) => post.slug).map((post) => ({ slug: post.slug }))
}

const categoryLabels: Record<string, string> = {
  warehouse: 'Warehouse',
  ecommerce: 'E-commerce',
  integrations: 'Integraties',
  tips: 'Tips & Tricks',
  news: 'Nieuws',
  updates: 'Updates',
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getImageUrl(image: Post['featuredImage']): string | null {
  if (!image) return null
  if (typeof image === 'number') return null
  return image.url || null
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      isPublished: { equals: true },
    },
    limit: 1,
  })

  const post = posts[0]

  if (!post) {
    return {
      title: 'Artikel niet gevonden | PickHero',
    }
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | PickHero Blog`,
    description: post.seo?.metaDescription || post.excerpt || '',
  }
}

const getPostBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const { docs: posts } = await payload.find({
        collection: 'posts',
        where: {
          slug: { equals: slug },
          isPublished: { equals: true },
        },
        depth: 2,
        limit: 1,
      })
      return posts[0] || null
    },
    [`post-${slug}`],
    { tags: [`post-${slug}`, 'posts'] }
  )

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)()

  if (!post) {
    notFound()
  }

  const imageUrl = getImageUrl(post.featuredImage)

  return (
    <div className="min-h-screen bg-background">
      <HeaderWrapper />

      <main className="pt-20 bg-gradient-subtle">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar blog
              </Link>

              {post.category && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {categoryLabels[post.category] || post.category}
                  </span>
                </div>
              )}

              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">{post.title}</h1>

              {post.excerpt && <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>}

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTimeMinutes || 5} min leestijd
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {imageUrl && (
          <section className="pb-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full aspect-video object-cover rounded-2xl"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <article className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:scroll-mt-28 prose-img:rounded-2xl prose-img:mx-auto prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              {post.content && <RichText data={post.content} />}
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Klaar om te starten met PickHero?
              </h2>
              <p className="text-muted-foreground mb-8">
                Probeer PickHero 14 dagen gratis en ontdek hoe we je warehouse kunnen transformeren.
              </p>
              <TrialFormDialog>
                <Button size="lg">Start gratis proefperiode</Button>
              </TrialFormDialog>
            </div>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  )
}

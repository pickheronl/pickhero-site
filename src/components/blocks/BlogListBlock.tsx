import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Calendar, Clock } from 'lucide-react'
import type { Page, Post, Media } from '@/payload-types'
import { parseTitle } from '@/lib/parseTitle'
import { cn } from '@/lib/utils'

type BlogListBlockType = Extract<NonNullable<Page['blocks']>[number], { blockType: 'blogList' }>

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
  return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getImageUrl(image: Post['featuredImage']): string | null {
  if (!image) return null
  if (typeof image === 'number') return null
  return image.url || null
}

export default async function BlogListBlock({ block }: { block: BlogListBlockType }) {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      isPublished: { equals: true },
    },
    sort: '-publishedAt',
    limit: block.postsPerPage || 9,
    depth: 1,
  })

  const featuredPost = block.showFeatured ? posts[0] : null
  const otherPosts = block.showFeatured ? posts.slice(1) : posts

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        {(block.title || block.subtitle) && (
          <div className="text-center mb-16">
            {block.title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {parseTitle(block.title)}
              </h2>
            )}
            {block.subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{block.subtitle}</p>
            )}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Nog geen blogposts beschikbaar.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden">
                      {getImageUrl(featuredPost.featuredImage) ? (
                        <img
                          src={getImageUrl(featuredPost.featuredImage)!}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center min-h-[200px]">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-primary/50" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        {featuredPost.category && (
                          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            {categoryLabels[featuredPost.category] || featuredPost.category}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">Uitgelicht</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h3>
                      {featuredPost.excerpt && (
                        <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                      )}
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredPost.publishedAt)}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTimeMinutes || 5} min leestijd
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Blog Grid */}
            {otherPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">Alle artikelen</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        {getImageUrl(post.featuredImage) ? (
                          <img
                            src={getImageUrl(post.featuredImage)!}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-primary/50" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {post.category && (
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                            {categoryLabels[post.category] || post.category}
                          </span>
                        )}
                        <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTimeMinutes || 5} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

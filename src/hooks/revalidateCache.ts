import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Revalidate cache when a page is changed
 */
export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!doc.slug) return doc

  const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
  
  req.payload.logger.info(`Revalidating page: ${path}`)
  revalidatePath(path)
  revalidateTag(`page-${doc.slug}`)
  
  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (!doc.slug) return doc

  const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
  
  req.payload.logger.info(`Revalidating deleted page: ${path}`)
  revalidatePath(path)
  revalidateTag(`page-${doc.slug}`)
  
  return doc
}

/**
 * Revalidate cache when a post is changed
 */
export const revalidatePostAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!doc.slug) return doc

  const path = `/blog/${doc.slug}`
  
  req.payload.logger.info(`Revalidating post: ${path}`)
  revalidatePath(path)
  revalidatePath('/blog') // Also revalidate blog listing
  revalidateTag(`post-${doc.slug}`)
  
  return doc
}

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (!doc.slug) return doc

  const path = `/blog/${doc.slug}`
  
  req.payload.logger.info(`Revalidating deleted post: ${path}`)
  revalidatePath(path)
  revalidatePath('/blog')
  revalidateTag(`post-${doc.slug}`)
  
  return doc
}

/**
 * Revalidate all pages when navigation/footer globals change
 */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  req.payload.logger.info(`Revalidating global: ${global.slug}`)
  
  // Navigation and footer appear on all pages, so revalidate everything
  revalidatePath('/', 'layout')
  revalidateTag(`global-${global.slug}`)
  
  return doc
}

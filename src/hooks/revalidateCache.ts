import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  const slug = doc.slug as string
  if (!slug) return doc
  
  req.payload.logger.info(`Revalidating page: ${slug}`)
  revalidateTag(`page-${slug}`)
  revalidateTag('pages') // For listings
  
  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  const slug = doc.slug as string
  if (!slug) return doc
  
  req.payload.logger.info(`Revalidating deleted page: ${slug}`)
  revalidateTag(`page-${slug}`)
  revalidateTag('pages')
  
  return doc
}

export const revalidatePostAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  const slug = doc.slug as string
  if (!slug) return doc
  
  req.payload.logger.info(`Revalidating post: ${slug}`)
  revalidateTag(`post-${slug}`)
  revalidateTag('posts') // For blog listing
  
  return doc
}

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  const slug = doc.slug as string
  if (!slug) return doc
  
  req.payload.logger.info(`Revalidating deleted post: ${slug}`)
  revalidateTag(`post-${slug}`)
  revalidateTag('posts')
  
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  req.payload.logger.info(`Revalidating global: ${global.slug}`)
  revalidateTag(`global-${global.slug}`)
  revalidateTag('globals') // All globals
  
  return doc
}

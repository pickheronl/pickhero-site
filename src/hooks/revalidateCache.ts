import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Purge entire cache on any content change
 */
const purgeAll = (logger: { info: (msg: string) => void }) => {
  logger.info('Purging entire cache')
  revalidatePath('/', 'layout')
}

export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  purgeAll(req.payload.logger)
  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  purgeAll(req.payload.logger)
  return doc
}

export const revalidatePostAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  purgeAll(req.payload.logger)
  return doc
}

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  purgeAll(req.payload.logger)
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, req }) => {
  purgeAll(req.payload.logger)
  return doc
}

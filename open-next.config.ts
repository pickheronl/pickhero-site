import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'
import doShardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache'

export default defineCloudflareConfig({
  // Static assets cache bundles with the worker, no R2 bulk upload needed
  incrementalCache: staticAssetsCache,
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
  enableCacheInterception: true,
})

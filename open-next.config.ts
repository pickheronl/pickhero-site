import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import doShardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache'

export default defineCloudflareConfig({
  // Static assets cache bundles with the worker, no R2 bulk upload needed
  incrementalCache: r2IncrementalCache,
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
  enableCacheInterception: true,
})

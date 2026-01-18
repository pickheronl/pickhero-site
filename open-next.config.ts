import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import doShardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache'
import { purgeCache } from '@opennextjs/cloudflare/overrides/cache-purge/index'

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
  enableCacheInterception: true,
  cachePurge: purgeCache({ type: 'direct' }),
})

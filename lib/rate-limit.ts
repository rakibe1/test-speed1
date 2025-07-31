import { LRUCache } from "lru-cache"
import type { NextRequest } from "next/server"

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (res: NextRequest, limit: number, token: string) =>
      new Promise<boolean>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit
        res.headers.set("X-RateLimit-Limit", String(limit))
        res.headers.set("X-RateLimit-Remaining", String(Math.max(0, limit - currentUsage)))

        return isRateLimited ? reject() : resolve(true)
      }),
  }
}

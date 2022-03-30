import { router } from '@trpc/server'
import type { Context } from './context'

export function createRouter() {
  return router<Context>()
}

import { createRouter } from './createRouter'
import { apiRouter } from './routes/api'

export const appRouter = createRouter()
  .merge(apiRouter)

export type AppRouter = typeof appRouter

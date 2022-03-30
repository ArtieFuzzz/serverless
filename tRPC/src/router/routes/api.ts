import { createRouter } from '../createRouter'
// import { z } from 'zod'

export const apiRouter = createRouter()
  .query('hello', {
    resolve() {
      return { message: 'Hello world!' }
    }
  })

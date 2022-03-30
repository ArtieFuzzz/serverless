/* eslint-disable camelcase */
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import fp from 'fastify-plugin'
import { createContext } from './router/context'
import { appRouter } from './router/index'

const app = fastify()
  .addHook('onRequest', (_, res, done) => {
    void res.headers({
      'Cache-Control': 'public, max-age=7776000',
      'X-Powered-By': 'Fuzzy Wuzzy, ArtieFuzzz#8298'
    })

    done()
  })
  .setNotFoundHandler((req, res) => {
    void res.code(404)
    
    return res.send({
      code: 404,
      error: false,
      message: `${req.method} ${req.url} Is not a valid Route`
    })
  })
  .setErrorHandler(async (err, _, res) => {
    await res.code(500)

    return res.send({
      code: err.code,
      message: 'Something went wrong...',
      error: true,
      error_message: `[${err.name}:${err.code}]: ${err.message}`
    })
  })

void app.register(require('fastify-no-icon'))
void app.register(fp(fastifyTRPCPlugin), {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
})

export default app

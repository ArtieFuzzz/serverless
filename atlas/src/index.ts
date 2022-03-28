/* eslint-disable camelcase */
import { Base } from 'deta'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'

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

const db = Base('urls')

void app.register(require('fastify-no-icon'))

app.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  if (!req.params.id) return reply.send({ error: false, message: 'You must provide an ID!' })

  const url = await db.get(req.params.id) as { key: string, value: string }

  if (!url.value) return reply.code(404).send({ error: false, message: 'That Short URL doesn\'t exist!' })

  return reply.redirect(url.value)
})

export default app

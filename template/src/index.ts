/* eslint-disable camelcase */
import fastify from 'fastify'

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

app.get('/', async (_req, res) => {
  await res.send('Hello!')
})

export default app

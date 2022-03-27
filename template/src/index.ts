import fastify from 'fastify'

const app = fastify()

void app.register(require('fastify-no-icon'))

app.get('/', async (_req, res) => {
  await res.send('Hello!')
})

export default app

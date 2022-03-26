import fastify from 'fastify'

const app = fastify()

app.register(require('fastify-no-icon'))

app.get('/', (_req, res) => {
  res.send('Hello!')
})

export default app
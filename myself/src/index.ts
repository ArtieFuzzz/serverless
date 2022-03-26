import fastify from 'fastify'
import info from './info.json'

const app = fastify()

app.register(require('fastify-no-icon'))

app.get('/', (_req, res) => {
  res.send(JSON.parse(JSON.stringify(info)))
})

export default app
import fastify from 'fastify'
import info from './info.json'

const app = fastify()

void app.register(require('fastify-no-icon'))

app.get('/', async (_req, res) => {
  await res.send(JSON.parse(JSON.stringify(info)))
})

export default app

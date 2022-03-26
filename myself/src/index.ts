import fastify from 'fastify'
import info from './info.json'

const app = fastify()

app.get('/', (_req, res) => {
  res.send(JSON.parse(JSON.stringify(info)))
})

module.exports = app
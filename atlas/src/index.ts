import { Base } from 'deta'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'

const app = fastify()
const db = Base('urls')

void app.register(require('fastify-no-icon'))

app.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  if (!req.params.id) return reply.send({ error: false, message: 'You must provide an ID!' })

  const url = await db.get(req.params.id) as { key: string, value: string }

  if (!url.value) return reply.code(404).send({ error: false, message: 'That Short URL doesn\'t exist!' })

  return reply.redirect(url.value)
})

export default app

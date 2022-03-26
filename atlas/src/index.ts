import { Base } from 'deta'
import express, { Request, Response } from 'express'

const db = Base('urls')
const app = express()

app.use(express.json())
app.disable('x-powered-by')

app.get('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) return res.json({ error: false, message: 'You must provide an ID!' })

  const data = await db.get(req.params.id)

  if (!data) return res.status(404).json({ error: false, message: 'That Short URL doesn\'t exist!' })

  return res.status(200).redirect(data.value as string)
})

app.post('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) return res.json({ error: false, message: 'You must provide an ID!' })
  if (!req.body.url) return res.json({ error: false, message: 'No url provided in body...'})

  if (await db.get(req.params.id)) return res.json({ error: false, message: 'That URL already exists!'})
  
  await db.put(req.body.url as string, req.params.id)

  return res.status(201).json({ id: req.params.id })
})

app.delete('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) return res.json({ error: false, message: 'You must provide an ID!' })

  if (!await db.get(req.params.id)) return res.json({ error: false, message: 'That URL doesn\'t exist...'})
  
  await db.delete(req.params.id)

  return res.status(200)
})

module.exports = app

import { Base } from 'deta'
import express, { Request, Response } from 'express'

const db = Base('urls')
const app = express()

app.disable('x-powered-by')

app.get('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) return res.json({ error: false, message: 'You must provide an ID!' })

  const data = await db.get(req.params.id)

  if (!data) return res.status(404).json({ error: false, message: 'That Short URL doesn\'t exist!' })

  return res.status(200).redirect(data.value as string)
})

module.exports = app

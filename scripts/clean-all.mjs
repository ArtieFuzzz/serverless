import fs from 'fs-extra'
import { join } from 'path'

const dirs = ['atlas', 'myself', 'template']

dirs.forEach(async (dir) => {
  await fs.rm(join(process.cwd(), dir, 'build'), { recursive: true, force: false })
}) 

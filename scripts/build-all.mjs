import { exec } from 'child_process'
import { join } from 'path'

const dirs = ['atlas', 'myself', 'template']

dirs.forEach((dir) => {
  exec('npm run build', {
    cwd: join(process.cwd(), dir),
    shell: true,
    env: process.env
  })
})

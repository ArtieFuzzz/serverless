import { exec } from 'child_process'
import { join } from 'path'

const dirs = ['atlas', 'myself', 'template']

dirs.forEach((dir) => {
  exec('deta deploy', {
    cwd: join(process.cwd(), dir),
    shell: true,
    env: process.env
  })
})

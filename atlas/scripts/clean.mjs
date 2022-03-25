import fse from 'fs-extra'
import { join } from 'path'

const files = ['index.js', 'index.js.map']

for (const file in files){
  if (!fse.existsSync(join(process.cwd(), file))) {
    process.exit(0)
  }
}

await fse.rm(join(process.cwd(), 'tsconfig.tsbuildinfo'))

for (const file in files){
  await fse.rm(join(process.cwd(), file))
}
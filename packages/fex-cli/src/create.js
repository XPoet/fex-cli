import path from 'node:path'
import fs from 'fs-extra'

export default async (name, options) => {
  const projectPath = path.resolve(process.cwd(), name)

  // Determine whether the project path exists
  const isExist = await fs.exists(projectPath)

  if (isExist) {
    if (options.force) {
      await fs.remove(projectPath)
    } else {
      // TODO: Ask whether to overwrite
      console.log('Whether to overwrite?')
    }
  } else {
    console.log('Project path not exist')
    fs.mkdirs(projectPath)
  }
}

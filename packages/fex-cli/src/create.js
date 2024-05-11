import path from 'node:path'
import fs from 'fs-extra'
import chalk from 'chalk'
import { select } from '@inquirer/prompts'
import { downloadTemplate, fetchBranch } from './fetch.js'

const generateTemplate = async (projectName, projectPath) => {
  const branch = await fetchBranch()

  if (branch) {
    await downloadTemplate(projectName, projectPath, branch)
  }
}

export default async (name, options) => {
  const projectPath = path.resolve(process.cwd(), name)

  // Determine whether the project path exists
  const isExist = await fs.exists(projectPath)

  if (isExist) {
    if (options.force) {
      await fs.remove(projectPath)
    } else {
      const overwrite = await select({
        message: 'Project path already exists, pick an action: ',
        choices: [
          {
            name: 'Overwrite',
            value: true,
            description: 'Overwrite project'
          },
          {
            name: 'Cancel',
            value: false,
            description: 'Cancel project creation'
          }
        ]
      })

      if (overwrite) {
        await fs.remove(projectPath)
        console.log(chalk.blue('Overwrite project'))
        await generateTemplate(name, projectPath)
      } else {
        console.log(chalk.red('Create cancel'))
      }
    }
  } else {
    await generateTemplate(name, projectPath)
  }
}

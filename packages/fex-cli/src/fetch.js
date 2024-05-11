import { select } from '@inquirer/prompts'
import util from 'node:util'
import { DOWNLOAD_URL, REPO_URL } from './constant.js'
import wrapLoading from './spinner.js'
import downloadGirRepo from 'download-git-repo'
import chalk from 'chalk'

const getBranches = async () => {
  try {
    const res = await fetch(REPO_URL)

    if (!res.ok) {
      return Promise.reject(null)
    }
    const data = await res.json()
    return data.map((b) => ({
      name: b.name,
      value: b.name
    }))
  } catch {
    return Promise.reject(null)
  }
}

export const fetchBranch = async () => {
  const branches = await wrapLoading(getBranches, {
    startMsg: 'Loading project template ...',
    successMsg: 'Project template loaded successfully!',
    failMsg: 'Project template load failed, retry later!'
  })

  if (!branches || branches?.length === 0) {
    return null
  }

  const branch = await select({
    message: 'Please choose a template to create project: ',
    choices: branches
  })

  return branch
}

export const downloadTemplate = async (projectName, projectPath, branch) => {
  const downloadFn = util.promisify(downloadGirRepo)

  const downloadRes = await wrapLoading(
    downloadFn,
    {
      startMsg: 'Downloading template ...',
      successMsg: 'Template downloaded successfully!',
      failMsg: 'Template download failed, retry later!'
    },
    `${DOWNLOAD_URL}#${branch}`,
    projectPath
  )

  if (downloadRes) {
    console.log(`\r\n cd ${chalk.cyan(projectName)}\r\n npm install`)
  }
}

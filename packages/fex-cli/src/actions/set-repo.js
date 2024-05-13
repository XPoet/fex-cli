import fs from 'fs-extra'
import { CLI_RC_PATH } from '../constant.js'
import wrapLoading from '../spinner.js'

const writeRcFile = async (repo) => {
  const rcContent = `repo=${repo}`

  try {
    const isExist = await fs.exists(CLI_RC_PATH)

    if (isExist) {
      let content = await fs.readFile(CLI_RC_PATH, 'utf-8')
      content = content.replace(/repo=.*/, rcContent)
      await fs.writeFile(CLI_RC_PATH, content)
      return true
    } else {
      await fs.writeFile(CLI_RC_PATH, rcContent)
      return true
    }
  } catch {
    return Promise.reject(false)
  }
}

export default async (repo) => {
  if (repo) {
    await wrapLoading(
      writeRcFile,
      {
        startMsg: 'Setting up template repository ...',
        successMsg: 'Template repository set up successfully!',
        failMsg: 'Template repository setup failed, retry later!'
      },
      repo
    )
  }
}

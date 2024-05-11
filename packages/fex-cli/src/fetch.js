import { select } from '@inquirer/prompts'
import { REPO_URL } from './constant.js'
import wrapLoading from './spinner.js'

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

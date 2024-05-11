import { select } from '@inquirer/prompts'
import { REPO_URL } from './constant.js'

const getBranches = async () => {
  try {
    const res = await fetch(REPO_URL)

    if (!res.ok) {
      return []
    }
    const data = await res.json()
    return data.map((b) => ({
      name: b.name,
      value: b.name
    }))
  } catch {
    return []
  }
}

export const fetchBranch = async () => {
  const branches = await getBranches()

  if (branches.length === 0) {
    return null
  }

  const branch = await select({
    message: 'Please choose a template to create project: ',
    choices: branches
  })

  return branch
}

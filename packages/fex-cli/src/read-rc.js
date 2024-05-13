import fs from 'fs-extra'
import { CLI_RC_PATH } from './constant.js'

export default async (key) => {
  try {
    const isExistRc = await fs.exists(CLI_RC_PATH)

    if (isExistRc) {
      const content = await fs.readFile(CLI_RC_PATH, 'utf-8')
      const regex = new RegExp(`${key}=([^#\n\r]*)`)
      const match = content.match(regex)
      if (match) {
        return match[1]
      } else {
        return null
      }
    } else {
      return null
    }
  } catch {
    return null
  }
}

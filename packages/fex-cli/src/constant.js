import version from './version.cjs'
import os from 'node:os'
import readRc from './read-rc.js'

export const VERSION = version

export const CLI_NAME = 'fex-cli'

export const CLI_DESC = 'CLI to create a front-end project template'

export const CLI_RC = '.fexrc'

export const CLI_RC_PATH = `${os.homedir()}/${CLI_RC}`

export const REPO = (await readRc('repo')) || 'XPoet/vite-vue-starter'

export const REPO_URL = `https://api.github.com/repos/${REPO}/branches`

export const DOWNLOAD_URL = `github:${REPO}`

#! /usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import { CLI_NAME, CLI_DESC, VERSION } from '../src/constant.js'
import createProject from '../src/actions/create.js'
import setRepo from '../src/actions/set-repo.js'

const program = new Command()

program.name(CLI_NAME).description(CLI_DESC).version(VERSION).usage('[command] [options]')

program
  .command('create')
  .description('Create a new project')
  .argument('<name>', 'Project name')
  .option('-f, --force', 'Overwrite project directory if it already exists')
  .action((name, option) => {
    createProject(name, option)
  })

program
  .command('set-repo')
  .description('Set the GitHub repository of the template')
  .argument('<repo>', 'Repository name')
  .action((repo) => {
    setRepo(repo)
  })

program.on('--help', () => {
  console.log(
    `\r\nRun ${chalk.cyan(`${CLI_NAME} [command] --help`)} for detailed usage of given command.\r\n`
  )
})

program.parse()

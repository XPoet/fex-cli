#! /usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import { CLI_NAME, DESC, VERSION } from '../src/constant.js'
import createProject from '../src/create.js'

const program = new Command()

program.name(CLI_NAME).description(DESC).version(VERSION).usage('[command] [options]')

program
  .command('create')
  .description('create a new project')
  .argument('<name>', 'project name')
  .option('-f, --force', 'overwrite project directory if it already exists')
  .action((name, option) => {
    createProject(name, option)
  })

program.on('--help', () => {
  console.log(
    `\r\nRun ${chalk.cyan(`${CLI_NAME} [command] --help`)} for detailed usage of given command.\r\n`
  )
})

program.parse()

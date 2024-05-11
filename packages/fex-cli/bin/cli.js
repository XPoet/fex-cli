#! /usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { CLI_NAME, DESC, VERSION } from '../src/constant.js'

const program = new Command()

program.name(CLI_NAME).description(DESC).version(VERSION).usage('[command] [options]')

program
  .command('create')
  .description('create a new project')
  .argument('<name>', 'project name')
  .option('-f, --force', 'overwrite project directory if it already exists')
  .action((name, option) => {
    console.log('name: ', name)
    console.log('options: ', option)
  })

program.on('--help', () => {
  console.log(
    `\r\nRun ${chalk.cyan(`${CLI_NAME} [command] --help`)} for detailed usage of given command.\r\n`
  )
})

program.parse()

// Imports
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const kebabCase = require('lodash/kebabCase')
const inquire = require('inquirer')
const { writeFiles } = require('../utils.js')

// Variables
const questions = [
  {
    type: 'input',
    message: 'Component name:',
    name: 'name',
    filter: val => upperFirst(camelCase(val))
  }
]

async function command (api) {
  const make = options => {
    const { name } = require(process.cwd() + '/package.json')
    options.packageName = name
    options.nameKebab = kebabCase(options.name)
    writeFiles('component', options, api)
  }

  return inquire
    .prompt(questions)
    .then(make)
}

module.exports = api => {
  api.registerCommand('make:component', {
    description: 'scaffold a new Fresh Platform UI component',
    usage: 'vue-cli-service make:component [options]',
    options: {
      '--name': 'specify component name'
    }
  }, () => command(api))
}

module.exports.command = command

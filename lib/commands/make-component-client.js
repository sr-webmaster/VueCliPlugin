// Imports
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const kebabCase = require('lodash/kebabCase')
const inquire = require('inquirer')
const { writeFiles } = require('../utils.js')
const fs = require('fs')

// Variables
const questions = [
  {
    type: 'input',
    message: 'Component name:',
    name: 'name',
    filter: val => upperFirst(camelCase(val))
  },
  {
    type: 'input',
    message: 'Root Directory:',
    name: 'rootDir',
    default: () => {
      return fs.existsSync(process.cwd() + '/resources/assets/js') ? 'resources/assets/js' : 'resources/js'
    }
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
      '--name': 'specify component name',
      '--rootDir': 'root directory for js files'
    }
  }, () => command(api))
}

module.exports.command = command

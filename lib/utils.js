/**
 * From https://github.com/vuetifyjs/vue-cli-plugins/blob/master/packages/vue-cli-plugin-vuetify-cli/util/helpers.js
 */
const fs = require('fs')
const inquire = require('inquirer')
const path = require('path')
const pluralize = require('pluralize')
const shell = require('shelljs')
const { upperFirst, camelCase, keys } = require('lodash')

function getFile (file, template) {
  return {
    name: file,
    data: fs.readFileSync(resolve(`${template}/${file}`), 'utf8')
  }
}

function * getFiles (template) {
  for (const file of fs.readdirSync(template)) {
    yield getFile(file, template)
  }
}

function resolve (file) {
  return path.resolve(__dirname, file)
}

function writeFile (directory, name, content) {
  try {
    fs.writeFileSync(`${directory}/${name}`, content, 'utf8')
  } catch (e) {}
}

async function * parseDir (dir, options, api) {
  const { name: oname, type = '' } = options
  const rootDir = options && options.rootDir ? options.rootDir : 'src'
  const template = resolve(`../generator/template/${dir}`)
  const directory = api.resolve(`${rootDir}/${pluralize(dir)}/${type}${oname}`)

  await overwriteDir(directory)

  for (const { name, data } of getFiles(template)) {
    yield { directory, name, data, oname }
  }
}

async function overwriteDir (directory) {
  if (fs.existsSync(directory)) {
    await inquire
      .prompt([{
        default: false,
        type: 'confirm',
        message: 'Directory already exists, overwrite?',
        name: 'overwrite'
      }])
      .then(answers => {
        if (!answers.overwrite) process.exit(0)

        shell.rm('-rf', directory)
      })
      .catch(err => console.error(err))
  }

  shell.mkdir('-p', directory)

  return Promise.resolve()
}

async function writeFiles (name, options, api) {
  const files = parseDir(name, options, api)
  const nameRe = new RegExp(`\\b${name.replace('/', '\\/')}\\b`, 'g')
  const nameCompRe = new RegExp(`\\b${upperFirst(name).replace('/', '\\/')}\\b`, 'g')

  for await (const file of files) {
    const {
      data,
      directory,
      name,
      oname
    } = file
    const compName = upperFirst(camelCase(oname))
    let content = data
    keys(options).forEach(key => {
      content = content.replace(new RegExp(`<%= ${key} %>`, 'g'), options[key])
    })

    writeFile(
      directory,
      name.replace(nameRe, oname).replace(nameCompRe, compName),
      content
    )
  }
}

module.exports = {
  parseDir,
  getFile,
  getFiles,
  overwriteDir,
  resolve,
  writeFile,
  writeFiles
}

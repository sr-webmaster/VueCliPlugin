const { devDependencies, dependencies, storybookDependencies, buildDependencies } = require('./dependencies')

const scriptsStorybook = {
  storybook: 'yarn storybook:serve',
  'storybook:build': 'cross-env STORYBOOK=true vue-cli-service storybook:build -o ./public/styleguide',
  'storybook:serve': 'cross-env STORYBOOK=true vue-cli-service storybook:serve -p 6006 -s ./public'
}

const scriptsMakeCommands = {
  'make:component': 'vue-cli-service make:component'
}

const makeProject = (api, options) => {
  api.extendPackage({
    devDependencies,
    dependencies,
    scripts: {
      lint: 'eslint --ext .js,.vue src tests .storybook',
      test: 'yarn test:unit',
      'test:unit': 'cross-env vue-cli-service test:unit ',
      ...scriptsMakeCommands,
      ...scriptsStorybook
    }
  })

  api.render('./template/starter', { ...options })
  api.render('./template/storybook', { ...options })
}

const updateProject = (api, options) => {
  let output = ' \n'
  output += 'Updating Project aspects \n'
  options.projectUpdates.forEach((value) => {
    output += '  - ' + value + ' \n'
  })
  output += ' \n'
  console.log(output) // eslint-disable-line
  if (options.projectUpdates.indexOf('Storybook') >= 0) {
    api.extendPackage({
      scripts: {
        ...scriptsStorybook
      },
      devDependencies: {
        ...storybookDependencies
      }
    })

    api.render('./template/storybook', { ...options })
  }

  if (options.projectUpdates.indexOf('Build') >= 0) {
    api.extendPackage({
      scripts: {
        ...scriptsStorybook
      },
      devDependencies: {
        ...buildDependencies
      }
    })

    console.warn('For now we have not added any template files. Perhaps coming soon')
  }

  if (options.projectUpdates.indexOf('Provider') >= 0) {
    api.render('./template/src/Provider.js', { ...options })
    api.render('./template/tests/Provider.tests.js', { ...options })
  }
}

module.exports = async (api, options) => {
  if (options.type === 'Project') {
    if (options.projectType === 'New') {
      makeProject(api, options)
    } else {
      updateProject(api, options)
    }
  }
  if (options.type === 'Component') {
    await require('../lib/commands/make-component').command(api)
  }
  if (options.type === 'Client [Component]') {
    await require('../lib/commands/make-component-client').command(api)
  }
}

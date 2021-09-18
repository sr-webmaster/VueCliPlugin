const path = require('path')
const JestConfig = require('vue-cli-plugin-freshinup-ui/utils/testing/jest.config.core')

module.exports = {
  ...JestConfig,
  modulePaths: [path.resolve('node_modules')],
  collectCoverageFrom: JestConfig.collectCoverageFrom.concat([
    'src/**/*.{js,vue}'
  ]),
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  moduleNameMapper: {
    ...JestConfig.moduleNameMapper,
    '@/(.*)$': '<rootDir>/$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@storybook/.*\\.vue$|vue-cli-plugin-freshinup-ui/.*\\.js))'
  ]
}

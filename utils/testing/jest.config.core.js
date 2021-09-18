const { name } = require(process.cwd() + '/package.json')

module.exports = {
  collectCoverage: true,
  modulePaths: ['node_modules'],
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!**/*.stories.js',
    '!**/stories.js',
    '!**/*.test.js'
  ],
  coverageDirectory: '<rootDir>/tests/.reports/javascript-coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  setupFiles: [
    '<rootDir>/tests/setup.js',
    '<rootDir>/tests/mockDate.js'
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.min.js',
    '^axios$': '<rootDir>/node_modules/axios/index.js',
    '^vuex$': '<rootDir>/node_modules/vuex/dist/vuex.common.js',
    [`${name}/src/(.*)$`]: '<rootDir>/src/$1',
    '@freshinup/(.*)$': '<rootDir>/node_modules/@freshinup/$1',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(@storybook/.*\\.vue$))'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '*.src/.*\\.test\\.js?$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}

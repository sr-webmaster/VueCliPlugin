module.exports = {
  displayName: 'Vue CLI Plugin | FreshinUp UI',
  modulePaths: ['node_modules'],
  collectCoverage: true,
  collectCoverageFrom: [
    'utils/**/*.js'
  ],
  coverageDirectory: '<rootDir>/tests/.reports/javascript-coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageThreshold: {
    global: {
      branches: 69,
      functions: 80,
      lines: 67
    },
    './utils/testing/jest.config.core.js': {
      branches: 0,
      functions: 0,
      lines: 0
    },
    './utils/testing/setup.js': {
      branches: 0,
      functions: 0,
      lines: 0
    },
    './utils/testing/mockDate.js': {
      branches: 0,
      functions: 0,
      lines: 0
    },
    './utils/mockApi.js': {
      branches: 57,
      functions: 56,
      lines: 76
    }
  },
  moduleDirectories: [
    'node_modules'
  ],
  setupFiles: [
    '<rootDir>/tests/requireContext.js'
  ],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '@storybook/addon-actions': '<rootDir>/tests/__mocks__/storybook-addon.js'
  },
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js?$': 'babel-jest',
    'tests/.*\\.test\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@storybook/.*\\.vue$|@freshinup/.*\\.js$|@freshinup/.*\\.vue$))'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/generator/'
  ]
}

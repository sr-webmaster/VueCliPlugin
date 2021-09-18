const buildDependencies = {
  '@babel/core': '7.4.x',
  '@babel/plugin-transform-regenerator': '7.4.x',
  '@babel/plugin-transform-runtime': '7.5.x',
  '@babel/preset-env': '7.4.x',
  '@vue/cli-service': '3.10.x',
  'babel-core': '^7.0.0-bridge.0',
  'babel-loader': '8.0.x',
  'babel-plugin-require-context-hook': '1.0.x',
  'babel-plugin-transform-imports': '1.5.x',
  'core-js': '2.6.x',
  'cross-env': '5.x.x',
  'node-sass': '4.11.x',
  'resolve-url-loader': '2.3.x',
  sass: '1.18.x',
  'sass-loader': '7.1.x',
  stylus: '0.54.x',
  'stylus-loader': '3.0.x',
  'vuetify-loader': '1.3.x',
  'vue-cli-plugin-vuetify': '0.6.x',
  'webpack-cli': '3.x.x'
}

const codeStyleDependencies = {
  'babel-eslint': '^10.0.1',
  eslint: '^5.16.0',
  'eslint-config-standard': '^12.0.0',
  'eslint-plugin-import': '^2.16.0',
  'eslint-plugin-jest': '^22.5.1',
  'eslint-plugin-node': '^8.0.1',
  'eslint-plugin-promise': '^4.1.1',
  'eslint-plugin-standard': '^4.0.0',
  'eslint-plugin-vue': '^5.2.2',
  '@vue/eslint-config-standard': '^4.0.0'
}

const vueDependencies = {
  '@vue/babel-preset-app': '^3.10.0',
  '@vue/cli-plugin-babel': '^3.10.0',
  'babel-preset-vue': '^2.0.2',
  vue: '2.6.x',
  'vue-analytics': '^5.16.4',
  'vue-axios': '^2.1.4',
  'vue-template-compiler': '^2.6.10',
  vuex: '^3.1.0',
  'vuex-map-fields': '^1.3.2',
  'vuex-rest-api': '2.12.0',
  'vue-router': '^3.0.3'
}

const fontAndIconDependencies = {
  '@mdi/font': '^4.4.95',
  '@fortawesome/fontawesome-svg-core': '^1.2.26',
  '@fortawesome/free-solid-svg-icons': '^5.12.0',
  '@fortawesome/vue-fontawesome': '^0.1.9'
}

const vuetifyDependencies = {
  'vee-validate': '^2.2.2',
  vuetify: '^1.5.16'
}

const testDependencies = {
  'babel-jest': '^24.8.0',
  'axios-mock-adapter': '^1.17.0',
  chance: '^1.0.18',
  'jest-cli': '^24.8.0',
  'jest-date-mock': '^1.0.7',
  'jest-serializer-vue': '^2.0.2',
  'jest-transform-stub': '^2.0.0',
  '@vue/test-utils': '^1.0.0-beta.29',
  '@vue/cli-plugin-unit-jest': '^3.10.0'
}

const storybookDependencies = {
  '@storybook/addon-actions': '^5.3.13',
  '@storybook/addon-backgrounds': '^5.3.13',
  '@storybook/addon-docs': '^5.3.13',
  '@storybook/addon-contexts': '^5.3.13',
  '@storybook/addon-knobs': '^5.3.13',
  '@storybook/addon-links': '^5.3.13',
  '@storybook/addon-notes': '^5.3.13',
  '@storybook/addon-options': '^5.3.13',
  '@storybook/addon-storysource': '^5.3.13',
  '@storybook/addon-viewport': '^5.3.13',
  '@storybook/addons': '^5.3.13',
  '@storybook/source-loader': '^5.3.13',
  '@storybook/vue': '^5.3.13',
  'vue-cli-plugin-storybook': '^1.2.0',
  'storybook-vue-router': '^1.0.3'
}

module.exports = {
  dependencies: {
    ...vuetifyDependencies,
    ...vueDependencies,
    ...fontAndIconDependencies,
    '@freshinup/core-ui': 'git+ssh://git@github.com/freshinup/core-ui.git#1.15.0',
    lodash: '^4.17.5'
  },
  devDependencies: {
    ...buildDependencies,
    ...codeStyleDependencies,
    ...testDependencies,
    ...storybookDependencies
  },
  storybookDependencies,
  buildDependencies,
  codeStyleDependencies,
  testDependencies,
  vuetifyDependencies,
  vueDependencies,
  fontAndIconDependencies
}

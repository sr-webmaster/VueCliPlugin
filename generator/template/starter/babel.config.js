module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: '2',
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  env: {
    test: {
      plugins: [
        'require-context-hook'
      ]
    }
  }
}

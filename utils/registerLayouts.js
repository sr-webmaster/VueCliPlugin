const addLayouts = (Vue, context) => {
  context.keys().forEach(key => {
    Vue.component('layout-' + (key.slice(2, -4)), context(key).default)
  })
}

export default (Vue, providers) => {
  providers.forEach((provider) => {
    if (provider.layouts) {
      addLayouts(Vue, provider.layouts)
    }
  })
}

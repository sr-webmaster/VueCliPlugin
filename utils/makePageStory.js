import StoryRouter from 'storybook-vue-router'
import get from 'lodash/get'
import _Vue from 'vue'
import registerLayouts from './registerLayouts'

export default (Component, store, options = {}) => {
  const apiMocked = options.apiMocked
  if (apiMocked && options.apiMockRoutes) {
    apiMocked.reset()
    apiMocked.addRoutes(options.apiMockRoutes).ready()
  }
  if (options.providers) {
    registerLayouts(options.Vue || _Vue, options.providers)
  }
  const wrappedComponent = StoryRouter()(() => ({
    template: `
      <component :is="layout">
        <slot/>
      </component>
    `,
    computed: {
      layout () {
        return 'layout-' + get(Component, 'layout', 'admin')
      }
    },
    beforeCreate () {
      this.$router.matcher.addRoutes([
        {
          path: 'main',
          name: 'main',
          component: Component
        }
      ])
      this.$router.push({ name: 'main' })
    },
    store,
    ...options
  }))
  wrappedComponent.isWrappedByStoryRouter = true
  wrappedComponent.forTesting = {
    store,
    apiMocked,
    apiMockRoutes: options.apiMockRoutes,
    Component
  }
  return wrappedComponent
}

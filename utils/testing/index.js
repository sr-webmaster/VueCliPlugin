import createLocalVue from './createLocalVue'
import { mount as _mount } from '@vue/test-utils'
import omit from 'lodash/omit'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import VueRouter from 'vue-router'

export const mount = (VueClassOrStory, options = {}) => {
  const optionsForMount = omit(options, [
    'pluginValidation',
    'pluginRouter',
    'pluginVuex'
  ])
  if (options.router) {
    options.pluginRouter = true
  }
  const apiMocked = options.apiMocked || VueClassOrStory.apiMocked || get(VueClassOrStory, 'forTesting.apiMocked', null)
  const apiMockRoutes = options.apiMockRoutes || VueClassOrStory.apiMockRoutes || get(VueClassOrStory, 'forTesting.apiMockRoutes', null)
  const thingy = createLocalVue({
    validation: options.pluginValidation,
    router: options.pluginRouter,
    vuex: options.pluginVuex,
    apiMocked,
    apiMockRoutes
  })
  if (isBoolean(options.pluginRouter) ? options.pluginRouter : true) {
    optionsForMount.router = options.router || new VueRouter()
  }
  const VueClass = VueClassOrStory.isWrappedByStoryRouter ? VueClassOrStory.forTesting.Component : VueClassOrStory
  const store = options.store || (VueClassOrStory.isWrappedByStoryRouter ? VueClassOrStory.forTesting.store : VueClassOrStory.store)
  const wrapped = _mount(VueClass, {
    localVue: thingy.localVue,
    store,
    ...optionsForMount
  })
  if (apiMockRoutes) {
    thingy.apiMocked.ready()
  }
  const vm = wrapped.vm
  wrapped.beforeRouteEnterOrUpdate = async (to, from, next) => {
    return VueClass.beforeRouteEnterOrUpdate(vm, to, from, next)
  }
  wrapped.apiMocked = thingy.mock
  wrapped.pvm = vm
  return wrapped
}

import { createLocalVue as _createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { install as installValidationCore } from '@freshinup/core-ui/src/validation'
import mockApi from '../mockApi'
import VueRouter from 'vue-router'

export const installValidation = (Vue) => {
  installValidationCore(Vue)
}

export default (options = { validation: false, vuex: true, router: false, apiMockRoutes: {}, apiMocked: null }) => {
  const localVue = _createLocalVue()
  const apiMocked = options.apiMocked || mockApi({ routes: options.apiMockRoutes || [], axios: options.axios })
  if (options.apiMocked) {
    apiMocked.reset()
    if (options.apiMockRoutes) {
      apiMocked.addRoutes(options.apiMockRoutes)
    }
    apiMocked.ready()
  }
  if (options.validation) {
    installValidation(localVue)
  }
  if (options.vuex) {
    localVue.use(Vuex)
  }
  if (options.router) {
    localVue.use(VueRouter)
  }
  return {
    mock: apiMocked,
    apiMocked,
    localVue
  }
}

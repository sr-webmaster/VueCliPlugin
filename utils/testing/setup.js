const once = require('lodash/once')
const filter = require('lodash/filter')
const isFunction = require('lodash/isFunction')

export const hasIgnorableErrorMessage = (errors, matches) => {
  if (
    errors.length &&
    errors.length > 0
  ) {
    const result = filter(matches, match => {
      if (isFunction(errors[0].includes)) {
        return errors[0].includes(match)
      } else if (errors[0].message) {
        return errors[0].message.includes(match)
      }
      return false
    })
    return (result && result.length === matches.length)
  }
  return false
}

export default (console, Vue) => {
  const logError = console.error
  const logWarn = console.warn
  // eslint-disable-next-line no-console
  const logInfo = console.log

  const logVuetifyBug = once(() => {
    console.warn(`[Vuetify] Multiple instances of Vue detected 
      See https://github.com/vuetifyjs/vuetify/issues/4068
      Basically you cannot use mount from Vue Utils
  `)
  })
  console.error = (...args) => {
    if (hasIgnorableErrorMessage(args, ['Cannot read property \'insertBefore\' of null'])) {
      return
    }
    if (
      args.length &&
      args.length > 0 &&
      isFunction(args[0].includes)
    ) {
      if (args[0].includes('[Vuetify]') && args[0].includes('https://github.com/vuetifyjs/vuetify/issues/4068')) {
        if (process.env.LOG_VUETIFY_WARNINGS) {
          logVuetifyBug()
        }
        return
      }
    }
    logError(...args)
  }

  console.warn = (...args) => {
    if (
      args.length &&
      args.length > 0 &&
      args[0].includes &&
      args[0].includes('[Vuetify]') &&
      args[0].includes('Unable to locate target [data-app]')
    ) {
      if (process.env.LOG_VUETIFY_WARNINGS) {
        logInfo('Vuetify cannot find data-app property in the element tree. This should not be causing any issues.')
      }
      return
    }
    logWarn(...args)
  }
  Vue.config.productionTip = false
}

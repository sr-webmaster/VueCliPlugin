import _axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import capitalize from 'lodash/capitalize'
import endsWith from 'lodash/endsWith'
import pick from 'lodash/pick'
import map from 'lodash/map'

export const _createReady = (adapter) => {
  return (options = { }) => {
    const status = options.status ? options.status : 200
    adapter.onAny().reply(config => {
      console.warn('No mock match for ' + config.url, config)
      return endsWith(config.url, 's') ? [status, {}] : [status, []]
    })
    return adapter
  }
}

export const addRoutesToAdapter = (adapter, routes) => {
  let list = routes
  if (!Array.isArray(routes)) {
    list = map(routes, (value, key) => {
      return {
        path: key,
        ...value
      }
    })
  }
  list.forEach(item => {
    const verbs = pick(item, ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
    Object.keys(verbs).forEach(verb => {
      const args = verbs[verb]
      adapter[`on${capitalize(verb)}`](item.path).reply.apply(null, args)
    })
  })
  return adapter
}

export default (options = {}) => {
  const adapter = new MockAdapter(options.axios || _axios)
  const routes = options.routes || {}
  if (Object.keys(routes).length > 0) {
    addRoutesToAdapter(adapter, routes)
  }
  adapter.ready = _createReady(adapter)
  adapter.addRoutes = (routes) => {
    return addRoutesToAdapter(adapter, routes)
  }
  return adapter
}

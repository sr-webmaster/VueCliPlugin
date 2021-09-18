import { createLocalVue } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import makePageStory from '../../utils/makePageStory'
import { addRoutesToAdapter } from '../../utils/mockApi'
import Provider from '@freshinup/core-ui/src/Provider'

const createMockAdapter = () => {
  const verbs = [
    'Get',
    'Put',
    'Post',
    'Delete'
  ]
  const repliers = {}
  const adapter = {}
  verbs.forEach(verb => {
    adapter[`on${verb}`] = jest.fn((value) => {
      const reply = jest.fn()
      repliers[`${value}|${verb}`] = reply
      return { reply }
    })
  })
  adapter.reset = jest.fn()
  adapter.ready = jest.fn()
  adapter.addRoutes = (routes) => {
    return addRoutesToAdapter(adapter, routes)
  }
  adapter.repliers = repliers
  return adapter
}

describe('Page Story Utils', () => {
  describe('makePageStory()', () => {
    test('adds apiMocked for Testing and mocks matches', () => {
      const apiMocked = createMockAdapter()
      const story = makePageStory({}, new Store(), {
        apiMocked,
        apiMockRoutes: {
          'api/users': {
            POST: [201, { data: { id: 2 } }]
          }
        }
      })
      expect(story.forTesting).toHaveProperty('apiMocked')
      expect(story.forTesting.apiMocked).toHaveProperty('onGet')
      expect(story.forTesting.apiMocked.onPost).toHaveBeenCalledWith('api/users')
      expect(apiMocked.repliers['api/users|Post']).toHaveBeenNthCalledWith(1, 201, { data: { id: 2 } })
    })
    test('when given the Providers list, layouts are added to the Vue instance supplied', () => {
      const localVue = createLocalVue()
      makePageStory({}, new Store(), {
        providers: [
          Provider()
        ],
        Vue: localVue
      })
      expect(Object.keys(localVue.options.components)).toContain('layout-admin')
      expect(Object.keys(localVue.options.components)).toContain('layout-admin-edit')
      expect(Object.keys(localVue.options.components)).toContain('layout-admin-list')
    })
  })
})

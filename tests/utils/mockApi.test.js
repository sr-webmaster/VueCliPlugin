import _axios from 'axios'
import mockApi, { addRoutesToAdapter } from '../../utils/mockApi'

describe('Mock HTTP API Adapter', () => {
  describe('Methods (Interface)', () => {
    describe('mockApi()', () => {
      test('adds axios option as the axiosInstance', () => {
        const axios = _axios.create()
        const result = mockApi({
          axios
        })
        expect(result.axiosInstance).toEqual(axios)
      })
      test('returns with ready method', () => {
        const result = mockApi({})
        expect(typeof result.ready).toEqual('function')
      })
      test('adds routes to handlers', () => {
        const result = mockApi({
          routes: {
            'api/users': {
              POST: [201, { data: { id: 2 } }]
            }
          }
        })
        expect(result.handlers.post).toHaveLength(1)
        expect(result.handlers.post[0]).toContain('api/users')
        expect(result.handlers.post[0]).toContain(201)
      })
    })
    describe('addRoutesToAdapter()', () => {
      test('calls ready on Verbs (GET etc.)', () => {
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
        addRoutesToAdapter(adapter,
          {
            'api/users': {
              POST: [201, { data: { id: 2 } }]
            },
            'api/users/1': {
              POST: [200, {}],
              PUT: [200, {}],
              GET: [200, { data: { id: 1 } }],
              DELETE: [202]
            }
          }
        )
        expect(adapter.onPost).toHaveBeenCalledWith('api/users')
        expect(repliers['api/users|Post']).toHaveBeenNthCalledWith(1, 201, { data: { id: 2 } })

        expect(adapter.onPost).toHaveBeenCalledWith('api/users/1')
        expect(repliers['api/users/1|Post']).toHaveBeenNthCalledWith(1, 200, {})

        expect(adapter.onPut).toHaveBeenCalledWith('api/users/1')
        expect(repliers['api/users/1|Put']).toHaveBeenNthCalledWith(1, 200, {})

        expect(adapter.onGet).toHaveBeenCalledWith('api/users/1')
        expect(repliers['api/users/1|Get']).toHaveBeenNthCalledWith(1, 200, { data: { id: 1 } })

        expect(adapter.onDelete).toHaveBeenCalledWith('api/users/1')
        expect(repliers['api/users/1|Delete']).toHaveBeenNthCalledWith(1, 202)
      })
      test('supports regular expressions as the path matching', () => {
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
        addRoutesToAdapter(adapter, [
          {
            path: /^\/?api\/activity\/v1\/statuses\/?/,
            GET: [200, { data: { id: 1 } }]
          }
        ])
        expect(adapter.onGet).toHaveBeenCalledWith(/^\/?api\/activity\/v1\/statuses\/?/)
        expect(repliers).toHaveProperty('/^\\/?api\\/activity\\/v1\\/statuses\\/?/|Get')
        expect(repliers['/^\\/?api\\/activity\\/v1\\/statuses\\/?/|Get']).toHaveBeenNthCalledWith(1, 200, { data: { id: 1 } })
      })
    })
  })
})

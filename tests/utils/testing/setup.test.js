import { hasIgnorableErrorMessage } from '../../../utils/testing/setup'

describe('Testing Setup', () => {
  describe('hasIgnorableErrorMessage', () => {
    test('returns true for all array items matching exactly', () => {
      const result = hasIgnorableErrorMessage(
        ['There is an error with Vuetify. Please see manual'],
        ['Vuetify', 'manual']
      )
      expect(result).toBe(true)
    })
    test('returns true Vue TypeError', () => {
      const result = hasIgnorableErrorMessage(
        ['Cannot read property \'insertBefore\' of null'],
        ['Cannot read property']
      )
      expect(result).toBe(true)
    })
    test('returns true for all array items matching exactly when Error', () => {
      const result = hasIgnorableErrorMessage(
        [new Error('Cannot read property \'insertBefore\' of null')],
        ['Cannot read property \'insertBefore\' of null']
      )
      expect(result).toBe(true)
    })
  })
})

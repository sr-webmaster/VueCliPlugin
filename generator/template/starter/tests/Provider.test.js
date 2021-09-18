import Provider from '../src/Provider'
import { version, name } from '../package.json'
import isFunction from 'lodash/isFunction'

describe('Provider', () => {
  test('has version from package.json', () => {
    expect(Provider()).toHaveProperty('version', version)
  })
  test('has name from package.json', () => {
    expect(Provider()).toHaveProperty('name', name)
  })
  test('has pages context (actual)', () => {
    expect(Provider()).toHaveProperty('pages')
    expect(isFunction(Provider().pages)).toEqual(false) // Until pages are added we assert false
  })
  test('has store', () => {
    const result = Provider()
    expect(result).toHaveProperty('store')
  })
})

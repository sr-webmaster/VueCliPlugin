import startsWith from 'lodash/startsWith'
import { name } from '../package.json'

describe('Package', () => {
  test('uses namespace', () => {
    expect(startsWith(name, '@freshinup/')).toEqual(true)
  })
})

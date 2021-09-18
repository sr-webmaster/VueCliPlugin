import makePageStory from '~/utils/makePageStory'
import { mount } from '~/utils/testing/index'

const Page = {
  methods: {
    foo: () => 'bar'
  },
  render: () => ''
}

describe('Page Story Utils', () => {
  describe('mount()', () => {
    test('exposes story Page Component Vue instance (including backwards compatibility of pvm)', () => {
      const story = makePageStory(Page)
      const wrapper = mount(story)

      // Standard way
      expect(wrapper.vm.foo()).toEqual('bar')

      // version 2.4.x way (deprecated)
      expect(wrapper.pvm).toBeDefined()
      expect(wrapper.pvm.foo()).toEqual('bar')
      expect(wrapper.pvm === wrapper.vm).toEqual(true)
    })
  })
})

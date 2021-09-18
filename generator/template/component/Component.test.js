import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '<%= packageName %>/src/components/<%= name %>'
import { defaultStory } from './<%= name %>.stories'

describe('<%= name %>', () => {
  describe('Computed', () => {
    // Using shallowMount test the computed properties
    const vm = shallowMount(Component).vm
    expect(vm.myProperty).toEqual('obviously replace me')
  })

  describe('Methods', () => {
    // Using shallowMount test the methods
  })

  describe('Visuals', () => {
    test('defaults', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(defaultStory(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})

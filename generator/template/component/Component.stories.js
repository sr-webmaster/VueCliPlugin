import { MAIN } from '../../../.storybook/categories'
import <%= name %> from './<%= name %>.vue'

export default {
  title: `${MAIN}|<%= name %>`,
  id: '<%= name %>'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const defaultStory = () => ({
  components: {
    <%= name %>
  },
  template: `
    <<%= nameKebab %>></<%= nameKebab %>>
  `
})

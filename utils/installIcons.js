const { library } = require('@fortawesome/fontawesome-svg-core')
const { FontAwesomeIcon } = require('@fortawesome/vue-fontawesome')
const { fas } = require('@fortawesome/free-solid-svg-icons')

/**
 * For backwards compatibility we are only going to load the FontAwesome and other Icons on invocation
 * @param Vue
 */
export default (Vue) => {
  Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
  library.add(fas) // Include needed icons
}

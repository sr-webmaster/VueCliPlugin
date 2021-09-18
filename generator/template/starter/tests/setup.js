import Vuetify from 'vuetify'
import setup from 'vue-cli-plugin-freshinup-ui/utils/testing/setup'
import Vue from 'vue'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'

registerRequireContextHook()
Vue.use(Vuetify)
setup(console, Vue)

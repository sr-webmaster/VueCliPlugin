import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import theme from '@freshinup/core-ui/src/theme'
import '@freshinup/core-ui/src/styles/stylus/main.styl'

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  iconfont: 'fa',
  theme
})

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)

import Vue from 'vue'
<% if (useVuex) { -%>
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './Vuex/Store.js'
<% } -%>
import app from './App.vue'

new Vue({
  el: '#app',<% if (useVuex) { %>
  store: new Vuex.Store(store),<% } %>
  render: (h) => h(app)
})

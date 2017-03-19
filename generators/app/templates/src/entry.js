import Vue from 'vue'
<% if (useVuex) { -%>
import Vuex from 'vuex'
import Store from './Vuex/Store.js'
<% } -%>
import app from './app.vue'

new Vue({
  el: '#app',<% if (useVuex) { %>
  store: new Vuex(Store),<% } %>
  render: (h) => h(app)
})

/* eslint-env jasmine */
import Vue from 'vue'
<% if (useVuex) { -%>
import Vuex from 'vuex'
Vue.use(Vuex)
<% } -%>
import app from './app.vue'

describe('App', () => {
  let Ctor, vm
  beforeEach(() => {
    Ctor = Vue.extend(app)
    vm = new Ctor()
  })
  describe('mounted', () => {
    it('should pass', function () {
      <% if (useVuex) { -%>
      const store = {}
      vm = new Ctor({ store: new Vuex.Store(store) })
      <% } %>
      expect(true).toBe(true)
    })
  })
})

<% if (styleLang === 'css') { -%>
<style>
  #app {
    background-color: red;
  }
  #app p {
    font-weight: bold;
  }
</style>
<% } else if (styleLang === 'scss') { -%>
<style lang="scss">
  #app {
    background-color: red;
    p {
      font-weight: bold;
    }
  }
</style>
<% } -%>
<% if (templateLang === 'pug') { -%>
<template lang="pug">
  #app
    p {{ bar }}
</template>
<% } else if (templateLang === 'html') { -%>
<template>
  <div id="app">
    <p>{{ foo }}</p>
  </div>
</template>
<% } -%>
<script>
  export default {
    data () {
      return {
        foo: 'bar'
      }
    }
  }
</script>

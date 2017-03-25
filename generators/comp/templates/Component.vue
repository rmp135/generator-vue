<% if (styleLang === 'css') { -%>
<style>
  .<%= compname %> {
    background-color: red;
  }
  .<%= compname %> p {
    font-weight: bold;
  }
</style>
<% } else if (styleLang === 'scss') { -%>
<style lang="scss">
  .<%= compname %> {
    background-color: red;
    p {
      font-weight: bold;
    }
  }
</style>
<% } -%>
<% if (templateLang === 'pug') { -%>
<template lang="pug">
  .<%= compname %>
    p {{ foo }}
</template>
<% } else if (templateLang === 'html') { -%>
<template>
  <div class="<%= compname %>">
    <p>{{ foo }}</p>
  </div>
</template>
<% } -%>
<script>
  export default {
    data () {
      return {
        foo: 'Hello World!'
      }
    }
  }
</script>

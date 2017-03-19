/* eslint-disable */
const Generator = require('yeoman-generator')
const startcase = require('lodash.startcase')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.argument('storename', { type: String, required: true });
  }
  initializing () {
    if (!this.config.get('useVuex')) {
      this.env.error('Vuex is not enabled for project.')
    }
  }
  writing () {
    this.fs.copyTpl(
      this.templatePath('Store.js'),
      this.destinationPath(`src/Vuex/${startcase(this.options.storename)}.js`)
    )
    if (this.config.get('useKarma')) {
      this.fs.copyTpl(
        this.templatePath('Store.spec.js'),
        this.destinationPath(`src/Vuex/${startcase(this.options.storename)}.spec.js`)
      )
    }
  }
}

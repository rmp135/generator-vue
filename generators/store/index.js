const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.argument('storename', { type: String, required: true })
  }
  initializing () {
    if (!this.config.get('useVuex')) {
      this.env.error('Vuex is not enabled for project.')
    }
  }
  writing () {
    this.fs.copyTpl(
      this.templatePath('Store.js'),
      this.destinationPath(`src/Vuex/${this.options.storename}.js`)
    )
    if (this.config.get('useKarma')) {
      this.fs.copyTpl(
        this.templatePath('Store.spec.js'),
        this.destinationPath(`src/Vuex/${this.options.storename}.spec.js`),
        { storename: this.options.storename }
      )
    }
  }
}

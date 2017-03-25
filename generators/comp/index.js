const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.argument('compname', { type: String, required: true })
  }
  prompting () {
    const prompts = [{
      type: 'list',
      name: 'templateLang',
      message: 'Templating Language',
      choices: ['html', 'pug']
    }, {
      type: 'list',
      name: 'styleLang',
      message: 'Styling Language',
      choices: ['scss', 'css']
    }]
    return this.prompt(prompts).then((answers) => {
      this.config.set('templateLang', answers.templateLang)
      this.config.set('styleLang', answers.styleLang)
    })
  }
  writing () {
    this.fs.copyTpl(
      this.templatePath('Component.vue'),
      this.destinationPath(`src/${this.options.compname}.vue`),
      { templateLang: this.config.get('templateLang'), styleLang: this.config.get('styleLang') }
    )
    if (this.config.get('useKarma')) {
      this.fs.copyTpl(
        this.templatePath('Component.spec.js'),
        this.destinationPath(`src/${this.options.compname}.spec.js`),
        { useVuex: this.config.get('useVuex') }
      )
    }
  }
}

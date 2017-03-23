const Generator = require('yeoman-generator')
const kebabcase = require('lodash.kebabcase')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.argument('appname', { type: String, required: false })
  }
  submodules () {
    this.composeWith(require.resolve('../comp'), { arguments: ['app'] })
    if (this.config.get('useVuex')) {
      this.composeWith(require.resolve('../store'), { skipPrompts: true, arguments: ['store'] })
    }
  }
  prompting () {
    const prompts = [{
      type: 'list',
      name: 'babelPreset',
      message: 'Babel Preset',
      choices: ['latest', 'env', 'none']
    }, {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: this.options.appname,
      validate (name) {
        if (name === '') {
          return 'A project name is required.'
        } else {
          return true
        }
      }
    }, {
      type: 'confirm',
      name: 'useKarma',
      message: 'Enable Karma + Jasmine?',
      store: true
    }, {
      type: 'confirm',
      name: 'useVuex',
      message: 'Enable Vuex?',
      store: true
    }]
    return this.prompt(prompts).then((answers) => {
      this.options.appname = answers.projectName
      this.config.set('babelPreset', answers.babelPreset)
      this.config.set('useVuex', answers.useVuex)
      this.config.set('useKarma', answers.useKarma)
    })
  }
  writing () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { appname: kebabcase(this.options.appname) }
    )
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        appname: kebabcase(this.options.appname),
        useKarma: this.config.get('useKarma'),
        babelPreset: this.config.get('babelPreset'),
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        styleLang: this.config.get('styleLang')
      }
    )
    this.fs.copyTpl(
      this.templatePath('public'),
      this.destinationPath('public'),
      {
        title: this.options.appname
      }
    )

    this.fs.copyTpl(
      this.templatePath('src/entry.js'),
      this.destinationPath('src/entry.js'),
      {
        useVuex: this.config.get('useVuex'),
        templateLang: this.config.get('templateLang'),
        styleLang: this.config.get('styleLang')
      }
    )

    if (this.config.get('useKarma')) {
      this.fs.copyTpl(
        this.templatePath('src/tests.js'),
        this.destinationPath('src/tests.js')
      )
      this.fs.copyTpl(
        this.templatePath('karma.conf.js'),
        this.destinationPath('karma.conf.js')
      )
    }
  }
  install () {
    const dependencies = [
      'vue',
      'webpack',
      'vue-loader',
      'vue-template-compiler',
      'css-loader',
      'babel-core',
      'babel-loader'
    ]
    if (this.config.get('useVuex')) {
      dependencies.push('vuex')
    }
    if (this.config.get('templateLang') === 'pug') {
      dependencies.push('pug', 'pug-loader')
    }
    if (this.config.get('styleLang') === 'scss') {
      dependencies.push('node-sass', 'sass-loader')
    }
    if (this.config.get('useKarma')) {
      dependencies.push('babel-polyfill', 'jasmine-core', 'karma', 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-webpack', 'phantomjs-prebuilt', 'inject-loader')
    }
    const babelPreset = this.config.get('babelPreset')
    if (babelPreset !== 'none') {
      dependencies.push(`babel-preset-${babelPreset}`)
    }
    this.yarnInstall(dependencies, { dev: true })
  }
  gitInit () {
    this.spawnCommand('git', ['init'])
  }
}

var webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry

// karma.conf.js
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['dots'],
    // this is the entry file for all our tests.
    files: [
      './node_modules/babel-polyfill/dist/polyfill.min.js',
      'src/tests.js'
    ],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      'src/tests.js': ['webpack']
    },
    // use the webpack config
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    client: {
      captureConsole: false
    },
    singleRun: true
  })
}

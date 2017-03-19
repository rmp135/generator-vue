module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'dist/app.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              <% if (styleLang === 'scss') { %>scss: 'vue-style-loader!css-loader!sass-loader',<% } %>
              js: 'babel-loader'
            }
          }
        }]
      },
      <% if (styleLang === 'scss') { %>{ test: /\.css$/, loaders: 'style-loader!css-loader' },<% } %>
      { test: /\.js$/, loaders: 'babel-loader' }
    ]
  }
}

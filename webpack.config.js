const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin')

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"],
    }
  ]
}

module.exports = [
  // CLIENT
  {
    entry: {
      'client': './src/client/index.js',
    },
    target: 'web',
    mode: 'development', 
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/public')
    },
    module: moduleObj,
    plugins: [
      new HtmlWebPackPlugin({
        template: 'src/client/index.html'
      })
    ]
  },
  // SERVER
  {
    entry: {
      'server': './src/server/index.js'
    },
    target: 'node',
    mode: 'development', 
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: moduleObj,
    externals: [nodeExternals()]
  }
]

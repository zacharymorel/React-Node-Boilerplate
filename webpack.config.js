const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin') 
/*
  nodeExternals: EXCLUDES node_modules for wepack build.
  HtmlWebPackPlugin: The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags 
    & CSS files via link tags. 
*/ 

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"], // Loaders allow you to pre-process files as you import or “load” them. 
    }
  ]
}

module.exports = [
  // CLIENT
  {
    entry: {  // The Entry point for Webpack to being it's dependency graph of our files.
      vendors: ['react', 'react-dom'],
      client: './src/client/index.js',
    },
    target: 'web', // Target specifies what environment webpack should compile for, eg, Node || Web
    mode: 'development', // Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
    output: { // output configuration options tells webpack how to write the compiled files to disk. NOTE: only 1 output per webpack modular bundler.
      filename: '[name].[chunkhash].js', // chunkhash useful for caching
      path: path.resolve(__dirname, 'dist/public')
    },
    optimization: {
      splitChunks: { // Caches all dev 3rd party lib so requests from the client won't call a full server
        cacheGroups: {
          vendor: {
            test: 'vendors',
            name: "vendors", 
            chunks: "initial", 
            enforce: true
          }
        }
      }
    },
    module: moduleObj, // The object where we specify what rules and Loaders are needed for Webpack's bundling 
    plugins: [
      new HtmlWebPackPlugin({
        template: 'src/client/index.html'
      }),
      new webpack.NamedModulesPlugin(), // Makes sure there is no unnecessary rebuild of Vendor package. 
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
    externals: [nodeExternals()] // externals configuration option provides a way of excluding dependencies from the output bundles.
  }
]

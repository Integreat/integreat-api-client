const path = require('path')
const nodeExternals = require('webpack-node-externals')
const fs = require('fs')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const dest = path.resolve(__dirname, '../dist')

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest)
}

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: dest,
    filename: 'index-umd.js',
    library: 'integreatapiclient',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    // Disable name mangling so classes keep their name:
    // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/269
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: { // see https://github.com/mishoo/UglifyJS2#minify-options
          mangle: false,
          keep_fnames: true
        }
      })
    ]
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

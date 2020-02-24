const fs = require('fs')
const rimraf = require('rimraf')
const webpack = require('webpack')
const task = require('./task')
const path = require('path')

const prepare = task('prepare', () => {
  const dest = path.resolve(__dirname, '../dist')

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
  fs.copyFileSync('package.json', 'dist/package.json')
})

const bundleUmd = task('bundle-umd', () => {
  const webpackConfig = require('./umd.webpack.config.js')
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackConfig.stats))
        resolve()
      }
    })
  })
})

module.exports = task('build', () => {
  global.DEBUG = process.argv.includes('--debug') || false
  rimraf.sync('www/dist/*', { nosort: true, dot: true })
  return Promise.resolve()
    .then(prepare)
    .then(bundleUmd)
})

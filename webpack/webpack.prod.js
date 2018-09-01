const path = require('path')
const fs = require('fs')
const CONFIG = require('./webpack.config')
const {DIST, SERVER_ENTRY, CONFIG_ENTRY} = CONFIG

const CleanWebpackPlugin = require('clean-webpack-plugin')
function getExternals () {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {})
}
module.exports = {
  target   : 'node',
  mode     : 'production',
  devServer: {
    contentBase: DIST
  },
  //entry    : [SERVER_ENTRY, path.resolve(CONFIG_ENTRY, 'production.js')],
  externals: getExternals(),
  module   : {
    rules: [
      {
        test   : /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader : 'babel-loader',
        //options: {
        //  presets: [['es2015', {modules: false}]],
        //  plugins: ['syntax-dynamic-import']
        //}
      }
    ]
  },
  plugins  : [
    new CleanWebpackPlugin(['dist'])
  ]
}
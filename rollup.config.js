import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
  alias({
    vue: 'node_modules/vue/dist/vue.js'
  }),
  vue({
    css: './public/assets/css/app.css'
  }),
  buble({
    objectAssign: 'Object.assign'
  }),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  nodeGlobals()
]

const config = {
  entry: './src/app.js',
  dest: './public/assets/js/app.js',
  sourceMap: true,
  plugins: plugins
}

if (process.env.NODE_ENV === 'production') {
  config.sourceMap = false
  config.plugins.push(uglify({}, minify))
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(livereload())
  config.plugins.push(serve({
    contentBase: './public/',
    port: 8080,
    open: true
  }))
}

export default config

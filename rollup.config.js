import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

export default {
  entry: './src/app.js',
  plugins: [
    vue({
      css: './public/app.css'
    }),
    buble(),
    nodeResolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  dest: './public/app.js'
}

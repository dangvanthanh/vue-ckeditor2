import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  input: 'src/index.js',
  output: {
    name: 'VueCkeditor2',
    file: 'dist/vue-ckeditor2.esm.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    alias({
      '@': './'
    }),
    vue({
      css: true
    }),
    buble(),
    nodeResolve({ browser: true, jsnext: true, main: true }),
    commonjs(),
    uglify({}, minify)
  ]
}

import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    name: 'VueCkeditor2',
    file: 'dist/vue-ckeditor2.js',
    format: 'umd',
    sourcemap: true
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
    commonjs()
  ]
}

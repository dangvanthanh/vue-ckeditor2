module.exports = {
  plugins: {
    vue: true
  },
  output: {
    format: ['umd', 'cjs', 'es'],
    moduleName: 'VueCkeditor',
    minify: true,
    fileName: 'vue-ckeditor2.[format].js',
    sourceMap: false
  }
};

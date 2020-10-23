import vue from 'rollup-plugin-vue';
import base from './rollup.config.base';
import pkg from '../package.json';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-ckeditor',
    file: pkg.main,
    format: 'umd',
  },
});

config.plugins.push(vue());

export default config;

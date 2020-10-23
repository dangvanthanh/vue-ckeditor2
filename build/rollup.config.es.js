// import { writeFileSync } from 'fs';
import vue from 'rollup-plugin-vue';
// import css from 'rollup-plugin-css-only';
// import CleanCSS from 'clean-css';
import base from './rollup.config.base';
import pkg from '../package.json';

const config = Object.assign({}, base, {
  output: {
    name: 'vue-ckeditor',
    file: pkg.module,
    format: 'es',
  },
});

config.plugins.push(vue({ template: { optimizeSSR: true }, css: false }));
// config.plugins.push(
//   css({
//     output: function (styles) {
//       writeFileSync(
//         'dist/vue-base.esm.css',
//         new CleanCSS().minify(styles).styles
//       );
//     },
//   })
// );

export default config;

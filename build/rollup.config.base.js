import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      mainFields: ['main', 'browser', 'jsnext'],
    }),
    commonjs(),
    filesize(),
  ],
};

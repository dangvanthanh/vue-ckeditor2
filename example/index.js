import Vue from 'vue';
import App from './App.vue';
import VueCkeditor from '../src';

Vue.use(VueCkeditor);

new Vue({
  el: '#app',
  render: h => h(App)
});

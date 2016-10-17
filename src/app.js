import Vue from 'vue'
import Ckeditor from './components/ckeditor.vue'

const app = new Vue({
  el: '#app',
  render: h => h(Ckeditor)
})

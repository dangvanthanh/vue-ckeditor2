import Vue from 'vue'
import Ckeditor from './components/ckeditor.vue'

window.Vue = Vue

const app = new Vue({
  el: '#app',
  components: { Ckeditor }
})

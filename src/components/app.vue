<template>
  <div class="app">
    <ckeditor v-model="content"
              :height="300"
              :toolbar="[['Format']]">
    </ckeditor>
    <h2 class="heading">Raw Html</h2>
    <div class="raw" v-html="content"></div>
  </div>
</template>

<script>
import Ckeditor from './ckeditor.vue'

export default {
  data () {
    return {
      content: ''
    }
  },
  components: { Ckeditor }
}
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
}

.heading {
  margin-top: 25px;
}

.raw {
  margin: 25px 0;
}
</style>

<template>
  <div>
    <vue-ckeditor v-model="content" :config="config" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      config: {
        toolbar: [
          [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript' ]
        ],
        height: 300
      }
    }
  }
}
</script>

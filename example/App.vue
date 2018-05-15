<template>
  <div>
    <vue-ckeditor v-model="content" :config="config" />
    <vue-ckeditor v-model="content" :config="config" types="inline" />

    <pre>
      {{ content }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'Vue.js render function',
      config: {
        toolbar: [['Bold', 'Italic', 'Underline', 'Strike', 'Subscript']],
        height: 300
      }
    };
  }
};
</script>

<template>
  <h1>{{ bundler }}</h1>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      bundler: 'Ckeditor',
    };
  },
};
</script>

<style  scoped>
.container {
  color: green;
}
</style>
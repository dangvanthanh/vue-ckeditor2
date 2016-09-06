<template>
	<div class="app">
			<textarea name="ckeditor" id="ckeditor" v-ckeditor="editorcontent" :editorcontent="editorcontent" debounce="100"></textarea>
	</div>
</template>

<script>
import Ckeditor from './ckeditor-directive'

export default {
	directives: {
    Ckeditor
  },
  data () {
    return {
			editorcontent: ''
    }
  }
};
</script>

<style>
.app {
	max-width: 40em;
	margin: 20px auto;
}
</style>

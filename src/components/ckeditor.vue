<template>
	<div class="ckeditor">
			<textarea ref="editor" id="editor"></textarea>
	</div>
</template>

<script>
export default {
  props: ['value', 'options'],
	mounted () {
		let self = this

		CKEDITOR.replace(this.$refs.editor.id, {
      toolbar: [
        ['Format'], ['Bold', 'Italic'], ['Undo', 'Redo']
      ]
    })
	}
}
</script>

<style>
.ckeditor {
	max-width: 40em;
	margin: 20px auto;
}
</style>

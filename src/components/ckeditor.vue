<template>
	<div class="ckeditor">
			<textarea ref="editor" id="editor" placeholder="Post body" :value="value"></textarea>
	</div>
</template>

<script>
export default {
  props: {
		value: {
      type: String
    },
    toolbar: {
      type: Array,
      default: () => [['Format'], ['Bold', 'Italic'], ['Undo', 'Redo']]
    }
	},
  mounted () {
    CKEDITOR.replace(this.$refs.editor.id, {
      toolbar: this.toolbar
    })

		CKEDITOR.instances.editor.setData(this.value)
		CKEDITOR.instances.editor.on('change', () => {
			this.$emit('input', CKEDITOR.instances.editor.getData())
		})
  },
  destroyed () {
		if (CKEDITOR.instances.editor) {
			CKEDITOR.instances.editor.destroy()
		}
  }
}
</script>

<style>
.ckeditor {
	width: 100%;
	clear: both;
}
</style>

<template>
	<div class="ckeditor">
		<textarea :id="id" :placeholder="placeholder" :value="value" :cols="cols" :row="row"></textarea>
	</div>
</template>
<script>
	export default{
		props: {
			value: {
				type: String
			},
			id: {
				type: String,
				default: 'editor'
			},
			cols: {
				type: Number,
				default: 80
			},
			row: {
				type: Number,
				default: 10,
			},
			placeholder: {
				type: String,
				default: 'Post body'
			},
			toolbar: {
				type: Array,
				default: () => [['Format'], ['Bold', 'Italic'], ['Undo', 'Redo']]
			},
			language: {
				type: String,
				default: 'en'
			}
		},
		mounted () {
			CKEDITOR.replace( this.id, {
				toolbar: this.toolbar,
				language: this.language
			})

			CKEDITOR.instances[this.id].setData(this.value)
			CKEDITOR.instances[this.id].on('change', () => {
				this.$emit('input', CKEDITOR.instances[this.id].getData())
			})
		},
		destroyed () {
			if (CKEDITOR.instances[this.id]) {
				CKEDITOR.instances[this.id].destroy()
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

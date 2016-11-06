<template>
	<div class="ckeditor">
		<textarea :id="id" :value="value"></textarea>
	</div>
</template>
<script type="text/babel">
	export default{
		props: {
			value: {
				type: String
			},
			id: {
				type: String,
				default: 'editor'
			},
			width: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: '200px',
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
				language: this.language,
				width: this.width,
				height: this.height
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

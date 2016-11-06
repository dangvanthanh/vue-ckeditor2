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
		beforeUpdate () {
	  const ckeditorId = this.id

			if(this.value != CKEDITOR.instances[ckeditorId].getData()) CKEDITOR.instances[ckeditorId].setData(this.value)
		},
		mounted () {
      const ckeditorId = this.id

			CKEDITOR.replace(ckeditorId, {
				toolbar: this.toolbar,
				language: this.language,
				width: this.width,
				height: this.height
			})

			CKEDITOR.instances[ckeditorId].setData(this.value)
			CKEDITOR.instances[ckeditorId].on('change', () => {
				let ckeditorData=CKEDITOR.instances[ckeditorId].getData()
				if(ckeditorData != this.value) this.$emit('input', CKEDITOR.instances[ckeditorId].getData())
			})
		},
		destroyed () {
      const ckeditorId = this.id

			if (CKEDITOR.instances[ckeditorId]) {
				CKEDITOR.instances[ckeditorId].destroy()
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

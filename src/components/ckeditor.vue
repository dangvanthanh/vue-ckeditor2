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
			height: {
				type: Number,
				default: 200,
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

       if (this.value != CKEDITOR.instances[ckeditorId].getData()) {
         CKEDITOR.instances[ckeditorId].setData(this.value)
       }
		},
		mounted () {
      const ckeditorId = this.id

			CKEDITOR.replace(ckeditorId, {
				toolbar: this.toolbar,
				language: this.language,
				height: this.height
			})

			CKEDITOR.instances[ckeditorId].setData(this.value)
			CKEDITOR.instances[ckeditorId].on('change', () => {
				let ckeditorData = CKEDITOR.instances[ckeditorId].getData()
				if (ckeditorData !== this.value) {
          this.$emit('input', ckeditorData)
        }
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

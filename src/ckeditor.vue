<template>
    <div class="ckeditor">
        <textarea :id="id" :value="value"></textarea>
    </div>
</template>

<script>
var inc = 0
export default {
  props: {
    value: {
      type: String
    },
    id: {
      type: String,
      default: () => `editor-${++inc}`
    },
    height: {
      type: String,
      default: '200px'
    },
    toolbar: {
      type: [String, Array],
      default: null
    },
    language: {
      type: String,
      default: 'en'
    },
    extraplugins: {
      type: String,
      default: ''
    }
  },
  computed: {
    instance() {
      return CKEDITOR.instances[this.id]
    }
  },
  beforeUpdate () {
    if (this.value !== this.instance.getData()) {
      this.instance.setData(this.value)
    }
  },
  mounted () {
    let config = {
      toolbar: this.toolbar,
      language: this.language,
      height: this.height,
      extraPlugins: this.extraplugins
    }
    CKEDITOR.replace(this.id, config)

    this.instance.on('change', () => {
      let html = this.instance.getData()
      if (html !== this.value) {
        this.$emit('input', html)
      }
    })
  },
  beforeDestroy () {
    if (this.instance) {
      this.instance.focusManager.blur(true)
      this.instance.destroy()
    }
  }
}
</script>
<style>
.ckeditor::after {
  content: "";
  display: table;
  clear: both;
}
</style>


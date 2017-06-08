<template>
    <div class="ckeditor">
        <textarea :name="name" :id="id" :value="value" :types="types" :config="config"></textarea>
    </div>
</template>

<script>
let inc = 0

export default {
  props: {
    name: {
      type: String,
      default: () => `editor-${++inc}`
    },
    value: {
      type: String
    },
    id: {
      type: String,
      default: () => `editor-${inc}`
    },
    types: {
      type: String,
      default: () => `classic`
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    instance () {
      return CKEDITOR.instances[this.id]
    }
  },
  beforeUpdate () {
    if (this.value !== this.instance.getData()) {
      this.instance.setData(this.value)
    }
  },
  mounted () {
    if (typeof CKEDITOR === 'undefined') {
    console.log('CKEDITOR is missing (http://ckeditor.com/)')
    } else {
      if (this.types === 'inline') {
          CKEDITOR.inline(this.id, this.config)
      } else {
          CKEDITOR.replace(this.id, this.config)
      }

      this.instance.on('change', () => {
        let html = this.instance.getData()
        if (html !== this.value) {
          this.$emit('input', html)
        }
      })
    }
  },
  beforeDestroy () {
    if (this.instance) {
      this.instance.focusManager.blur(true)
      this.instance.removeAllListeners()
      this.instance.destroy()
      this.instance = null
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

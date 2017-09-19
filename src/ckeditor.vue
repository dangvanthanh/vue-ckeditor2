<template>
    <div class="ckeditor">
        <textarea
          :name="name"
          :id="id"
          :value="value"
          :types="types"
          :config="config">
        </textarea>
    </div>
</template>

<script>
export default {
  name: 'vue-ckeditor',
  props: {
    name: {
      type: String,
      default: () => `editor-1`
    },
    value: {
      type: String
    },
    id: {
      type: String,
      default: () => `editor-1`
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
  data () {
    return { destroyed: false }
  },
  computed: {
    instance () {
      return CKEDITOR.instances[this.id]
    }
  },
  watch: {
    value (val) {
      if (this.instance) {
        let html = this.instance.getData()
        if (val !== html) {
          this.instance.setData(val)
        }
      }
    }
  },
  mounted () {
    this.create()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    create () {
      if (typeof CKEDITOR === 'undefined') {
        console.log('CKEDITOR is missing (http://ckeditor.com/)')
      } else {
        if (this.types === 'inline') {
            CKEDITOR.inline(this.id, this.config)
        } else {
            CKEDITOR.replace(this.id, this.config)
        }

        this.instance.on('change', this.onChange)
        this.instance.on('blur', this.onBlur)
        this.instance.on('focus', this.onFocus)
      }
    },
    destroy () {
      if (!this.destroyed) {
        this.instance.focusManager.blur(true)
        this.instance.removeAllListeners()
        this.instance.destroy()
        this.destroyed = true
      }
    },
    onChange () {
      let html = this.instance.getData()
      if (html !== this.value) {
        this.$emit('input', html)
        this.$emit('update:value', html)
      }
    },
    onBlur () {
      this.$emit('blur', this.instance)
    },
    onFocus () {
      this.$emit('focus', this.instance)
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

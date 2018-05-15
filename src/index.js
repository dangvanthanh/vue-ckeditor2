export const VueCkeditor = (opts = {}) => {
  const name = opts.name || 'VueCkeditor';
  let inc = new Date().getTime();

  return {
    name: name,
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
    data() {
      return {
        destroyed: false,
        instanceValue: ''
      };
    },
    computed: {
      instance() {
        return CKEDITOR.instances[this.id];
      }
    },
    watch: {
      value(val) {
        try {
          if (this.instance) {
            this.update(val);
          }
        } catch (e) {}
      }
    },
    mounted() {
      this.create();
    },
    beforeDestroy() {
      this.destroy();
    },
    render(h) {
      return h('div', { class: 'ckeditor' }, [
        h('textarea', {
          attrs: {
            name: this.name,
            id: this.id
          },
          props: {
            types: this.types,
            config: this.config
          },
          domProps: {
            value: this.value
          }
        })
      ]);
    },
    methods: {
      create() {
        if (typeof CKEDITOR === 'undefined') {
          console.log('CKEDITOR is missing (http://ckeditor.com/)');
        } else {
          if (this.types === 'inline') {
            CKEDITOR.inline(this.id, this.config);
          } else {
            CKEDITOR.replace(this.id, this.config);
          }

          this.instance.setData(this.value);
          this.instance.on('instanceReady', () => {
            this.instance.setData(this.value);
          });
          this.instance.on('change', this.onChange);
          this.instance.on('blur', this.onBlur);
          this.instance.on('focus', this.onFocus);
          this.instance.on('fileUploadResponse', () => {
            setTimeout(() => {
              this.onChange;
            }, 0);
          });
        }
      },
      update(val) {
        if (this.instanceValue !== val) {
          this.instance.setData(val, { internal: false });
        }
      },
      destroy() {
        try {
          if (!this.destroyed) {
            this.instance.focusManager.blur(true);
            this.instance.removeAllListeners();
            this.instance.destroy();
            this.destroyed = true;
          }
        } catch (e) {}
      },
      onChange() {
        let html = this.instance.getData();
        if (html !== this.value) {
          this.$emit('input', html);
          this.instanceValue = html;
        }
      },
      onBlur() {
        this.$emit('blur', this.instance);
      },
      onFocus() {
        this.$emit('focus', this.instance);
      }
    }
  };
};

export const install = (Vue, opts) => {
  const Component = VueCkeditor(opts);
  Vue.component(Component.name, Component);
};

export default install;

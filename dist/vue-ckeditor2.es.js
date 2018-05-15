var VueCkeditor = function VueCkeditor() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = opts.name || 'VueCkeditor';
  var inc = new Date().getTime();
  return {
    name: name,
    props: {
      name: {
        type: String,
        default: function _default() {
          return "editor-".concat(++inc);
        }
      },
      value: {
        type: String
      },
      id: {
        type: String,
        default: function _default() {
          return "editor-".concat(inc);
        }
      },
      types: {
        type: String,
        default: function _default() {
          return "classic";
        }
      },
      config: {
        type: Object,
        default: function _default() {}
      }
    },
    data: function data() {
      return {
        destroyed: false,
        instanceValue: ''
      };
    },
    computed: {
      instance: function instance() {
        return CKEDITOR.instances[this.id];
      }
    },
    watch: {
      value: function value(val) {
        try {
          if (this.instance) {
            this.update(val);
          }
        } catch (e) {}
      }
    },
    mounted: function mounted() {
      this.create();
    },
    beforeDestroy: function beforeDestroy() {
      this.destroy();
    },
    render: function render(h) {
      return h('div', {
        class: 'ckeditor'
      }, [h('textarea', {
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
      })]);
    },
    methods: {
      create: function create() {
        var _this = this;

        if (typeof CKEDITOR === 'undefined') {
          console.log('CKEDITOR is missing (http://ckeditor.com/)');
        } else {
          if (this.types === 'inline') {
            CKEDITOR.inline(this.id, this.config);
          } else {
            CKEDITOR.replace(this.id, this.config);
          }

          this.instance.setData(this.value);
          this.instance.on('instanceReady', function () {
            _this.instance.setData(_this.value);
          });
          this.instance.on('change', this.onChange);
          this.instance.on('blur', this.onBlur);
          this.instance.on('focus', this.onFocus);
          this.instance.on('fileUploadResponse', function () {
            setTimeout(function () {
              _this.onChange;
            }, 0);
          });
        }
      },
      update: function update(val) {
        if (this.instanceValue !== val) {
          this.instance.setData(val, {
            internal: false
          });
        }
      },
      destroy: function destroy() {
        try {
          if (!this.destroyed) {
            this.instance.focusManager.blur(true);
            this.instance.removeAllListeners();
            this.instance.destroy();
            this.destroyed = true;
          }
        } catch (e) {}
      },
      onChange: function onChange() {
        var html = this.instance.getData();

        if (html !== this.value) {
          this.$emit('input', html);
          this.instanceValue = html;
        }
      },
      onBlur: function onBlur() {
        this.$emit('blur', this.instance);
      },
      onFocus: function onFocus() {
        this.$emit('focus', this.instance);
      }
    }
  };
};
var install = function install(Vue, opts) {
  var Component = VueCkeditor(opts);
  Vue.component(Component.name, Component);
};

export default install;
export { VueCkeditor, install };

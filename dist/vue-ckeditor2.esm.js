import t from 'vue-runtime-helpers/dist/normalize-component.js';
var n = new Date().getTime();
export default t(
  {
    render: function() {
      var t = this.$createElement,
        n = this._self._c || t;
      return n('div', { staticClass: 'ckeditor' }, [
        n('textarea', {
          attrs: {
            name: this.name,
            id: this.id,
            types: this.types,
            config: this.config,
            disabled: this.readOnlyMode
          },
          domProps: { value: this.value }
        })
      ]);
    },
    staticRenderFns: []
  },
  void 0,
  {
    name: 'VueCkeditor',
    props: {
      name: {
        type: String,
        default: function() {
          return 'editor-'.concat(++n);
        }
      },
      value: { type: String },
      id: {
        type: String,
        default: function() {
          return 'editor-'.concat(n);
        }
      },
      types: {
        type: String,
        default: function() {
          return 'classic';
        }
      },
      config: { type: Object, default: function() {} },
      instanceReadyCallback: { type: Function },
      readOnlyMode: {
        type: Boolean,
        default: function() {
          return !1;
        }
      }
    },
    data: function() {
      return { instanceValue: '' };
    },
    computed: {
      instance: function() {
        return CKEDITOR.instances[this.id];
      }
    },
    watch: {
      value: function(t) {
        try {
          this.instance && this.update(t);
        } catch (t) {}
      },
      readOnlyMode: function(t) {
        this.instance.setReadOnly(t);
      }
    },
    mounted: function() {
      this.create();
    },
    methods: {
      create: function() {
        var t = this;
        'undefined' == typeof CKEDITOR
          ? console.log('CKEDITOR is missing (http://ckeditor.com/)')
          : ('inline' === this.types
              ? CKEDITOR.inline(this.id, this.config)
              : CKEDITOR.replace(this.id, this.config),
            this.instance.setData(this.value),
            this.instance.on('instanceReady', function() {
              t.instance.setData(t.value);
            }),
            this.instance.on('change', this.onChange),
            this.instance.on('mode', this.onMode),
            this.instance.on('blur', function(n) {
              t.$emit('blur', n);
            }),
            this.instance.on('focus', function(n) {
              t.$emit('focus', n);
            }),
            this.instance.on('contentDom', function(n) {
              t.$emit('contentDom', n);
            }),
            CKEDITOR.on('dialogDefinition', function(n) {
              t.$emit('dialogDefinition', n);
            }),
            this.instance.on('fileUploadRequest', function(n) {
              t.$emit('fileUploadRequest', n);
            }),
            this.instance.on('fileUploadResponse', function(n) {
              setTimeout(function() {
                t.onChange();
              }, 0),
                t.$emit('fileUploadResponse', n);
            }),
            void 0 !== this.instanceReadyCallback &&
              this.instance.on('instanceReady', this.instanceReadyCallback),
            this.$once('hook:beforeDestroy', function() {
              t.destroy();
            }));
      },
      update: function(t) {
        this.instanceValue !== t && this.instance.setData(t, { internal: !1 });
      },
      destroy: function() {
        try {
          var t = window.CKEDITOR;
          t.instances && t.instances[this.id] && t.instances[this.id].destroy();
        } catch (t) {}
      },
      onMode: function() {
        var t = this;
        if ('source' === this.instance.mode) {
          var n = this.instance.editable();
          n.attachListener(n, 'input', function() {
            t.onChange();
          });
        }
      },
      onChange: function() {
        var t = this.instance.getData();
        t !== this.value && (this.$emit('input', t), (this.instanceValue = t));
      }
    }
  },
  void 0,
  !1,
  void 0,
  void 0,
  void 0
);

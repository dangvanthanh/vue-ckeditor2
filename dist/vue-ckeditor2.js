(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueCkeditor2 = factory());
}(this, (function () { 'use strict';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .ckeditor::after { content: \"\"; display: table; clear: both; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();












var inc = new Date().getTime();

var Ckeditor = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ckeditor"},[_c('textarea',{attrs:{"name":_vm.name,"id":_vm.id,"types":_vm.types,"config":_vm.config},domProps:{"value":_vm.value}})])},staticRenderFns: [],
  name: 'vue-ckeditor',
  props: {
    name: {
      type: String,
      default: function () { return ("editor-" + (++inc)); }
    },
    value: {
      type: String
    },
    id: {
      type: String,
      default: function () { return ("editor-" + inc); }
    },
    types: {
      type: String,
      default: function () { return "classic"; }
    },
    config: {
      type: Object,
      default: function () {}
    }
  },
  data: function data () {
    return { destroyed: false }
  },
  computed: {
    instance: function instance () {
      return CKEDITOR.instances[this.id]
    }
  },
  watch: {
    value: function value (val) {
      try {
        if (this.instance) {
          this.update(val);
        }
      } catch (e) {}
    }
  },
  mounted: function mounted () {
    this.create();
  },
  beforeDestroy: function beforeDestroy () {
    this.destroy();
  },
  methods: {
    create: function create () {
      var this$1 = this;

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
          this$1.instance.setData(this$1.value);
        });
        this.instance.on('change', this.onChange);
        this.instance.on('blur', this.onBlur);
        this.instance.on('focus', this.onFocus);
      }
    },
    update: function update (val) {
      var html = this.instance.getData();
      if (html !== val) {
        this.instance.setData(val, { internal: false });
      }
    },
    destroy: function destroy () {
      if (!this.destroyed) {
        this.instance.focusManager.blur(true);
        this.instance.removeAllListeners();
        this.instance.destroy();
        this.destroyed = true;
      }
    },
    onChange: function onChange () {
      var html = this.instance.getData();
      if (html !== this.value) {
        this.$emit('input', html);
      }
    },
    onBlur: function onBlur () {
      this.$emit('blur', this.instance);
    },
    onFocus: function onFocus () {
      this.$emit('focus', this.instance);
    }
  }
}

return Ckeditor;

})));
//# sourceMappingURL=vue-ckeditor2.js.map

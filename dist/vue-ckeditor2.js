(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueCkeditor2 = factory());
}(this, (function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var inc = new Date().getTime();

  var script = {
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
        try {
          if (!this.destroyed) {
            this.instance.focusManager.blur(true);
            this.instance.removeAllListeners();
            this.instance.destroy();
            this.destroyed = true;
          }
        } catch (e) {}
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

  var __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ckeditor" }, [
      _c("textarea", {
        attrs: {
          name: _vm.name,
          id: _vm.id,
          types: _vm.types,
          config: _vm.config
        },
        domProps: { value: _vm.value }
      })
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  var __vue_template__ = typeof __vue_render__ !== 'undefined'
    ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }
    : {};
  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-73c25e97_0", { source: "\n.ckeditor::after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = script$$1 || {};

    {
      component.__file = "/Users/dangvanthanh/Code/dev/vue/vue-ckeditor2/src/Ckeditor.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = {};
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */


  var Ckeditor = __vue_normalize__(
    __vue_template__,
    __vue_inject_styles__,
    typeof __vue_script__ === 'undefined' ? {} : __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {},
    typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {}
  )

  return Ckeditor;

})));

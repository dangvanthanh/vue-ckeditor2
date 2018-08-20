(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.VueCkeditor = {}));
})(this, function(exports) {
  'use strict';

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
  //
  var inc = new Date().getTime();
  var script = {
    name: 'VueCkeditor',
    props: {
      name: {
        type: String,
        default: function _default() {
          return 'editor-'.concat(++inc);
        }
      },
      value: {
        type: String
      },
      id: {
        type: String,
        default: function _default() {
          return 'editor-'.concat(inc);
        }
      },
      types: {
        type: String,
        default: function _default() {
          return 'classic';
        }
      },
      config: {
        type: Object,
        default: function _default() {}
      },
      instanceReadyCallback: {
        type: Function
      },
      readOnlyMode: {
        type: Boolean,
        default: function _default() {
          return false;
        }
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
      },
      readOnlyMode: function readOnlyMode(val) {
        this.instance.setReadOnly(val);
      }
    },
    mounted: function mounted() {
      this.create();
    },
    beforeDestroy: function beforeDestroy() {
      this.destroy();
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
          this.instance.on('instanceReady', function() {
            _this.instance.setData(_this.value);
          });
          this.instance.on('change', this.onChange);
          this.instance.on('mode', this.onMode);
          this.instance.on('blur', this.onBlur);
          this.instance.on('focus', this.onFocus);
          this.instance.on('fileUploadResponse', function() {
            setTimeout(function() {
              _this.onChange();
            }, 0);
          });

          if (typeof this.instanceReadyCallback !== 'undefined') {
            this.instance.on('instanceReady', this.instanceReadyCallback);
          }
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
      },
      onMode: function onMode() {
        var _this2 = this;

        if (this.instance.mode === 'source') {
          var editable = this.instance.editable();
          editable.attachListener(editable, 'input', function() {
            _this2.onChange();
          });
        }
      }
    }
  };

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c(
      'div',
      {
        staticClass: 'ckeditor'
      },
      [
        _c('textarea', {
          attrs: {
            name: _vm.name,
            id: _vm.id,
            types: _vm.types,
            config: _vm.config,
            disabled: _vm.readOnlyMode
          },
          domProps: {
            value: _vm.value
          }
        })
      ]
    );
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* component normalizer */

  function __vue_normalize__(
    template,
    style,
    script$$1,
    scope,
    functional,
    moduleIdentifier,
    createInjector,
    createInjectorSSR
  ) {
    var component =
      (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {}; // For security concerns, we use only base name in production mode.

    component.__file =
      '/Users/dangvanthanh/Code/dev/vue/vue-ckeditor2/src/VueCkeditor.vue';

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles =
      __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style =
        styles[group] ||
        (styles[group] = {
          ids: [],
          parts: [],
          element: undefined
        });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;
        style.ids.push(id);

        if (isOldIE) {
          style.element =
            style.element ||
            document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = (style.element = document.createElement('style'));
          el.type = 'text/css';
          if (css.media) el.setAttribute('media', css.media);

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
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var VueCkeditor = __vue_normalize__(
    {
      render: __vue_render__,
      staticRenderFns: __vue_staticRenderFns__
    },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

  exports.default = VueCkeditor;

  Object.defineProperty(exports, '__esModule', { value: true });
});

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
//

let inc = new Date().getTime();

var script = {
  name: 'VueCkeditor',
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
    },
    instanceReadyCallback: {
      type: Function
    },
    readOnlyMode: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
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
    },
    readOnlyMode(val) {
      this.instance.setReadOnly(val);
    }
  },
  mounted() {
    this.create();
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

        // Ckeditor change event
        this.instance.on('change', this.onChange);

        // Ckeditor mode html or source
        this.instance.on('mode', this.onMode);

        // Ckeditor blur event
        this.instance.on('blur', evt => {
          this.$emit('blur', evt);
        });

        // Ckeditor focus event
        this.instance.on('focus', evt => {
          this.$emit('focus', evt);
        });

        // Ckeditor contentDom event
        this.instance.on('contentDom', evt => {
          this.$emit('contentDom', evt);
        });

        // Ckeditor dialog definition event
        CKEDITOR.on('dialogDefinition', evt => {
          this.$emit('dialogDefinition', evt);
        });

        // Ckeditor file upload request event
        this.instance.on('fileUploadRequest', evt => {
          this.$emit('fileUploadRequest', evt);
        });

        // Ckditor file upload response event
        this.instance.on('fileUploadResponse', evt => {
          setTimeout(() => {
            this.onChange();
          }, 0);
          this.$emit('fileUploadResponse', evt);
        });

        // Listen for instanceReady event
        if (typeof this.instanceReadyCallback !== 'undefined') {
          this.instance.on('instanceReady', this.instanceReadyCallback);
        }

        // Registering the beforeDestroyed hook right after creating the instance
        this.$once('hook:beforeDestroy', () => {
          this.destroy();
        });
      }
    },
    update(val) {
      if (this.instanceValue !== val) {
        this.instance.setData(val, { internal: false });
        this.instanceValue = val;
      }
    },
    destroy() {
      try {
        let editor = window['CKEDITOR'];
        if (editor.instances && editor.instances[this.id]) {
          editor.instances[this.id].destroy();
        }
      } catch (e) {}
    },
    onMode() {
      if (this.instance.mode === 'source') {
        let editable = this.instance.editable();
        editable.attachListener(editable, 'input', () => {
          this.onChange();
        });
      }
    },
    onChange() {
      let html = this.instance.getData();
      if (html !== this.value) {
        this.$emit('input', html);
        this.instanceValue = html;
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "ckeditor" }, [
    _vm._ssrNode(
      "<textarea" +
        _vm._ssrAttr("name", _vm.name) +
        _vm._ssrAttr("id", _vm.id) +
        _vm._ssrAttr("types", _vm.types) +
        _vm._ssrAttr("config", _vm.config) +
        _vm._ssrAttr("disabled", _vm.readOnlyMode) +
        _vm._ssrAttr("value", _vm.value) +
        "></textarea>"
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = "data-v-e640e3d2";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

// Declare install function excuted by Vue.use()
function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;
  Vue.component('VueCkeditor', __vue_component__);
}

const plugin = { install };

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { install };

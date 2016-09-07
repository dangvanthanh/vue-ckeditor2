var Ckeditor$1 = {
  deep: true,
  twoWay: true,
  params: ['editorcontent'],
  setupEditor: function setupEditor () {
    var self = this
    CKEDITOR.replace(self.el.id, {
      toolbar: [
        ['Format'], ['Bold', 'Italic'], ['Undo', 'Redo']
      ]
    })
    CKEDITOR.instances[self.el.id].on('change', function () {
      self.set(CKEDITOR.instances[self.el.id].getData())
    })
  },
  bind: function bind () {
    this.vm.$nextTick(this.setupEditor.bind(this))
  },
  update: function update (value) {
    var self = this

    if (!CKEDITOR.instances[self.el.id]) {
      return Vue.nextTick(self.update.bind(this, value))
    }

    CKEDITOR.instances[self.el.id].setData(value)
  },
  unbind: function unbind () {
    CKEDITOR.instances[this.el.id].destroy()
  }
}

var Ckeditor = { template: "<div class=ckeditor><textarea class=ckeditor__textarea name=ckeditor id=ckeditor v-ckeditor=editorcontent :editorcontent=editorcontent debounce=100></textarea></div>",
	directives: {
    Ckeditor: Ckeditor$1
  },
  data: function data () {
    return {
			editorcontent: ''
    }
  }
}

var app = new Vue({
  el: '#app',
  components: { Ckeditor: Ckeditor }
})
export default {
  deep: true,
  twoWay: true,
  params: ['editorcontent'],
  setupEditor() {
    var self = this
    CKEDITOR.replace(self.el.id, {
      toolbar: [
        ['Format'], ['Bold', 'Italic'], ['Undo', 'Redo']
      ]
    })
    CKEDITOR.instances[self.el.id].on('change', () => {
      self.set(CKEDITOR.instances[self.el.id].getData())
    })
  },
  bind() {
    this.vm.$nextTick(this.setupEditor.bind(this))
  },
  update(value) {
    var self = this

    if (!CKEDITOR.instances[self.el.id]) {
      return Vue.nextTick(self.update.bind(this, value))
    }

    CKEDITOR.instances[self.el.id].setData(value)
  },
  unbind() {
    CKEDITOR.instances[this.el.id].destroy()
  }
}

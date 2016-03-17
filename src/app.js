import Vue from 'vue';

Vue.directive('ckeditor', {
	twoWay: true,

	params: ['content'],

	setupEditor() {
		var self = this;
		CKEDITOR.replace(self.el.id);
		CKEDITOR.instances[self.el.id].on('change', () => {
			self.set(CKEDITOR.instances[self.el.id].getData());
		});
	},

	bind() {
		this.vm.$nextTick(this.setupEditor.bind(this));
	},

	update(value) {
		var self = this;

		if (!CKEDITOR.instances[self.el.id]) {
			return Vue.nextTick(self.update.bind(this, value));
		}

		CKEDITOR.instances[self.el.id].setData(value);
	},

	unbind() {
		CKEDITOR.instances[this.el.id].destroy();
	}
})

const app = new Vue({
	el: '#app',
	data: {
		content: ''
	},
	computed: {
		isVisbleContent() {
			return this.content !== '';
		}
	}
});

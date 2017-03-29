# vue-ckeditor

> Ckeditor using for Vue.js 2

![](https://raw.githubusercontent.com/dangvanthanh/vue-ckeditor2/master/screenshot.png)

## Notes

- If you use Vue.js 1x please reference from [Ckeditor Vue 1x](https://github.com/dangvanthanh/vue-ckeditor/tree/1.0)

## Requirements

- [Ckeditor](http://ckeditor.com/) >= 4
- [Vue.js](http://vuejs.org/) >= 2

## Install

```
# yarn (recommend)
$ yarn add vue-ckeditor2

# npm
$ npm install vue-ckeditor2 --save
```

## Usage

### .vue files

#### Single ckeditor
```html
<template>
  <div class="app">
    <ckeditor v-model="content" :config="config"></ckeditor>
  </div>
</template>

<script>
import Ckeditor from 'vue-ckeditor2'

export default {
  data () {
    return {
      content: '',
      config: {
        toolbar: [
          [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ]
        ],
        height: 300
      }
    }
  },
  components: { Ckeditor }
}
</script>
```

#### Multi ckeditor
```html
<template>
  <div class="app">
    <ckeditor v-model="contentA" :config="configA"></ckeditor>
    <ckeditor v-model="contentB" :config="configB"></ckeditor>
  </div>
</template>

<script>
import Ckeditor from 'vue-ckeditor2'

export default {
  data () {
    return {
      contentA: '',
      configA: {
        toolbar: [[ 'Bold' ]],
        height: 300
      },
      contentB: '',
      configB: {
        toolbar: [[ 'Italic' ]],
        height: 150
      }
    }
  },
  components: { Ckeditor }
}
</script>
```

## Props

| Name           | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `id`           | `String` | Id of instance ckedior. **Default: editor-1** |
| `config`       | `Object` | All configuration of ckeditor. **Default: {}** |

## Build Setup

You can use [vue-cli](https://github.com/vuejs/vue-cli) with [vue-rollup-boilerplate templates](https://github.com/dangvanthanh/vue-rollup-boilerplate) or [other vue templates](https://github.com/vuejs-templates)

## Team

[![Dang Van Thanh](https://avatars3.githubusercontent.com/u/2674850?v=3&s=80)](https://github.com/dangvanthanh) | [![Eduárd Moldován](https://avatars3.githubusercontent.com/u/1571258?v=3&s=80)](https://github.com/edimoldovan) | [![Dominique FERET](https://avatars1.githubusercontent.com/u/7206135?v=3&s=80)](https://github.com/DominiqueFERET) | [![comfuture](https://avatars0.githubusercontent.com/u/151300?v=3&s=80)](https://github.com/comfuture)
---|---|--- | ---
[Dang Van Thanh](https://github.com/dangvanthanh) | [Eduárd Moldován](https://github.com/edimoldovan) | [Dominique FERET](https://github.com/DominiqueFERET) | [comfuture](https://github.com/comfuture)

## License

MIT © [Dang Van Thanh](http://dangthanh.org)

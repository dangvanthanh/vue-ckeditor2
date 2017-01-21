# vue-ckeditor

> Ckeditor using for Vue.js 2

![](screenshot.png)

## Notes

- If you use Vue.js 1x please reference from [Ckeditor Vue 1x](https://github.com/dangvanthanh/vue-ckeditor/tree/1.0)

## Install

```
# yarn (recommend)
$ yarn install vue-ckeditor

# npm
$ npm install vue-ckeditor --save
```

## Usage

### .vue files

#### Single ckeditor
```html
<template>
  <div class="app">
    <ckeditor v-model="content" :height="'300px'" :toolbar="[['Format']]"></ckeditor>
  </div>
</template>

<script>
import Ckeditor from 'vue-ckeditor'

export default {
  data () {
    return {
      content: ''
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
    <ckeditor v-model="contentA" :id="editorA" :height="'300px'" :toolbar="[['Format']]"></ckeditor>
    <ckeditor v-model="contentB" :id="editorB" :height="'300px'" :toolbar="[['Format']]"></ckeditor>
  </div>
</template>

<script>
import Ckeditor from 'vue-ckeditor'

export default {
  data () {
    return {
      editorA: 'editor-a',
      contentA: '',
      editorB: 'editor-b'
      contentB: ''
    }
  },
  components: { Ckeditor }
}
</script>
```

## Build Setup

You can use [vue-cli](https://github.com/vuejs/vue-cli) with [vue-rollup-boilerplate](https://github.com/dangvanthanh/vue-rollup-boilerplate).

## Team

[![Dang Van Thanh](https://avatars3.githubusercontent.com/u/2674850?v=3&s=100)](https://github.com/dangvanthanh) | [![Eduárd Moldován](https://avatars3.githubusercontent.com/u/1571258?v=3&s=100)](https://github.com/edimoldovan) | [![Dominique FERET](https://avatars1.githubusercontent.com/u/7206135?v=3&s=100)](https://github.com/DominiqueFERET)
---|---|---
[Dang Van Thanh](https://github.com/dangvanthanh) | [Eduárd Moldován](https://github.com/edimoldovan) | [Dominique FERET](https://github.com/DominiqueFERET)

## License

MIT © [Dang Van Thanh](http://dangthanh.org)

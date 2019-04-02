# vue-ckeditor

> Ckeditor using for Vue.js 2

![](https://raw.githubusercontent.com/dangvanthanh/vue-ckeditor2/master/screenshot.png)

## Requirements

- [Ckeditor](http://ckeditor.com/) >= 4
- [Vue.js](http://vuejs.org/) >= 2

## Install

### CDN

```html
<script src="https://unpkg.com/vue-ckeditor2"></script>
```

### NPM

```
$ npm install vue-ckeditor2 --save
```

## Usage

> This document applies to v2.0+. If you are looking for older versions, docs are [here](https://github.com/dangvanthanh/vue-ckeditor2/wiki/Getting-Started)

### Component

Then in your component:

```vue
<template>
  <div>
    <vue-ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)"
      @contentDom="onContentDom($event)"
      @dialogDefinition="onDialogDefinition($event)"
      @fileUploadRequest="onFileUploadRequest($event)"
      @fileUploadResponse="onFileUploadResponse($event)" />
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2';

export default {
  components: { VueCkeditor },
  data() {
    return {
      content: '',
      config: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
        ],
        height: 300
      }
    };
  },
  methods: {
    onBlur(evt) {
      console.log(evt);
    },
    onFocus(evt) {
      console.log(evt);
    },
    onContentDom(evt) {
      console.log(evt);
    },
    onDialogDefinition(evt) {
      console.log(evt);
    },
    onFileUploadRequest(evt) {
      console.log(evt);
    },
    onFileUploadResponse(evt) {
      console.log(evt);
    }
  }
};
</script>
```

### Props

| Name                    | Type       | Description                                                                  |
| ----------------------- | ---------- | ---------------------------------------------------------------------------- |
| `name`                  | `String`   | Name of instance ckedior. **Default: editor- **                              |
| `id`                    | `String`   | Id of instance ckedior. **Default: editor-1**                                |
| `types`                 | `String`   | Types of ckedior. **Default: classic**                                       |
| `config`                | `Object`   | All configuration of ckeditor. **Default: {}**                               |
| `instanceReadyCallback` | `Function` | Optional function that will be attached to CKEditor instanceReady event.     |
| `readOnlyMode`          | `Boolean`  | Option setReadOnly editor initializes in the proper mode. **Default: false** |

### Events

| Name                 | Description                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blur`               | Fired when the editor instance loses the input focus.                                                                                                             |
| `focus`              | Fired when the editor instance receives the input focus.                                                                                                          |
| `contentDom`         | Event fired when the editor content (its DOM structure) is ready                                                                                                  |
| `dialogDefinition`   | Event fired when a dialog definition is about to be used to create a dialog into an editor instance                                                               |
| `fileUploadRequest`  | Event fired when the [file loader](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_fileTools_fileLoader.html) should send XHR                             |
| `fileUploadResponse` | Event fired when the [file loader](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_fileTools_fileLoader.html) response is received and needs to be parsed |

## Build Setup

You can use [vue-cli](https://github.com/vuejs/vue-cli) with [vue-rollup-boilerplate templates](https://github.com/dangvanthanh/vue-rollup-boilerplate) or [other vue templates](https://github.com/vuejs-templates)

## Created By

- [Dang Van Thanh](https://github.com/dangvanthanh)

Thanks to:

- [Eduárd Moldován](https://github.com/edimoldovan)
- [Dominique FERET](https://github.com/DominiqueFERET)
- [comfuture](https://github.com/comfuture)
- [旺旺](https://github.com/chengpan168)
- [Tony Yip](https://github.com/tonyhhyip)
- [Nedyalko Dyakov](https://github.com/ndyakov)
- [Bryan Miller](https://github.com/bryanjamesmiller)
- [Jeff Omiecinski](https://github.com/omiecinski)
- [rlfscin](https://github.com/rlfscin)
- [Renato Souza](https://github.com/renatosistemasvc)
- [Fernando Morgenstern](https://github.com/fernandomm)
- [Christoph-Wagner](https://github.com/Christoph-Wagner)
- [Patrick Davey](https://github.com/patrickdavey)
- [Michali Sarris](https://github.com/msarris)

## License

MIT © [Dang Van Thanh](http://dangthanh.org)

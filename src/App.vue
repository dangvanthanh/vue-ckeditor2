<template>
  <div class="app">
    <h1>Ckeditor 4 using with Vue.js</h1>
    <h2>
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="31.719" height="31.719"><path d="M30.347 12.832h-2.546V8.034h2.546c.759 0 1.372-.614 1.372-1.373 0-.758-.613-1.373-1.372-1.373H2.478v10.29h27.869c.759 0 1.372-.614 1.372-1.373s-.614-1.373-1.372-1.373zm-5.291 0H5.223V8.034h19.833v4.798zM1.373 16.139a1.372 1.372 0 1 0 0 2.747h2.545v4.799H1.373a1.373 1.373 0 1 0 0 2.746H29.24V16.14H3.918l-2.545-.001zm5.29 2.745h19.833v4.799H6.663v-4.799z"/></svg>
      Classic editor
    </h2>
    <ckeditor v-model="classic.content" :config="classic.config"/>
    <h2>
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="31.719" height="31.719"><path d="M30.347 12.832h-2.546V8.034h2.546c.759 0 1.372-.614 1.372-1.373 0-.758-.613-1.373-1.372-1.373H2.478v10.29h27.869c.759 0 1.372-.614 1.372-1.373s-.614-1.373-1.372-1.373zm-5.291 0H5.223V8.034h19.833v4.798zM1.373 16.139a1.372 1.372 0 1 0 0 2.747h2.545v4.799H1.373a1.373 1.373 0 1 0 0 2.746H29.24V16.14H3.918l-2.545-.001zm5.29 2.745h19.833v4.799H6.663v-4.799z"/></svg>
      Inline editor
    </h2>
    <ckeditor v-model="inline.content" :config="inline.config" types="inline"/>
  </div>
</template>

<script>
import Ckeditor from '@/components/Ckeditor.vue'

export default {
  name: 'app',
  components: { Ckeditor },
  data () {
    return {
      classic: {
        content: 'The three greatest things you learn from traveling',
        config: {
          toolbar: [
            ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
          ]
        }
      },
      inline: {
        content: 'Monthly travel news and inspiration',
        config: {
          toolbar: [
            ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
          ]
        }
      }
    }
  }
}
</script>

<style>
.app {
  max-width: 760px;
  margin: 0 auto;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  margin-top: -3px;
}
</style>

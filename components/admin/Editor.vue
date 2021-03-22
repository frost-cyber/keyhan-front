<template>
  <div>
    <TinyMCE v-model="content" @input="handleInput" :inital="true" inital-value="بررسی خودرا وارد نمایید" api-key="njaj317q8zpesyb5je3znfi3pdzsfcyn11g2c7v8id8dm7df" :init="init"/>
  </div>
</template>

<script>
import TinyMCE from '@tinymce/tinymce-vue'

export default {
  name: "editor",
  components: {
    TinyMCE,

  },
  data(){
    return {
      filePicker:null,
      content: this.value,
      plugins: [
        'paste', 'importcss', 'searchreplace', 'autolink',
        'directionality', 'visualblocks', 'visualchars', 'image',
        'link', 'media', 'table', 'charmap', 'hr', 'anchor', 'toc',
        'insertdatetime', 'advlist', 'lists', 'wordcount',
        'noneditable', 'help', 'charmap', 'emoticons'],
      toolbar:[
        ['fontselect fontsizeselect formatselect'],
        ['bold italic underline strikethrough'],
        ['forecolor backcolor removeformat'],
        ['alignleft aligncenter alignright alignjustify'],
        ['outdent indent'],
        ['numlist bullist'],
        ['pagebreak'],
        ['insertfile image link anchor'],
        ['rtl ltr'],
        ['charmap emoticons'],
        ['undo redo'],
      ],
    }
  },
  props: {
    'value':{
      type: String,
      required:true,
    },
  },
  computed: {
    toolbarGen(){
      let toolbar = []
      this.toolbar.forEach(tool => toolbar.push(tool.join(' ')))
      return toolbar.join(' | ')
    },
    init() {
      return {
        plugins: this.plugins,
        menubar: 'file edit view insert format tools table help',
        toolbar: this.toolbarGen,
        toolbar_sticky: false,
        image_advtab: true,
        importcss_append: true,
        language: 'fa_IR',
        language_url: '/tinymce/fa_IR.js',
        directionality: 'rtl',
        file_picker_callback: this.file_picker_callback,
        height: '50vh',
        image_caption: true,
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'Scrolling',
        contextmenu: 'link image imagetools table',
        skin: false ? 'oxide-dark' : 'oxide',
        content_css: false ? 'dark' : 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }
    }
  },
  methods: {
    handleInput(e){
      this.$emit('input' , this.content)
    },
    selectFile(){
      let input = document.createElement('input')
      input.type='file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event){
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadEditorImage' , file)
      this.filePicker(this.$store.getters['files/getFile'].link , {alt:'Image'})
    },
    async file_picker_callback (callback, value, meta) {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {text: 'My text'});
      }
      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        this.filePicker = callback
        this.selectFile()
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg'});
      }
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="body">
    <vheader></vheader>
    <nuxt/>
    <vfooter></vfooter>

  </div>
</template>
<script>

  import VHeader from "./Template/Header.vue";
  import VFooter from "./Template/Footer.vue";
  import '@/assets/css/style.css' ;//tailwind
  import '@/assets/css/fontawesome.min.css' //fontawesome

  export default {
    head: {
      htmlAttrs: {
        dir: 'ltr'
      }
    },
    name: 'Main',
    components: {
      vheader: VHeader,
      vfooter: VFooter,
    },
    mounted() {
      //   document.documentElement.setAttribute('dir' , 'ltr')
    }
  }
</script>

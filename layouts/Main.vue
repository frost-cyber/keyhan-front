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

export default {
  scrollToTop: true,
  name: 'Main',
  head: {
    htmlAttrs:{
      dir:'rtl'
    }
  },
  components: {
    vheader: VHeader,
    vfooter: VFooter,
  },
}
</script>
<style>
@import "~assets/css/style.css";
</style>

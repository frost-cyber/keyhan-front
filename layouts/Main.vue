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
  async fetch(){
    await this.$store.dispatch('settings/getFooter').then(res => {
      this.$store.commit('settings/SET_FOOTER', res.options)
    })
    await this.$store.dispatch('settings/getHeader').then(res => {
      this.$store.commit('settings/SET_HEADER', res.options)
    })
  },
}
</script>
<style>
@import "~assets/css/style.css";
</style>

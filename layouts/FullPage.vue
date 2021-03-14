<template>
  <div id="app" :class="vueAppClasses">
      <div class="layout--full-page">
        <Nuxt @setAppClasses="setAppClasses"/>
      </div>
  </div>
</template>

<script>
import themeConfig from '@/plugins/themeConfig.js'

export default {
  name:'FullPage',
  data() {
    return {
      vueAppClasses: []
    }
  },
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val)
    },
    '$vs.rtl'(val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr')
    }
  },
  methods: {
    toggleClassInBody(className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      } else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      } else {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr)
    },
    handleWindowResize() {
      let windowInnerWidth = 0
      if (process.client) {
        windowInnerWidth = window.innerWidth
      }
      this.$store.commit('UPDATE_WINDOW_WIDTH', windowInnerWidth)

      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    },
    handleScroll() {
      let windowScrollY = 0
      if (process.client) {
        windowScrollY = window.scrollY
      }
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y',)
    }
  },
  mounted() {
    document.documentElement.setAttribute('dir', this.$vs.rtl ? 'rtl' : 'ltr')

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)
    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    this.handleWindowResize()
    this.handleScroll()
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('resize', this.handleWindowResize)
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}

</script>

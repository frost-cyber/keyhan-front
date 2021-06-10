<template>
  <div class="layout--main min-h-screen" :class="[vueAppClasses , layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]">
    <v-nav-menu :navMenuItems="navMenuItems" parent=".layout--main"/>
    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay"/>
      <!-- Navbar -->
      <template>
        <the-navbar-vertical :navbarColor="navbarColor" :class="[{'text-white' : isNavbarDark  && !isThemeDark},{'text-base'  : !isNavbarDark && isThemeDark}]" />
      </template>
      <!-- /Navbar -->
      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">

            <transition :name="routerTransition">

              <div v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="router-header flex flex-wrap items-center mb-6">
                <div class="content-area__heading" :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}">
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb class="ml-4 md:block hidden" v-if="$route.meta.breadcrumb" :route="$route" :isRTL="$vs.rtl"/>

              </div>
              <div v-else-if="/^\/admin(\/.+)$/i.test($route.path)">
                <NuxtLink to=".">
                  <feather-icon icon="ArrowRightIcon"/>
                </NuxtLink>
              </div>
            </transition>

            <div class="content-area__content">
              <back-to-top bottom="5%" :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top"/>
              </back-to-top>

              <transition :name="routerTransition" mode="out-in">
                <Nuxt @changeRouteTitle="changeRouteTitle" @setAppClasses="setAppClasses"/>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HNavMenu from '@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue'
import navMenuItems from '@/plugins/navMenuItems.js'
import TheNavbarHorizontal from '@/layouts/components/navbar/TheNavbarHorizontal.vue'
import TheNavbarVertical from '@/layouts/components/navbar/TheNavbarVertical.vue'
import TheFooter from '@/layouts/components/TheFooter.vue'
import themeConfig from '@/plugins/themeConfig.js'
import VNavMenu from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'

export default {
  scrollToTop: true,
  middleware: process.env.AUTH_OFF ? [] : ['auth', 'isAdmin'],
  name: "MainDashboard",
  components: {
    HNavMenu,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu
  },
  data() {
    return {
      vueAppClasses: [],
      footerType: themeConfig.footerType || 'static',
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || '#fff',
      navbarType: themeConfig.navbarType || 'floating',
      navMenuItems,
      routerTransition: themeConfig.routerTransition || 'none',
      routeTitle: this.$route.meta.pageTitle
    }
  },
  watch: {
    '$route'() {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark(val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    '$store.state.mainLayoutType'(val) {
      this.setNavMenuVisibility(val)
    },
    '$store.state.theme'(val) {
      this.toggleClassInBody(val)
    },
    '$vs.rtl'(val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr')
    }
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.bodyOverlay
    },
    contentAreaClass() {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default') return 'content-area-reduced'
        else if (this.verticalNavMenuWidth === 'reduced') return 'content-area-lg'
        else return 'content-area-full'
      } else return 'content-area-full'
    },
    footerClasses() {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    isAppPage() {
      return this.$route.meta.no_scroll
    },
    isThemeDark() {
      return this.$store.state.theme === 'dark'
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType
    },
    navbarClasses() {
      return {
        'navbar-hidden': this.navbarType === 'hidden',
        'navbar-sticky': this.navbarType === 'sticky',
        'navbar-static': this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title
    },
    updateNavbarColor(val) {
      this.navbarColor = val
      if (val === '#fff') this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    setNavMenuVisibility(layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
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
  async created() {
    const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)


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

    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('resize', this.handleWindowResize)
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style lang="scss">
@import "~assets/scss/main.scss";
</style>
<style>
@import "~assets/css/main.css";
</style>

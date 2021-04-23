export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Keyhan',
    htmlAttrs: {
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'material-icons/iconfont/material-icons.css', //Material Icons
    'vuesax/dist/vuesax.css',
    '@/assets/css/iconfont.css',
    '@/assets/css/fontawesome.all.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "@/plugins/plugins.js", mode: 'client'},
    {src: "@/plugins/Api.js"},
    {src: "@/plugins/veeValidate.js"},
    {src: '@/plugins/vuesax.config.js'},
    {src: '@/plugins/themeConfig.js'},
    {src: '@/plugins/filters.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://server.keyhan.p',
    proxy: true,
    credentials: true
  },
  proxy: {
    '/laravel': {
      target: 'https://laravel-auth.nuxtjs.app',
      pathRewrite: { '^/laravel': '/' }
    }
  },
  auth: {
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: 'http://server.keyhan.p'
      },
    },
    redirect: {
      login: '/auth/checkusername',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layouts: true
    },
    extractCss : true,
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        // tailwindcss :require('tailwindcss'),
        autoprefixer: require('autoprefixer'),
        'postcss-rtl': require('postcss-rtl'),
      },
      preset: {
        // Change the postcss-preset-env settings
      }
    },
    transplite: [
      'BackToTop',
      'VuePerfectScrollbar',
      'draggable',
    ]
  },

  serverMiddleware: [
    '~/serverMiddleware/selectiveSSR.js'
  ]
}

<template>
  <div class="footer-row mt-14 relative">
    <footer class="footer py-9 bg-cool-100">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 md:col-span-6 lg:col-span-4 text-center order-1 md:order-1 lg:order-1">
            <div class="title-footer">
              <h4 class=" relative text-xl text-center text-cool-800 font-bold pb-2 border-b-2 border-cool-700 inline-block px-5 title-border">
                اطلاعات تماس با ما
              </h4>
            </div>
            <div class="info-box text-right bg-ff bg-opacity-50 rounded-lg shadow-xl mt-4 p-3">
              <div class="bg-cool-50 rounded-lg p-4 text-cool-500 shadow-my ">
                <figure class="mb-3">
                  <i class="fal fa-map-marker-alt text-2xl ml-2"></i>
                  <span class="text-sm font-thin">
                    {{ (setting.contacts || {}).address }}
                  </span>
                </figure>
                <figure class="mb-3">
                  <i class="fal fa-phone text-2xl ml-2"></i>
                  <span class="text-sm font-thin">{{ (setting.contacts || {}).phone1 }}</span>
                </figure>
                <figure class="mb-3" v-if="(setting.contacts||{}).phone2">
                  <i class="fal fa-phone text-2xl ml-2"></i>
                  <span class="text-sm font-thin"> {{ (setting.contacts || {}).phone2 }}</span>
                </figure>
                <figure class="mb-3 pb-4 border-b border-dashed border-cool-400" v-if="(setting.contacts||{}).mobile">
                  <i class="fal fa-mobile text-2xl ml-2"></i>
                  <span class="text-sm font-thin">{{ (setting.contacts || {}).mobile }}</span>
                </figure>
                <div class="social-btn text-center">
                  <template v-for="(socialNetwork , index) in setting.socialNetworks">
                    <span class="mx-2 text-2xl shadow-neon p-2.5 w-11 h-11">
                      <a class="text-center rounded-lg text-cool-400 bg-cool-100 inline-block" :key="index" :href="socialNetwork.link">
                        <i class="fab" :class="socialNetwork.icon"></i>
                      </a>
                    </span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-12 lg:col-span-4 text-center lg:flex lg:items-end align-bottom order-2 md:order-3 lg:order-2">
            <div class="bax-namadha">
              <div class="backtotop mb-14 sticky bottom-10 right-3 z-10 m-auto block">
                <span id="button" class="mx-2 text-2xl shadow-neon p-2 w-11 h-11 text-center rounded-lg text-cool-400 bg-cool-100 inline-block cursor-pointer" @click.prevent="backToTop">
                  <i class="fal fa-arrow-up "></i>
                </span>
              </div>
              <div class="title-footer">
                <h4 class=" relative text-xl text-center text-cool-800 font-bold pb-2 border-b-2 border-cool-700 inline-block px-5 title-border">
                  نمادها و مجوزها
                </h4>
              </div>
                <div class="info-box text-right bg-ff bg-opacity-50 rounded-lg shadow-xl mt-4 p-3">
                  <div class="grid grid-cols-6 gap-2">
                    <div class="bg-cool-50 rounded-lg p-4 text-cool-500 shadow-my col-span-2" v-for="(license , index) in setting.licenses" :key="index">
                    <div class="img-namadha">
                      <a :href="license.link">
                        <img class="m-auto" :src="license.src" :alt="license.alt"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-4 text-center order-3 md:order-2 lg:order-3">
            <div class="title-footer">
              <h4 class=" relative text-xl text-center text-cool-800 font-bold pb-2 border-b-2 border-cool-700 inline-block px-5 title-border">
                پیونـــدها و لینک ها
              </h4>
            </div>
            <div class="info-box text-right bg-ff bg-opacity-50 rounded-lg shadow-xl mt-4 p-3">
              <div class="bg-cool-50 rounded-lg p-4 text-cool-500 shadow-my ">
                <div class="footer-menu">
                  <ul>
                    <li v-for="(link , index) in setting.links" :key="index">
                      <a :href="link.link">
                        {{ link.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <section class="copyright py-4">
      <div class="container mx-auto">
        <div class="grid grid-cols-2 gap-30">
          <div class="col-span-2 md:col-span-1 md:flex md:items-center">
            <p class="text-center md:text-right text-sm font-light text-cool-600">
              تمامی حقوق کپی رایت نزدی ایناست
            </p>
          </div>
          <div class="col-span-2 md:col-span-1">
            <p class="text-center md:text-left text-sm font-light text-cool-600">
              طراحی و توسعه توسط
              <a class="inline-block " href="https://viranika.com/">
                <img class="inline-block" src="@/assets/img/viranika.svg" alt=""/>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  computed: {
    setting() {
      return this.$store.getters['settings/getFooter']
    }
  },
  async fetch() {
    await this.$store.dispatch('settings/getFooter').then(res => {
      this.$store.commit('settings/SET_FOOTER', res.options)
    })
  },
  methods: {
    backToTop() {
      let interval = setInterval(() => {
        if (document.documentElement.scrollTop > 0) {
          document.documentElement.scrollTop -= (document.documentElement.scrollTop / 15)
        } else {
          clearInterval(interval)
        }
      }, 10)
    }
  }
}
</script>


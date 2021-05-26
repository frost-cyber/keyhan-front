<template>
  <div class="home-page">
    <!-- slider -->
    <section class="slider-row py-6">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 md:col-span-9 slider-area ltr">
            <carousel v-if="setting.slider.length" :items="1" :autoplayHoverPause="true" :autoplay="true" :nav="false" :margin="5" :loop="true">
              <nuxt-link :to="slide.link" v-for="(slide , index) in setting.slider" :key="index">
                <img :src="slide.src" :alt="slide.alt"/>
              </nuxt-link>
            </carousel>
          </div>
          <div class="col-span-12 md:col-span-3 banner-area">
            <div class="grid grid-cols-2 gap-5">
              <div class="col-span-1 md:col-span-2 banner-top">
                <a :href="setting.sliderBanners[0].link">
                  <img class="rounded-lg" :src="setting.sliderBanners[0].src || require('@/assets/img/banner/banner01.jpg')" :alt="setting.sliderBanners[0].alt"/>
                </a>
              </div>
              <div class="col-span-1 md:col-span-2 banner-bottom">
                <a :href="setting.sliderBanners[1].link">
                  <img class="rounded-lg" :src="setting.sliderBanners[1].src || require('@/assets/img/banner/banner02.jpg')" :alt="setting.sliderBanners[1].alt"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- category product -->
    <categories :categories="setting.categories"></categories>
    <!-- brands -->
    <brands :brands="setting.brands"></brands>
    <!-- product carousel -->
    <section v-if="recommendedProducts.length" class="title-section mt-24 relative">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-1">
            <h3 class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5">
              محصولات پیشنهادی
            </h3>
          </div>
          <div class="col-span-1 text-left">
            <a class="more-border relative text-xs lg:text-base font-thin text-cool-700 border-b-2 border-cool-600 pb-3 px-6 " href="">
              مشاهـــــده هـــمــــه
            </a>
          </div>
        </div>
      </div>
    </section>
    <products v-if="recommendedProducts.length" :products="recommendedProducts"></products>
    <!-- course carousel -->
    <section v-if="courses.length" class="title-section mt-10 relative">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-1">
            <h3 class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5 ">
              دوره های آموزش
            </h3>
          </div>
          <div class="col-span-1 text-left">
            <a class="more-border relative text-xs lg:text-base font-thin text-cool-700 border-b-2 border-cool-600 pb-3 px-6 " href="">
              مشاهـــــده هـــمــــه
            </a>
          </div>
        </div>
      </div>
    </section>
    <courses v-if="courses.length" :courses="courses"></courses>
    <!-- contact form -->
    <section class="contact-row">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30 border-cool-100 border shadow-xl rounded-lg">
          <div class="col-span-12 md:col-span-6 p-4">
            <h3 class="font-bold text-xl md:text-2xl">
              سوال دارم و میخوام با شما مشورت کنم
            </h3>
            <p class="font-thin text-xs md:text-base mt-2">
              :)برای اینکه بتونیم کمکت کنیم فرم زیر رو پر کن ،در اسرع وقت باهات
              تماس میگیریم
            </p>
            <div class="form-contact">
             <form data-vv-scope="advice">
                 <vs-input class="contactform mt-6" v-model="advice.name" name="name"  v-validate="'required'" placeholder="نام و نام خانوادگی" size="small"  data-vv-as="نام"/>
                 <span class="text-danger text-sm" v-show="errors.has('advice.name')">{{ errors.first('advice.name') }}</span>
                 <vs-input class="contactform mt-3" v-model="advice.phone" name="phone"  v-validate="'required'"  placeholder="شماره تماس شما" size="small"  data-vv-as="شماره تماس"/>
                 <span class="text-danger text-sm" v-show="errors.has('advice.phone')">{{ errors.first('advice.phone') }}</span>
                 <vs-input class="contactform mt-3" v-model="advice.subject"  name="subject" v-validate="'required'" placeholder="موضوع مورد سوال شما" size="small"  data-vv-as="موضوع"/>
                 <span class="text-danger text-sm" v-show="errors.has('advice.subject')">{{ errors.first('advice.subject') }}</span>

               <div class="mt-3 text-sm">
                 <vs-button color="#F97316" type="filled" @click.native="saveAdvice">ثبت درخواست شما</vs-button>
               </div>
             </form>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 bg-contact rounded-t-lg rounded-l-lg relative"></div>
        </div>
      </div>
    </section>
    <!-- blog -->
    <section v-if="articles.length" class="title-section mt-24 relative mb-8">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-2">
            <h3 class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5">
              دانشنامه
            </h3>
          </div>
        </div>
      </div>
    </section>
    <section v-if="articles.length" class="blog-row">
      <div class="container mx-auto">
        <articles :articles="articles"></articles>
        <div class="col-span-12 text-center">
          <nuxt-link class="more-border relative text-xs lg:text-base font-thin text-cool-700 border-b-2 border-cool-600 pb-3 px-6" :to="{name:'articles'}">مشاهـــــده هـــمــــه</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import brands from "@/components/front/home/brands";
import courses from "@/components/front/home/courses";
import categories from "@/components/front/home/categories";
import products from "@/components/front/home/products";
import articles from "@/components/front/home/articles";

export default {
  layout: 'Main',
  name: 'Index',
  components: {
    brands,
    categories,
    products,
    courses,
    articles,
  },
  async beforeCreate() {
    await this.$store.dispatch('settings/getHome').then(res => {
      this.$store.commit('settings/SET_HOME', res.options)
    })
    await this.$store.dispatch('products/getProducts', {
      categories: this.$store.getters['settings/getHome'].productsRecommended.categories,
      products: this.$store.getters['settings/getHome'].productsRecommended.products,
      limit: 4,
      latest: true,
      with: ['files', 'variants']
    })
    await this.$store.dispatch('products/getProductsArchive', {
      type: 3,
      limit: 4,
      latest: true,
      with: ['files', 'variants']
    }).then(res => {
      this.courses = []
      res.data.data.forEach((product) => {
        let variant = product.variants.reduce((bestVariant, variant) => {
          return (variant.selling_price < bestVariant.selling_price) && variant.inventory !== 0 ? variant : bestVariant
        })
        this.courses.push({
          name: product.name,
          slug: product.slug,
          type: product.type,
          description: product.description,
          thumbnail: product.files[0].link,
          inventory: variant.inventory,
          discounted_price: variant.discounted_price,
          selling_price: variant.selling_price,
        })
      })
    })
    this.$store.dispatch('article/getArticles', {
      limit: 4,
      sort:'+created_at'
    }).then(res => {
      this.articles = []
      res.data.forEach(article => {
        this.articles.push({
          name: article.name,
          slug: article.slug,
          img: article.files[0].link,
          description: article.description,
        })
      })
    })
  },
  computed: {
    setting() {
      return this.$store.getters['settings/getHome']
    },
    recommendedProducts() {
      let products = []
      this.$store.getters['products/getProducts'].forEach((product) => {
        let variant = product.variants.reduce((bestVariant, variant) => {
          return (variant.selling_price < bestVariant.selling_price) && variant.inventory !== 0 ? variant : bestVariant
        })
        products.push({
          name: product.name,
          slug: product.slug,
          type: product.type,
          description: product.description,
          thumbnail: product.files[0].link,
          inventory: variant.inventory,
          discounted_price: variant.discounted_price,
          selling_price: variant.selling_price,
        })
      })
      return products
    },
  },
 methods:{
   saveAdvice(){
     this.$validator.validateAll('advice').then(res=>{
       if (!res) return
       this.$store.dispatch('settings/storeAdvice', this.advice).then((response) => {
         if (response.status === 200) {
           this.$vs.notify({
             title: " درخواست با موفقیت ثبت شد",
             time: 2000,
             color: "success",
             position: "bottom-right",
             icon: 'check_box',
           })
         }
       }).catch(error => {
         if (error.response.status === 422) {
           this.$vs.notify({
             title: 'نظر شما با خطا گردید',
             text: 'خطا های زیر را رفع کنید.',
             time: 3000,
             color: "danger",
             position: "bottom-right",
             icon: 'check_box',
           })
           Object.entries(error.response.data.errors).forEach((error, i) => {
            this.errors.add({
              field:error[0],
              msg:error[1][0],
              scope:'advice'
            })
             setTimeout(() => {
               this.$vs.notify({
                 title: 'خطا!!!',
                 text: error[1][0],
                 time: 3500,
                 color: "danger",
                 position: "bottom-right",
                 icon: 'check_box',
               })
             }, 500 * (i + 1))
           })
         }
       })
     })

   }
 },
  destroyed() {
    this.$store.commit('settings/SET_ADVICE')

  },
  data() {
    return {
      courses: [],
      products: [],
      articles: [],
      advice: {},
    }
  }

};
</script>

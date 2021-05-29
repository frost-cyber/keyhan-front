<template>
  <div class="grid grid-cols-6 gap-3">
    <vs-card class="col-span-5">
      <h2>اسلایدر</h2>
      <vs-button class="mb-3" @click="options.slider.push({link:null,src:null,alt:null})">افزودن</vs-button>
      <div class="grid grid-cols-10 gap-3">
        <div class="col-span-2" v-for="(slide , index) in options.slider" :key="index">
          <img class="w-full" :src="slide.src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeSliderImage' , (data)=> slide.src = data.link)">
          <vs-input label="عکس" class="w-full" v-model="slide.src"/>
          <vs-input label="متن جایگزین" class="w-full" v-model="slide.alt"/>
          <vs-input label="لینک" class="w-full" v-model="slide.link"/>
          <div class="grid grid-cols-3 gap-2 mt-2">
            <vs-button class="col-span-1 w-full" :disabled="index === 0" @click.native="moveSlide(index)">قبل</vs-button>
            <vs-button class="col-span-1 w-full" @click.native="options.slider.splice(index , 1 )">حذف</vs-button>
            <vs-button class="col-span-1 w-full" :disabled="index === options.slider.length-1" @click.native="moveSlide(index , true)">بعد</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
    <vs-card class="col-span-1">
      <h2>بنر کنار اسلایدر</h2>
      <div v-for="(banner , index) in options.sliderBanners" :key="index">
        <h3>بنر {{ index+1 }}</h3>
        <img class="w-full" :src="banner.src || require('@/assets/images/Flag_of_None.png')"
             @click="selectFile('HomeSliderBannerImage' , (data)=> banner.src = data.link)">
        <vs-input label="عکس" class="w-full" v-model="banner.src"/>
        <vs-input label="متن جایگزین" class="w-full" v-model="banner.alt"/>
        <vs-input label="لینک" class="w-full" v-model="banner.link"/>
      </div>
    </vs-card>
    <vs-card class="col-span-3">
      <div class="grid grid-cols-6 gap-2">
        <div class="col-span-2" v-for="(category , index) in options.categories" :key="index">
          <img class="w-full" :src="category.src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeCategoryImage' , (data)=> category.src = data.link)">
          <tree-select v-model="category.slug" :options="categories" label="دسته" :normalizer="normalizer"/>
          <vs-input label="عکس" class="w-full" v-model="category.src"/>
          <vs-input label="متن جایگزین" class="w-full" v-model="category.alt"/>
        </div>
      </div>
    </vs-card>
    <vs-card class="col-span-3">
      <div class="grid grid-cols-6 gap-2">
        <div class="col-span-2" v-for="(brand , index) in options.brands" :key="index">
          <img class="w-full" :src="brand.src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeBrandImage' , (data)=> brand.src = data.link)">
          <tree-select v-model="brand.slug" :options="brands" label="دسته" :normalizer="normalizer"/>
          <vs-input label="عکس" class="w-full" v-model="brand.src"/>
          <vs-input label="متن جایگزین" class="w-full" v-model="brand.alt"/>
        </div>
      </div>
    </vs-card>
    <vs-card class="col-span-6">
       <h3>محصولات پیشنهادی</h3>
      <div class="grid grid-cols-6 gap-2">
        <div class="col-span-2">
          <tree-select class="w-full" multiple v-model="options.productsRecommended.categories" :options="categories" :normalizer="normalizer"/>
        </div>
        <div class="col-span-2">
          <tree-select class="w-full" multiple v-model="options.productsRecommended.products" :options="products" :normalizer="normalizer"/>
        </div>
      </div>
    </vs-card>
    <vs-button @click="save">ذخیره</vs-button>
  </div>
</template>

<script>
export default {
  name: "home.vue",
  data() {
    return {
      products:[],
      categories: [],
      brands: [],
      options: {
        slider: [],
        sliderBanners: [
          {
            link: null,
            src: null,
            alt: null,
          },
          {
            link: null,
            src: null,
            alt: null,
          },
        ],
        categories: [
          {
            slug: null,
            src: null,
            alt: null,
          },
          {
            slug: null,
            src: null,
            alt: null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
        ],
        brands: [
          {
            slug: null,
            src: null,
            alt: null,
          },
          {
            slug: null,
            src: null,
            alt: null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
          {
            slug:null,
            src:null,
            alt:null,
          },
        ],
        productsRecommended:{}
      }
    }
  },
  async fetch() {
    this.$store.dispatch('settings/getHome').then(res => {
      this.options = res.options
    })
    this.$store.dispatch('storeCategory/getCategories', {
      with: 'childrenRecursive',
      parent: '',
    }).then(res => {
      this.categories = res.data
    })
    await this.$store.dispatch('brands/getBrands')
    this.brands = this.$store.getters['brands/getBrands']
    await this.$store.dispatch('products/getProducts')
    this.products = this.$store.getters['products/getProducts']
  },
  methods: {
    save() {
      this.$store.dispatch('settings/updateHome', this.options).then(res => {
        this.$vs.notify({
          title: 'تنظیمات خانه ذخیره شد.',
          color: 'success'
        })
      }).catch(err => {
        if (err.response.status === 422) {
          this.$vs.notify({
            title: 'درخواست شما با خطا مواجه گردید',
            text: Object.entries(err.response.data.errors).reduce((x, y) => x + y[1][0] + '\n'),
            color: 'danger',
          })
        }
      })
    },
    normalizer(val) {
      return {
        id: val.slug,
        label: val.name,
        children: (val.children_recursive && val.children_recursive.length)? val.children_recursive : undefined,
      }
    },
    selectFile(action, setter) {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = (event) => {
        this.$store.dispatch('files/' + action, event.target.files[0]).then(res => {
          setter(res.data)
        }).catch(err => {
          if (err.response.status === 422) {
            this.$vs.notify({
              title: 'درخواست شما با خطا مواجه شد!',
              text: err.response.data.errors.file[0],
              color: 'danger',
            })
          }
        })
      }
      input.click()
    },
    moveSlide(index, after = false) {
      let slide = this.$cloneObject(this.options.slider[index])
      this.options.slider.splice(index, 1)
      this.options.slider.splice(after ? index + 1 : index - 1, 0, slide)
    }
  }
}
</script>

<style scoped>

</style>

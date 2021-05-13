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
            <vs-button class="col-span-1 w-full" :disabled="index === options.slider.length-1" @click.native="moveSlide(index , true)" >بعد</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
    <vs-card class="col-span-1">
      <h2>بنر کنار اسلایدر</h2>
      <div>
        <h3>بنر 1</h3>
        <img class="w-full" :src="options.sliderBanners[0].src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeSliderBannerImage' , (data)=> options.sliderBanners[0].src = data.link)">
        <vs-input label="عکس" class="w-full" v-model="options.sliderBanners[0].src"/>
        <vs-input label="متن جایگزین" class="w-full" v-model="options.sliderBanners[0].alt"/>
        <vs-input label="لینک" class="w-full" v-model="options.sliderBanners[0].link"/>
      </div>
      <div>
        <h3>بنر 2</h3>
        <img class="w-full" :src="options.sliderBanners[0].src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeSliderBannerImage' , (data)=> options.sliderBanners[1].src = data.link)">
        <vs-input label="عکس" class="w-full" v-model="options.sliderBanners[1].src"/>
        <vs-input label="متن جایگزین" class="w-full" v-model="options.sliderBanners[1].alt"/>
        <vs-input label="لینک" class="w-full" v-model="options.sliderBanners[1].link"/>
      </div>
    </vs-card>
    <vs-card class="col-span-3">
      <div class="grid grid-cols-6 gap-2">
        <div class="col-span-1" v-for="(category , index) in options.categories" :key="index">
          <img class="w-full" :src="category.src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeSliderBannerImage' , (data)=> options.sliderBanners[1].src = data.link)">
          <vue-treeselect v-model="category.id" :options="categories" label="دسته"/>
          <vs-input label="عکس" class="w-full" v-model="category.src"/>
          <vs-input label="متن جایگزین" class="w-full" v-model="category.alt"/>
        </div>
      </div>
    </vs-card>
    <vs-card class="col-span-3">

    </vs-card>
  </div>
</template>

<script>
export default {
  name: "home.vue",
  data(){
    return {
      categories:[],
      brands:[],
      options :{
        slider:[],
        sliderBanners : [{},{}],
        categories:[{},{},{},{},{},{}],
        banners:[{},{},{},{},{},{}],
      }
    }
  },
  async fetch() {
    this.$store.dispatch('storeCategory/getCategories' ,{
      with:'childrenRecursive',
      parent:'',
    }).then(res => {
      this.categories = res.data
    })
    await this.$store.dispatch('brands/getBrands')
    this.brands = this.$store.getters['brands/getBrands']
  },
  methods:{
    selectFile(action , setter){
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = (event) => {
        this.$store.dispatch('files/'+action, event.target.files[0]).then(res => {
          setter(res.data)
        }).catch(err => {
          if (err.response.status === 422){
            this.$vs.notify({
              title : 'درخواست شما با خطا مواجه شد!',
              text : err.response.data.errors.file[0],
              color:'danger',
            })
          }
        })
      }
      input.click()
    },
    moveSlide(index , after = false ){
      let slide = this.$cloneObject(this.options.slider[index])
      this.options.slider.splice(index , 1 )
      this.options.slider.splice(after ? index+1 : index -1 , 0 , slide)
    }
  }
}
</script>

<style scoped>

</style>

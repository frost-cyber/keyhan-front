<template>
  <div>
    <vs-card>
      <h2>اسلایدر</h2>
      <vs-button class="mb-3" @click="options.slider.push({link:null,src:null,alt:null})">افزودن</vs-button>
      <div class="grid grid-cols-10 gap-3">
        <div class="col-span-2" v-for="(slide , index) in options.slider" :key="index">
          <img :src="slide.src || require('@/assets/images/Flag_of_None.png')" @click="selectFile('HomeSliderImage' , (data)=> slide.src = data.link)">
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
  </div>
</template>

<script>
export default {
  name: "home.vue",
  data(){
    return {
      options :{
        slider:[]
      }
    }
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

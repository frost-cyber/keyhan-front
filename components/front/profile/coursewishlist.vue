<template>
  <div>
    <div class="con-tab-ejemplo mt-5">
      <!-- <p class="empty-wish my-5 text-sm text-cool-700"> دوره ای مورد علاقه شما نیست</p> -->
      <div class="grid grid-cols-12 gap-5 px-3 pb-10 pt-3">
          <template v-for="(course,index) in courseWishlist">
            <div :key="index" class="item-course col-span-6 md:col-span-6 lg:col-span-3 border border-cool-100 rounded-lg hover:shadow-xl relative overflow-hidden">
              <vs-button class="save-product" color="#EF4444" type="flat" icon-pack="fal" icon=" fa-bookmark" @click.native="deleteCourse(course.slug)"></vs-button>
              <div class="img-course">
                <nuxt-link  class="img-thum" :to="{name:'products-slug',params:{slug:course.slug}}">
                  <img :src="course.files[0].link" alt=""/>
                </nuxt-link>
              </div>
              <div class="title-course px-4 my-4 h-13 overflow-hidden">
                <a class="title-p text-cool-800" href="">
                  <h3 class="text-right font-black text-sm">
                   {{course.name}}
                  </h3>
                </a>
              </div>
            </div>

          </template>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "coursewishlist",
  props: {
    courseWishlist: {
      required: true,
    }
  },
  methods:{
    deleteCourse(slug){
      this.$store.dispatch('profile/toggleWishlist',slug).then(res=>{
        if(res.data == 'Deatached'){
          this.$emit('delete_course')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

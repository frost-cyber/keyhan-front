<template>
  <div>
    <div class="sidebar-profile rounded-lg shadow-p border border-cool-100 p-4 mt-8 relative">

      <div class="img-avatar relative">
        <a href="">
          <img class="w-16 mx-auto rounded-full border-ff border-solid border-4 shadow-xl" :src="user.avatar.link || require('@/assets/images/Flag_of_None.png')" alt="">
        </a>
        <span class="absolute bottom-0 left-1/3 p-1 bg-ff shadow-my rounded-full text-cool-500 text-sm w-7 h-7" @click="selectFile" href="javascript;">
          <i class="fal fa-edit"></i>
        </span>
      </div>
      <div class="name-profile mt-5 text-center">
        <h5>{{ user.name }} {{ user.last_name }} </h5>
      </div>
      <div class="name-profile mt-2 text-center pb-3 border-b border-dashed border-cool-300">
        <p class="text-xs font-thin text-cool-500">17 روز پیش</p>
      </div>

      <div class="grid grid-cols-11 gap-1 relative nav-edite">
        <div class="col-span-5 text-center mt-3">
          <nuxt-link :to="{name:'profile-myAccount' , params:{id:user.id}}">
            <figure>
              <i class="fal fa-user-edit text-cool-400 text-lg m-0"></i>
              <h6 class="text-cool-500 text-xs font-thin pt-1 m-0">ویرایش حساب</h6>
            </figure>
          </nuxt-link>
        </div>
        <div class="col-span-1 seperate-p"></div>
        <div class="col-span-5 text-center mt-3 ">
          <a href="">
            <figure>
              <i class="fal fa-sign-out text-cool-400 text-lg"></i>
              <h6 class="text-cool-500 text-xs font-thin pt-1 m-0">خروج از حساب</h6>
            </figure>
          </a>
        </div>
      </div>
    </div>
    <div class="dashbord-list rounded-lg shadow-p border border-cool-100 p-4 mt-5 relative">
      <ul class="profile-menu">
        <li class="border-b border-cool-200 border-dashed">
          <nuxt-link :to="{name:'profile' , params:{id:user.id}}" class="py-3 block text-cool-500 text-sm hover:text-orange-400" href="">
            <i class="fal fa-tachometer-alt-slow ml-2 text-cool-400"></i>
            <span>
                پیشخوان
                </span>
          </nuxt-link>
        </li>
        <li class="border-b border-cool-200 border-dashed">
          <nuxt-link :to="{name:'profile-orders' , params:{id:user.id}}" class="py-3 block text-cool-500 text-sm hover:text-orange-400">
            <i class="fal fa-shopping-cart ml-2 text-cool-400"></i>
            <span>
                سفارش های من
                </span>
          </nuxt-link>
        </li>
        <li class="border-b border-cool-200 border-dashed">
          <nuxt-link :to="{name:'profile-downloads' , params:{id:user.id}}" class="py-3 block text-cool-500 text-sm hover:text-orange-400">
            <i class="fal fa-cart-arrow-down ml-2 text-cool-400"></i>
            <span>
                دانلودها
                </span>
          </nuxt-link>
        </li>
        <li class="border-b border-cool-200 border-dashed">
          <nuxt-link :to="{name:'profile-wishlist' , params:{id:user.id}}" class="py-3 block text-cool-500 text-sm hover:text-orange-400">
            <i class="fal fa-bookmark ml-2 text-cool-400"></i>
            <span>
                علاقه مندی ها
                </span>
          </nuxt-link>
        </li>
        <li class="border-b border-cool-200 border-dashed">
          <nuxt-link :to="{name:'profile-address' , params:{id:user.id}}" class="py-3 block text-cool-500 text-sm hover:text-orange-400">
            <i class="fal fa-map-marked-alt ml-2 text-cool-400"></i>
            <span>
                آدرس ها
                </span>
          </nuxt-link>
        </li>
        <li class="border-b border-cool-200 border-dashed">
          <nuxt-link class="py-3 block text-cool-500 text-sm hover:text-orange-400" :to="{name:'profile-myAccount' , params:{id:user.id}}">
            <i class="fal fa-user-edit ml-2 text-cool-400"></i>
            <span>
                اطلاعات حساب من
                </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="block-btn mt-5">
      <vs-button color="#6B7280" type="border">همکار ما شو</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name : "profile",
  data(){
    return{

    }
  },
  computed:{
    user(){
      return this.$store.getters['profile/getUser']
    }
  },
  fetch(){
    this.getProfile()
  },
  methods:{
    getProfile() {
      // let w = this.$cloneObject(this.$route.query),
      // w.with = ['avatar'],
      this.$store.dispatch('profile/getUser').then(res => {
        if (res.status === 200) {
          this.$store.commit('profile/SET_USER' ,res.data )
        }

      })
    },

    async uploadFile(event){
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProfileImage' , file).then(res=>{
        this.$store.dispatch('profile/updateLogo',{'avatar':res.data}).then(res=>{
          this.$vs.notify({
            title : 'عکس پروفایل با موفقیت اپدیت شد',
            color : 'success',
          })
          this.getProfile()
        } )
      }).catch(error=>{
        if(error.response.status === 422){
          this.$vs.notify({
            title : 'درخواست شما با خطا مواجه شد',
            text : error.response.data.errors.file[0],
            color : 'danger',
          })
        }
      })
    },
    selectFile(){
      let input = document.createElement('input')
      input.type='file'
      input.onchange = this.uploadFile
      input.click()
    },
  }
}
</script>

<style scoped>

</style>

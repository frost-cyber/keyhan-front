<template>
  <div>
    <div class="title-section mb-2 relative">
      <h3
        class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10 ">
        لیست علاقه مندی های من
      </h3>
    </div>
    <div class="wishlist grid grid-cols-6 gap-4 py-2">
      <div v-for="(wish,index) in wishlist" :key="index" class="col-span-6 md:col-span-5 ">
        <div class="product-cart grid grid-cols-12 gap-2 ">
          <div class="trash-cart col-span-1 md:col-span-1 lg:col-span-1 lg:m-auto relative top-6 md:top-9 lg:top-0">
             <span>
                <i class="fal fa-trash text-cool-500 hover:text-orange-400" @click="deleteWishlist(wish.slug)"></i>
             </span>
          </div>
          <div class="col-span-3 md:col-span-4 lg:col-span-3">
            <a href="">
              <img class="pimg-cart w-full border-cool-200 border rounded-lg" :src="wish.files[0].link" alt="">
            </a>
          </div>
          <div class="col-span-8 md:col-span-7 lg:col-span-8 my-auto">
            <a href="">
              <h3 class="ptitle-cart text-cool-600 text-sm font-normal">{{ wish.name }}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="more text-left mb-2">
      <nuxt-link :to="{name:'profile-wishlist',params:{id:user.id}}"
                 class=" text-cool-600 text-sm px-3 pb-2 border-cool-600 border-b border-dashed">مشاهده همه
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "mywishlist",
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.getters['profile/getUser']
    }
  },
  props: {
    wishlist: {
      required: true
    }
  },
  methods: {
    deleteWishlist(slug) {
      this.$store.dispatch('profile/deleteProductFromWishlist', slug).then(res => {
        if (res.data == 'Deatached') {
          this.wishlist.forEach((product, index) => {
            if (product.slug === slug) {
              this.wishlist.splice(index, 1)
            }
          })
          this.$vs.notify({
            title: 'با موفقیت حذف انجام شد',
            color: 'success',
            position: 'bottom-right'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

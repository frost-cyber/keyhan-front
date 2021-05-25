<template>

  <div class="wishlist-profile">
    <div class="title-section mb-6 relative">
      <h3
        class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10">
        لیست علاقه مندی های من
      </h3>
    </div>
    <div class="tab-wishlist">
      <client-only>
        <vs-tabs :color="colorx" position="top">
          <vs-tab @click="colorx = '#EF4444'" label="محصولات">
            <productwishlist :productWishlist="products" @delete_product="getProductWishlist"/>
          </vs-tab>

          <vs-tab label="دوره ها">
            <coursewishlist :courseWishlist="courses" @delete_course="getProductWishlist"/>
          </vs-tab>
        </vs-tabs>
      </client-only>

    </div>
  </div>


</template>
<script>
import Productwishlist from "~/components/front/profile/productwishlist";
import Coursewishlist from "~/components/front/profile/coursewishlist";

export default {
  data() {
    return {
      products: [],
      courses:[],
    }
  },
  components: {
    Productwishlist,
    Coursewishlist
  },
  fetch() {
    this.getProductWishlist()
  },
  methods: {
    getProductWishlist() {
      this.products=[]
      this.courses=[]
      this.$store.dispatch('profile/getProductWishlist').then(res => {
        if (res.status === 200) {
          res.data.forEach(item=>{
            if(item.type == 3){
              this.courses.push(item)
              return
            }
              this.products.push(item)
          })

        }
      })
    }
  }
}
</script>

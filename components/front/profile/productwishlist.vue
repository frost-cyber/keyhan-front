<template>
  <div>
    <div class="con-tab-ejemplo mt-5">
      <!-- <p class="empty-wish mt-5 text-sm text-cool-700"> محصولی هنوز مورد علاقه شما نیست</p> -->
      <div class="grid grid-cols-12 gap-5 p-3">
        <template v-for="(product,index) in productWishlist">
          <div :key="index"
               class="item-product col-span-6 md:col-span-6 lg:col-span-3 border border-cool-100 rounded-lg hover:shadow-xl">
            <vs-tooltip text="حذف" position="right">
              <vs-button class="save-product relative block" color="#EF4444" type="flat"
                         @click="deleteProduct(product.slug)" icon-pack="fal" icon=" fa-bookmark"></vs-button>
            </vs-tooltip>
            <div class="img-product">
              <nuxt-link class="img-thum" :to="{name:'products-slug',params:{slug:product.slug}}">
                <img :src="product.files[0].link" alt=""/>
              </nuxt-link>
            </div>
            <div class="title-product px-2 mb-4">
              <a class="title-p text-cool-800" href="">
                <h3 class="text-center font-black text-sm">
                  {{ product.name }}
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
  name: "productwishlist",
  props: {
    productWishlist: {
      required: true
    }
  },
  methods: {
    deleteProduct(slug) {
      this.$store.dispatch('profile/deleteProductFromWishlist', slug).then(res => {
        if (res.data == 'Deatached') {
          this.$emit('delete_product')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <save-product :product="product" @save-product="saveProduct"/>
</template>

<script>
import SaveProduct from "~/components/admin/SaveProduct";

export default {
  name: "create",
  components: {SaveProduct},
  asyncData({store}) {
    return {
      product: {
        attributes: [],
        variantGroup: {},
        variants: [],
        images: [],
      },
      disabled: false,
    }
  },
  methods: {
    saveProduct() {
      this.disabled = true
      let product = this.$cloneObject(this.$store.getters['products/getProduct'])
      let attributesProduct = {ats: product.attributes}
      product.attributes = []
      attributesProduct.ats.forEach(ats => ats.attributes.forEach(id => product.attributes.push({id})))
      this.$store.dispatch('products/storeProduct', product).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفقیت محصول ساخته شد",
            text: "چند لحظه دیگر به صفحه محصولات ها هدایت خواهید شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
          setTimeout(() => {
            this.$router.push('.')
          }, 2100)
        }
      }).catch(error => {
        this.disabled = false
        if (error.response && error.response.status === 422) {
          this.$store.commit('products/SET_ERRORS', error.response.data.errors)
          Object.values(error.response.data.errors).forEach(res => {
            this.$vs.notify({
              title: "خطا!!",
              color:"danger",
              text: res[0],
            })
          })
        }
      })
    }
  },
  destroyed() {
    this.$store.commit('products/SET_PRODUCT')
  }
}
</script>

<style scoped>

</style>

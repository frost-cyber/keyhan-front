<template>
  <div>
    <save-product :disable="disabled"  @save-product="saveProduct" :product="product" :active="active"/>
  </div>
</template>

<script>
import SaveProduct from "~/components/admin/SaveProduct";

export default {
  name: "update",
  components: {SaveProduct},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      active:false,
      product: {
        attributes:[],
        variantGroup:{},
        variants:[],
        images: [],
      },
      disabled: false,
    }
  },
  async fetch() {
    await this.$store.dispatch('products/getProduct',{ productId : this.$route.params.id ,query : {
        with : ['variants' , 'variants.files' , 'variants.attribute' , 'attributes' , 'brand' , 'files' , 'categories']
      }})
    await this.$store.dispatch('attribute/getAttributes')
    let attributes = this.$store.getters['attribute/getAttributes']
    let product = this.$cloneObject(this.$store.getters['products/getProduct'])
    product.published_at = this.$jalaali(product.published_at).format('jYYYY/jMM/jDD');
    let productCloned = {attributes : product.attributes}
    product.attributes = []
    product.categories.forEach((cat , i ) =>  product.categories[i]=cat.id)
    productCloned.attributes.forEach(att => {
      let atf = product.attributes.find(at => at.name === att.name)
      if (atf){
        atf.attributes.push(att.id)
      }else {
        let atts = []
        attributes.forEach(a => a.name === att.name ? atts.push({id : a.id , label:a.value}):null)
        product.attributes.push({name: att.name , attributes:[att.id] , atts:atts})
      }
    })
    if (~~product.type === 2 && product.variants.length > 0){
      let variantGroupAttributes = []
      attributes.forEach(a => a.name === product.variants[0].attribute.name ? variantGroupAttributes.push({id : a.id , label:a.value}):null)
      product.variantGroup = {
        name: product.variants[0].attribute.name,
        attributes: variantGroupAttributes
      }
    }
    product.images = []
    product.files.forEach(f => product.images.push({
      id:f.id,
      link:f.link,
      variant_index:null
    }))
    console.log(this.$cloneObject(product.variants))
    product.variants.forEach((v , i ) => {
      v.files.forEach(f => product.images.push({
        id:f.id,
        link:f.link,
        variant_index:i
      }))
    })
    this.product = product
    this.active = true
  },
  methods: {
    saveProduct() {
      this.disabled = true
      let product = this.$cloneObject(this.$store.getters['products/getProduct'])
      let attributesProduct = {ats :product.attributes}
      product.attributes = []
      attributesProduct.ats.forEach(ats => ats.attributes.forEach(id => product.attributes.push({id})))

      this.$store.dispatch('products/updateProduct',product).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفیت ویژگی ساخته شد",
            text: "چند لحظه دیگر به صفحه محصولات ها هدایت خواهید شد.",
            time: 2000,
            color: "success",
            position: "bottom-center",
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
        }
      })
    }
  },
  mounted () {

  },
  destroyed() {
    this.$store.commit('products/SET_PRODUCT')
  }
}
</script>

<style scoped>

</style>

<template>
  <vs-card>
    <vs-table :data="products">
      <template slot="thead">
          <vs-th>نام</vs-th>
          <vs-th>کد</vs-th>
          <vs-th>دسته</vs-th>
          <vs-th>وضعیت</vs-th>
          <vs-th>عملیات</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(product , index) in data" :key="index" >
          <vs-td>{{product.name}}</vs-td>
          <vs-td>{{product.sku}}</vs-td>
          <vs-td>{{product.categories[0].name}}</vs-td>
          <vs-td>{{product.condition ? 'فعال' : 'غیر فعال'}}</vs-td>
          <vs-td>
            <NuxtLink :to="{name:'admin-store-products-id' , params:{id:product.id}}">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteProduct(product)"/>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
    }
  },
  computed: {
    products() {
      return this.$store.getters['products/getProducts']
    }
  },
  fetch() {
    this.$store.dispatch('products/getProducts' , {
      with : ['variants' , 'variants.files' , 'variants.attribute' , 'attributes' , 'brand' , 'files' , 'categories']
    })
  },
  methods:{
    log(x){
      console.log(this.$createQuery(x))
      return false
    },
    deleteProduct(product){
      this.$store.dispatch('products/deleteProduct' , product ).then(res =>{
        if(res.status  === 200){

        }
      })
    }
  }
}
</script>

<style scoped>

</style>

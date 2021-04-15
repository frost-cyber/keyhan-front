<template>
  <div>
    <ul>
      <li v-for="product in products" >
        <nuxt-link :to="{name: 'products-slug' , params:{slug: product.slug}}">
          {{product.name}}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  async asyncData({store}){
    await store.dispatch('products/getProducts');
    return {
      products:store.getters['products/getProducts']
    }
  }

}
</script>

<style scoped>

</style>

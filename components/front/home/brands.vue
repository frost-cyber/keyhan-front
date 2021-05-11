<template>
  <section class="brands-row">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-4 md:gap-30">
        <div  v-for="(brand , index) in brands" :key="index" class="col-span-4 md:col-span-4 lg:col-span-2">
          <a class="brands-item" :href="brand.href">
            <img class="rounded-lg border border-cool-100 border-solid shadow-my" :src="brand.img" alt=""/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "brands",
  props: {
    brands:{
      required: true,
      type: Array
    }
  },
}
</script>

<style scoped>

</style>

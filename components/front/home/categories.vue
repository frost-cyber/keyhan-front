<template>
  <section class="ctg-services py-10 lg:py-16 relative">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-30">
        <div v-for="(category , index) in categories" class="col-span-6 md:col-span-4 lg:col-span-2 item-category text-center" :key="index" :class="mt[index]">
          <nuxt-link class="link-cat" :to="{name : 'products' ,query:{category : category.slug}}">
            <div class="item-category bg-ff shadow-my rounded-lg text-center px-4 py-8">
              <img class="inline-block" :src="category.src" :alt="category.alt"/>
              <h4 class="text-sm font-bold text-cool-600 mt-5">
                {{ category.title }}
              </h4>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "categories",
  props: {
    categories: {
      type: Array,
    },
  },
  data() {
    return {
      mt : ['lg:mt-20' , 'lg:mt-10' , 'lg:mt-0' , 'lg:mt-0' , 'lg:mt-10' , 'lg:mt-20']
    }
  }
}
</script>
<style scoped>
.ctg-services::before {
  content: "";
  width: 100%;
  height: 500px;
  position: absolute;
  top: 180px;
  background: -moz-linear-gradient(to bottom, #f3f4f6, #fff);
  background: -webkit-linear-gradient(to bottom, #f3f4f6, #fff);
  z-index: -1;
  background: linear-gradient(to bottom, #f3f4f6, #fff);
}
</style>

<template>
  <div class=" grid grid-cols-12 gap-5 md:gap-4">
    <template v-for="(article , index ) in articles">
      <article :key="index" class="overflow-hidden item-blog border border-cool-100 rounded-lg hover:shadow-xl mb-5 col-span-6 md:col-span-4 lg:col-span-3">
        <div class="img-blog">
          <a class="img-thum" :href="article.href">
            <img :src="article.img" alt=""/>
          </a>
        </div>
        <div class="title-blog px-4 my-4 h-13 overflow-hidden">
          <a class="title-blog text-cool-800" href="">
            <h3 class="text-right font-black text-xs md:text-sm">
              {{ article.title }}
            </h3>
          </a>
        </div>
        <div class="des-course px-4 pb-4 h-15 overflow-hidden ">
          <p class="hidden md:block text-xs text-cool-600 font-thin text-right">
            {{ article.desc }}
          </p>
        </div>
      </article>
    </template>
  </div>
</template>

<script>
export default {
  name: "articles",
  props:{
    articles:{
      required: true,
      type:Array,
    }
  },
}
</script>

<style scoped>

</style>

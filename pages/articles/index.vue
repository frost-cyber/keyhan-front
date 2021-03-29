<template>
<div>
  <ul>
    <li v-for="article in articles ">
      <nuxt-link :to="'/articles/'+article.slug">{{article.title}}</nuxt-link>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    name: "index",
    async asyncData(ctx) {
      await ctx.store.dispatch("article/getArticles")
      return {articles: ctx.store.getters["article/getArticles"]}
    },
    mounted() {
      console.log(this.articles)
    }
  }
</script>

<style scoped>

</style>

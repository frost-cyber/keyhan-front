<template>
  <div
  class="col-cat p-4 rounded-lg border border-cool-100 text-cool-600"
>
  <h3
    class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5 "
  >
    دسته بندی ها
  </h3>
  <div class="footer-menu mt-5">
    <ul>
      <li v-for="(cat,index) in CategoriesArticle" :key="index">
        <nuxt-link :to="{name:'articles-category-slug', params:{slug:cat.slug}}">
          {{cat.name}}
        </nuxt-link>
      </li>


    </ul>
  </div>
</div>

</template>
<script>
  export default {
    name:"sidebarCategories",
    fetch() {
      this.$store.dispatch('articleCategory/getCategoryArticle')
    },
      computed: {
        CategoriesArticle() {
          let categories = this.$store.getters['articleCategory/getCategories']
          return categories;
        },
      }
    }

</script>

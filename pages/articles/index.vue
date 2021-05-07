<template>
  <div class="archive-blog">
    <section class="title-blog">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 border-cool-100 border py-7 rounded-lg my-5 ">
            <h1 class="text-center text-xl">عنوان بلاگ</h1>
            <div class="breadcumb text-sm text-center mx-auto">
              <vs-breadcrumb color="#eee" align="center">
                <li>
                  <a href="#" title="Home">صفحه اصلی</a>
                  <span class="vs-breadcrum--separator">/</span>
                </li>
                <li>
                  <a href="#" title="blogcat">دانشنامه</a>
                </li>
              </vs-breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="archive-area">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-5">
          <div class="right-box col-span-12 md:col-span-4 lg:col-span-3 relative">
            <div class="right-item p-3 border-cool-100 border rounded-lg relative mb-4">
              <div class="title-sidebar relative">
                <h3 class="text-center border-b-2 border-cool-600 pb-3 relative block px-2 lg:px-8 "> دسته بندی ها </h3>
              </div>
              <div class="content-side text-right mt-5">
                <vs-checkbox class="text-sm text-cool-600 mb-1" @input="$router.push({name:'articles-category-slug' , params:{slug:cat.slug}})" v-for="(cat,index) in CategoriesArticle" :key="index" icon-pack="fal" icon=" fa-check" v-model="checkBox1" >
                  {{cat.name}}
                </vs-checkbox>
              </div>
            </div>
          </div>
          <div class="left-box col-span-12 md:col-span-8 lg:col-span-9 p-3 border-cool-100 border rounded-lg">
            <div class=" grid grid-cols-12 gap-5 md:gap-4">
              <article  class="col-span-6 lg:col-span-4" v-for="(article , index ) in articles" :key="index"  :class="'md:col-span-'+article.responsivMd +' lg:col-span-'+article.responsivLg">
                <div class="img-product mb-4">
                  <nuxt-link  class="img-thum" :to="{name:'articles-slug' , params:{slug:article.slug}}">
                    <img class="rounded-lg  mx-auto" :src="article.thumbnail || require('@/assets/images/portrait/small/avatar-s-20.jpg')" >
                  </nuxt-link>
                </div>
                <div class="title-blog px-4 my-4 h-13 overflow-hidden">
                  <nuxt-link :to="{name:'articles-slug' , params:{slug:article.slug}}">
                  <h3 class="text-right font-black text-xs md:text-sm">
                    {{article.title}}
                  </h3>
                   </nuxt-link>
                </div>
                <div class="des-course px-4 pb-4 h-15 overflow-hidden ">
                  <p class="hidden md:block text-xs text-cool-600 font-thin text-right">
                    {{article.description.substring(0,250)+"..."}}
                  </p>
                </div>
              </article>
            </div>
            <div class="paganition mt-5 mx-auto" v-if="pagination.last_page > 1">
              <vs-pagination :max="6" :total="pagination.last_page" icon-pack="fal" prev-icon="fa-arrow-right" next-icon="fa-arrow-left" :color="colorx" v-model="query2.page"></vs-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      temp: {categories: []},
      colorx: '#F97316',
      currentx: 5,
      articles: [],
      pagination: {
        total: 0
      },
      query2: {
        page: []
      }
    };
  },
  fetch() {
    this.$store.dispatch('articleCategory/getCategoryArticle')
    this.getArticles()
  },
  watch: {
    query2: {
      deep: true,
      handler(c) {
        this.goToQuery().then(r => {
          this.$fetch()
        })

      }
    }
  },
  created() {
    let query = this.$cloneObject(this.$route.query)
    this.temp.categories = [query.category]
    this.query2 = {...query}
  },
  methods: {
    getArticles() {
      let q = this.$cloneObject(this.$route.query)
      q.with = ['thumbnail']
      q.pagination = true

      this.$store.dispatch('article/getArticles', q).then(res => {
        this.articles = []
        if (res.status === 200) {
          this.pagination = res.data
          res.data.data.forEach((article) => {
            this.articles.push({
              title: article.title,
              slug: article.slug,
              description: article.description,
              thumbnail: article.thumbnail.link,
            })
          })
        }
      });
    },
    goToQuery() {
        return this.$router.replace({path: this.$route.path, query: this.query2})
      },
    },
  computed:{
    CategoriesArticle() {
    let categories = this.$store.getters['articleCategory/getCategories']
    return categories;
    },
  }
}
</script>

<style>
.title-sidebar h3::before{
  content: "";
  height: 2px;
  width: 80%;
  background-color: #1f2937;
  position: absolute;
  bottom: -6px;
  right: 15px;
  left: 15px;
  margin: auto;
}
.content-side .con-vs-checkbox{
  justify-content: right !important;
}
.vs-pagination--mb{
  justify-content: center !important;
}
</style>

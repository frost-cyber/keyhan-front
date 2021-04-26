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
                <vs-checkbox class="text-sm text-cool-600 mb-1" @input="$router.push({name:'articles-category-slug' , params:{slug:cat.slug}})" v-for="(cat,index) in categories" :key="index" icon-pack="fal" icon=" fa-check" v-model="checkBox1" >
                  {{cat.name}}
                </vs-checkbox>
              </div>
            </div>
          </div>
          <div class="left-box col-span-12 md:col-span-8 lg:col-span-9 p-3 border-cool-100 border rounded-lg">
            <div class=" grid grid-cols-12 gap-5 md:gap-4">
              <article v-for="(blog , index ) in articles" :key="index" class=" overflow-hidden item-blog border border-cool-100 rounded-lg hover:shadow-xl mb-5 col-span-6 " :class="'md:col-span-'+blog.responsivMd +' lg:col-span-'+blog.responsivLg">
                <div class="img-blog">
                  <nuxt-link :to="{name:'articles-slug' , params:{slug:blog.slug}}">
                    <img :src="blog.thumbnail.link || require('@/assets/images/portrait/small/avatar-s-20.jpg')" >
                  </nuxt-link>
                </div>
                <div class="title-blog px-4 my-4 h-13 overflow-hidden">
                  <nuxt-link :to="{name:'articles-slug' , params:{slug:blog.slug}}">
                    <h3 class="text-right font-black text-xs md:text-sm">
                      {{blog.title}}
                    </h3>
                  </nuxt-link>
                </div>
                <div class="des-course px-4 pb-4 h-15 overflow-hidden ">
                  <p class="hidden md:block text-xs text-cool-600 font-thin text-right">
                    {{blog.description}}
                  </p>
                </div>
              </article>
            </div>
            <div class="paganition mt-5 mx-auto">
              <vs-pagination max="6"  :total="6" icon-pack="fal" prev-icon="fa-arrow-right" next-icon="fa-arrow-left" :color="colorx" v-model="currentx"></vs-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "_slug",
  async asyncData({params , store}) {
    await store.dispatch('article/getArticles',{category:params.slug})
    return {
      articles: store.getters['article/getArticles'],
      disabled: false,
      colorx:'#F97316',
      currentx: 5 ,
    }
  },

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

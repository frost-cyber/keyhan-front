<template>
  <div class="single-blog-page mt-5">
    <section class="share-btn relative z-10">
      <div class="share-socials sticky">
        <ul class="share-menu absolute top-0 right-4">
          <li class="main-share">
            <a href="#">
              <span>
                <i class="fal fa-share-alt text-cool-500 text-lg p-0.5 "></i>
              </span>
            </a>
            <ul>
              <li>
                <a href="#">
                  <span>
                    <i class="fab fa-telegram-plane text-cool-500 text-lg p-0.5"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i class="fab fa-twitter text-cool-500 text-lg p-0.5"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i class="fab fa-instagram text-cool-500 text-lg p-0.5"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i class="fab fa-linkedin-in text-cool-500 text-lg p-0.5"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i class="fab fa-google-plus-g text-cool-500 text-lg p-0.5 "></i>
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <section class="landing-blog">
      <div class="container mx-auto">
        <div
          class="grid grid-cols-2 gap-30 border-cool-100 border rounded-lg overflow-hidden relative"
        >
          <div class="rightbox col-span-2 md:col-span-1 order-2 md:order-1 p-4">
            <div class="content-info">
              <div class="title-single md:mt-3">
                <h1 class="text-xl font-bold text-cool-600">
                  {{article.title}}
                </h1>
              </div>
              <div class="breadcumb text-sm">
                <vs-breadcrumb color="#eee">
                  <li>
                    <a href="#" title="Home">صفحه اصلی</a>
                    <span class="vs-breadcrum--separator">/</span>

                  </li>
                  <li v-for="cat in broadCrumb">
                    <a href="#" title="blogcat" >{{cat.name}}</a>
                    <span class="vs-breadcrum--separator">/</span>
                  </li>
                </vs-breadcrumb>
              </div>
              <div class="des-single mt-3 text-sm text-cool-600 h-28 overflow-hidden">
                {{article.description}}
              </div>
              <div class="info-box bg-cool-100 p-2 mt-5 rounded-lg ">
                <figure class=" text-cool-400 my-auto inline-block ml-6">
                  <i class="fal fa-folder-open text-2xl ml-2"></i>
                  <span class="text-sm font-thin relative -top-1">{{article.categories[0].name}}</span
                  >
                </figure>
                <figure class=" text-cool-400 my-auto inline-block ml-6">
                  <i class="fal fa-calendar-edit text-2xl ml-2"></i>
                  <span class="text-sm font-thin relative -top-1"
                  >تاریخ انتشار : 20 آبان 99</span
                  >
                </figure>
                <figure class=" text-cool-400 my-auto inline-block ml-6">
                  <i class="fal fa-eye text-2xl ml-2"></i>
                  <span class="text-sm font-thin relative -top-1"
                  >20 بازدید</span
                  >
                </figure>
              </div>
            </div>
          </div>
          <div class="dynamic-img col-span-2 h-56 md:h-auto md:col-span-1 order-1 md:order-2 overflow-hidden relative"></div>
        </div>
      </div>
    </section>
    <section class="row-content mt-5">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 md:gap-4 lg:gap-30">
          <div
            class="col-span-12 md:col-span-9 "
          >
            <div class="content-box p-4 rounded-lg border border-cool-100 text-cool-600 font-normal text-sm md:text-base" v-html="article.body"></div>
            <div class="btntocomment mt-5 text-center">
              <vs-button color="#4B5563" type="border">در بحث و گفتگو در رابطه با این مطلب شرکت کنید</vs-button>
            </div>
          </div>
          <div class="sidebar md:col-span-3 col-span-12 mt-5 md:mt-0">
            <sidebarCategories/>
            <div class="banner-ads p-4 rounded-lg border border-cool-100 mt-5">
              <a href="">
                <img class="rounded-lg mx-auto" src="@/assets/img/banner/okok.jpg" alt="">
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="title-section mt-24 mb-8 relative">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-2">
            <h3
              class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-5 "
            >
              مطالب مرتبط
            </h3>
          </div>
        </div>
      </div>
    </section>
    <article-slider :articles="blogarray"/>
    <section class="title-section mt-24 mb-3 relative">
      <div class="container mx-auto">
        <div class="grid grid-cols-2 gap-30">
          <div class="col-span-2">
            <h3
              class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-5 "
            >
              نظرات شما
            </h3>
          </div>
        </div>
      </div>
    </section>
    <comments/>
  </div>
</template>
<script>
  import sidebarCategories from "@/components/front/blog/sidebarCategories";
  import ArticleSlider from "~/components/front/blog/articleSlider";
  import Comments from "~/components/front/blog/comments";
  export default {
    name: "_slug",
    async asyncData(ctx) {
      let slug = ctx.route.params.slug
      await ctx.store.dispatch('article/getArticle',slug)
      return{
        article: ctx.store.getters['article/getArticle'],
        blogarray:[
          { img: require('@/assets/img/product/02.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
          { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
          { img: require('@/assets/img/product/04.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
          { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        ],
        value1: "",
      }
    },
    computed:{
      broadCrumb(){
        let category = this.article.categories[0]
        let cats = []
        do {
          cats.unshift(category)
          category = (category.parent_id?category.parent:category)
        }while (category.parent_id != null || category.id !== cats[0].id)
        return cats
      }
    },
    components:{
      Comments,
      ArticleSlider,
      sidebarCategories,
    }
  }

</script>

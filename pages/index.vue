<template>
  <div class="home-page">
    <!-- slider -->
    <section class="slider-row py-6">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 md:col-span-9 slider-area ltr">
            <carousel :items="1" :autoplayHoverPause="true" :autoplay="true" :nav="false" :margin="5" :loop="true" >
              <a href="">
                <img src="@/assets/img/slider/slider01.jpg"/>
              </a>
              <a href="">
                <img src="@/assets/img/slider/slider01.jpg"/>
              </a>
              <a href="">
                <img src="@/assets/img/slider/slider01.jpg"/>
              </a>
              <a href="">
                <img src="@/assets/img/slider/slider01.jpg"/>
              </a>
            </carousel>
          </div>
          <div class="col-span-12 md:col-span-3 banner-area">
            <div class="grid grid-cols-2 gap-5">
              <div class="col-span-1 md:col-span-2 banner-top">
                <a href="">
                  <img class="rounded-lg" src="@/assets/img/banner/banner01.jpg" alt="" />
                </a>

              </div>
              <div class="col-span-1 md:col-span-2 banner-bottom">
                <a href="">
                  <img class="rounded-lg" src="@/assets/img/banner/banner02.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- category product -->
    <categories :categories="categories"></categories>
    <!-- brands -->
    <brands :brands="brands"></brands>
    <!-- product carousel -->
    <section class="title-section mt-24 relative">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-1">
            <h3 class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5" >
              محصولات پیشنهادی
            </h3>
          </div>
          <div class="col-span-1 text-left">
            <a class="more-border relative text-xs lg:text-base font-thin text-cool-700 border-b-2 border-cool-600 pb-3 px-6 " href="" >
              مشاهـــــده هـــمــــه
            </a>
          </div>
        </div>
      </div>
    </section>
    <products :products="products"></products>
    <!-- course carousel -->
    <section class="title-section mt-10 relative">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-1">
            <h3 class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5 " >
              دوره های آموزش
            </h3>
          </div>
          <div class="col-span-1 text-left">
            <a class="more-border relative text-xs lg:text-base font-thin text-cool-700 border-b-2 border-cool-600 pb-3 px-6 " href="">
              مشاهـــــده هـــمــــه
            </a>
          </div>
        </div>
      </div>
    </section>
    <courses :courses="courses"></courses>
    <!-- contact form -->
    <section class="contact-row">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30 border-cool-100 border shadow-xl rounded-lg" >
          <div class="col-span-12 md:col-span-6 p-4">
            <h3 class="font-bold text-xl md:text-2xl">
              سوال دارم و میخوام با شما مشورت کنم
            </h3>
            <p class="font-thin text-xs md:text-base mt-2">
              :)برای اینکه بتونیم کمکت کنیم فرم زیر رو پر کن ،در اسرع وقت باهات
              تماس میگیریم
            </p>
            <div class="form-contact">
              <vs-input class="contactform mt-6" placeholder="نام و نام خانوادگی" size="small" />
              <vs-input class="contactform mt-3" placeholder="شماره تماس شما" size="small" />
              <vs-input class="contactform mt-3" placeholder="موضوع مورد سوال شما"  size="small" />
              <div class="mt-3 text-sm">
                <vs-button color="#F97316" type="filled">ثبت درخواست شما</vs-button>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 bg-contact rounded-t-lg rounded-l-lg relative"></div>
        </div>
      </div>
    </section>
    <!-- blog -->
    <section class="title-section mt-24 relative mb-8">
      <div class="container mx-auto">
        <div class=" grid grid-cols-2 gap-30">
          <div class="col-span-2">
            <h3 class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-0 lg:pl-5">
              دانشنامه
            </h3>
          </div>
        </div>
      </div>
    </section>
    <section class="blog-row">
      <div class="container mx-auto">
        <articles :articles="articles"></articles>
        <div class="col-span-12 text-center">
          <a class="more-border relative text-xs lg:text-base font-thin text-cool-700 border-b-2 border-cool-600 pb-3 px-6" href="">مشاهـــــده هـــمــــه</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import brands from "@/components/front/home/brands";
import courses from "@/components/front/home/courses";
import categories from "@/components/front/home/categories";
import products from "@/components/front/home/products";
import articles from "@/components/front/home/articles";

export default {
  layout: 'Main',
  name: 'Index',
  components: {
    brands,
    categories,
    products,
    courses,
    articles,
    carousel
  },
  data() {
    return {
      categories: [
        {link: "#", title: "تجهیزات شبکه ای", img: require('@/assets/img/technology.svg'), mt: "20"},
        {link: "#", title: "تجهیزات مخابراتی", img: require('@/assets/img/transmitting.svg'), mt: "10"},
        {link: "#", title: "تجهیزات  برق صنعتی", img: require('@/assets/img/electrical-panel.svg'), mt: "0"},
        {link: "#", title: "تجهیزات برق ساختمان", img: require('@/assets/img/power-plant.svg'), mt: "0"},
        {link: "#", title: "تجهیزات خانه هوشمند", img: require('@/assets/img/smarthouse.svg'), mt: "10"},
        {link: "#", title: "انـــرژی های پـــاک", img: require('@/assets/img/energy.svg'), mt: "20"},
      ],
      brands:[
        { img: require('@/assets/img/brands/Ansee.png') , href:"#"},
        { img: require('@/assets/img/brands/cantonk.png') , href:"#"},
        { img: require('@/assets/img/brands/farahoosh.png') , href:"#"},
        { img: require('@/assets/img/brands/mrsmart.png') , href:"#"},
        { img: require('@/assets/img/brands/starvedia.png') , href:"#"},
        { img: require('@/assets/img/brands/Ansee.png') , href:"#"},
      ],
      courses:[
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
      ],
      products:[
        { status: "1" , img: require('@/assets/img/product/img-p01.jpg') ,title:" دوربین مداربسته تحت شبکه شیائومی مدل IMICMSXJ13B " , discount:"15%" ,newprice: "35,000,000" ,oldprice: "55,000,000" , href:"#" },
        { status: "2" , img: require('@/assets/img/product/img-p01.jpg') ,title:" دوربین مداربسته تحت شبکه شیائومی مدل IMICMSXJ13B " , text:"نـــاموجود" , href:"#"},
        { status: "3" , img: require('@/assets/img/product/img-p01.jpg') ,title:" دوربین مداربسته تحت شبکه شیائومی مدل IMICMSXJ13B " , price: "35,000,000" , href:"#" },
        { status: "4" , img: require('@/assets/img/product/img-p01.jpg') ,title:" دوربین مداربسته تحت شبکه شیائومی مدل IMICMSXJ13B " , href:"#" },
        { status: "2" , img: require('@/assets/img/product/img-p01.jpg') ,title:" دوربین مداربسته تحت شبکه شیائومی مدل IMICMSXJ13B " , text:"نـــاموجود" , href:"#"},
        { status: "3" , img: require('@/assets/img/product/img-p01.jpg') ,title:" دوربین مداربسته تحت شبکه شیائومی مدل IMICMSXJ13B " , price: "35,000,000" , href:"#" },
      ],
      articles:[
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
        { img: require('@/assets/img/product/03.png') ,title:"  ۰ تا ۱۰۰ آموزش کسب و کار اینترنتی، دوره جامع وبمستران هوشمند " ,href:"#" ,desc:" آموزش جامع ساخت و مدیریت کسب و کار اینترنتی، اصول بازاریابی و رساندن سایت و "},
      ],
    }
  }

};
</script>

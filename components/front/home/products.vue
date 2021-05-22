<template>
  <section class="product-row my-8 ltr">
    <div class="container mx-auto">
      <div class="grid grid-cols-12">
        <div class="col-span-12 product-area">
          <carousel :navText="['','']" :items="5" :autoplayHoverPause="true" :autoplay="true" :nav="true" :margin="30" :loop="true" :dots="false" :responsive="carouselResponsive">
            <div v-for="(product , index ) in products" :key="index">
              <div class="item-product border border-cool-100 rounded-lg hover:shadow-xl mb-10 mt-2">
                <vs-button class="save-product" color="#D1D5DB" type="flat" icon-pack="fal" icon=" fa-bookmark"></vs-button>
                <div class="img-product">
                  <a class="img-thum" :href="product.href">
                    <img :src="product.img" alt=""/>
                  </a>
                </div>
                <div class="title-product px-2 mb-4">
                  <a class="title-p text-cool-800 hover:text-orange-600" :href="product.href">
                    <h3 class="text-center font-black text-sm">
                      {{ product.title }}
                    </h3>
                  </a>
                </div>
                <div v-if="~~product.status===1" class="price-product px-4 pb-4 h-16 ">
                  <div class="price-old">
                    <span class="value-discount bg-red-600 text-cool-50 text-sm px-2 rounded-xl">
                      {{ product.discount }}
                    </span>
                    <del class="value-old text-sm text-cool-400 line-through mx-1">
                      {{ product.oldprice }}
                    </del>
                  </div>
                  <div class="price-new">
                    <div class="price-new-area relative">
                      <span class="unit-price text-xs absolute top-1 left-0">تومان</span>
                      <ins class="text-base font-medium ml-9">{{ product.newprice }}</ins>
                    </div>
                  </div>
                </div>
                <div v-if="~~product.status===2" class="null-stock px-4 pb-4 h-16 ">
                  <p class="tag-stock text-center m-auto text-cool-400 relative top-3">
                    {{ product.text }}
                  </p>
                </div>
                <div v-if="~~product.status===3" class="price-product px-4 pb-4 h-16 ">
                  <div class="price-final text-center pl-4">
                    <div class="area-price relative top-3">
                      <ins class="text-base font-medium ml-5">{{ product.price }}</ins>
                      <span class="unit-price text-xs absolute top-1 left-0 md:left-4 lg:left-7">تومان</span
                      >
                    </div>
                  </div>
                </div>
                <div v-if="~~product.status===4" class="show-product text-center px-4 pb-4 h-16 ">
                  <vs-button class="show-product-btn text-sm" color="#F97316" type="border" :href="product.href">
                    مشاهـــــده جزئیات
                  </vs-button>
                </div>
              </div>
            </div>
          </carousel>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name:'products',
  props: {
    products: {
      type: Array,
    }
  },
  data() {
    return {
      carouselResponsive: {
        0: {items: 2, nav: false, margin: 20},
        600: {items: 3, nav: false},
        720: {items: 3, nav: false},
        992: {items: 4, nav: true},
        1254: {items: 5, nav: true},
        1470: {items: 5, nav: true}
      }
    }
  }
}
</script>

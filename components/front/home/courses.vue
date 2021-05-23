<template>
  <section class="courses-row my-8 ltr">
    <div class="container mx-auto">
      <div class="grid grid-cols-12">
        <div class="col-span-12 product-area">
          <carousel :navText="['','']" :items="4" :autoplayHoverPause="true" :autoplay="true" :nav="true" :margin="30" :loop="true" :dots="false" :responsive="carouselResponsive">
            <product-cart v-for="(course , index ) in courses" :key="index" :product="course"/>
          </carousel>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import productCart from "~/components/front/store/productCart";
export default {
  name: "courses",
  components:{
    productCart,
  },
  props: {
    courses: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      carouselResponsive: {
        0: {items: 2, nav: false},
        600: {items: 3, nav: true},
        720: {items: 3, nav: true},
        992: {items: 4, nav: true},
        1254: {items: 4, nav: true},
        1470: {items: 4, nav: true}
      }
    }
  },
};
</script>


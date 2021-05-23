<template>
  <div>
    <div v-if="isVirtual" class="item-course border border-cool-100 rounded-lg hover:shadow-xl mb-10 mt-2 relative">
      <vs-button class="save-product" color="#D1D5DB" type="flat" icon-pack="fal" icon="fa-bookmark"></vs-button>
      <div class="img-course">
        <nuxt-link class="img-thum" :to="{name:'products-slug' , params:{slug:product.slug}}">
          <img :src="product.thumbnail || require('@/assets/img/product/02.png')" :alt="product.name"/>
        </nuxt-link>
      </div>
      <div class="title-course px-4 my-4 h-13 overflow-hidden">
        <nuxt-link class="title-p text-cool-800" :to="{name:'products-slug' , params:{slug:product.slug}}">
          <h3 class="text-right font-black text-sm">
            {{ product.name }}
          </h3>
        </nuxt-link>
      </div>
      <div class="des-course px-4 pb-4 h-15 overflow-hidden ">
        <p class="text-xs text-cool-600 font-thin text-right">
          {{ product.description }}
        </p>
      </div>
    </div>
    <div v-else class="item-pro border border-cool-100 rounded-lg p-2 relative block">
      <div class="saving absolute z-10">
        <vs-button class="save-product" color="#D1D5DB" type="flat" icon-pack="fal" icon=" fa-bookmark"></vs-button>
      </div>
      <div class="img-product mb-4">
        <nuxt-link class="img-thum" :to="{name:'products-slug' , params:{slug:product.slug}}">
          <img class="rounded-lg  mx-auto" :src="product.thumbnail || require('@/assets/img/product/02.png')" :alt="product.name"/>
        </nuxt-link>
      </div>
      <div class="title-product h-12 overflow-hidden">
        <nuxt-link :to="{name:'products-slug' , params:{slug:product.slug}}">
          <h3 class="text-sm mt-1 text-cool-600 text-center font-bold">{{ product.name }}</h3>
        </nuxt-link>
      </div>
      <div v-if="product.inventory === 0" class="null-stock px-4 mt-2 h-16">
      <span class="tag-stock text-center m-auto text-cool-400 relative top-3">
        نــــاموجود
      </span>
      </div>
      <div v-else-if="product.discounted_price > 0 && product.selling_price >=0" class="price-product px-4 mt-2 h-16 ltr">
        <div class="price-old">
        <span class="value-discount bg-red-600 text-cool-50 text-sm px-2 rounded-full">
          {{ ~~((product.selling_price - product.discounted_price) / (product.selling_price/100))}}%
        </span>
          <del class="value-old text-sm text-cool-400 line-through mx-1">
            {{  product.selling_price }}
          </del>
        </div>
        <div class="price-new">
          <div class="price-new-area relative">
            <span class="unit-price text-xs absolute top-1 left-0">تومان</span>
            <ins class="text-base font-medium ml-10">{{ product.discounted_price }}</ins>
          </div>
        </div>
      </div>
      <div v-else-if="product.selling_price >=0" class="price-product px-4 mt-2 h-16">
        <div class="price-final text-center">
          <div class="area-price relative top-3">
            <ins class="text-base font-medium before-toman">{{ product.selling_price }}</ins>
          </div>
        </div>
      </div>
      <div v-else class="show-product text-center px-1 lg:px-4 h-16 ">
        <nuxt-link :to="{name:'products-slug' , params:{slug:product.slug}}">
          <vs-button class="show-product-btn text-sm" color="#F97316" type="border" href="#">مشاهـــــده جزئیات</vs-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "productCart",
  props: {
    product: {
      required: true,
    }
  },
  computed: {
    isVirtual(){
      return ~~this.product.type === 3
    }
  }
}
</script>

<style scoped>

</style>

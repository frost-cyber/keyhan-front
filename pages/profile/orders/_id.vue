<template>
  <div class="all-order">
    <div>
      <div class="title-section mb-6 relative">
        <h3 class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10">
          جزئیات سفارش {{ order.order_number }}
        </h3>
      </div>
      <div class="info-order border border-cool-200 rounded-lg py-3 md:py-8 px-3 grid grid-cols-12 gap-30">
        <div class="col-span-12 md:col-span-6 lg:col-span-4 text-right md:text-center">
          <h5>تحویل گیرنده</h5>
          <p class="text-sm text-cool-500 font-thin mt-2">{{ order.shipments[0].address.name }} {{ order.shipments[0].address.last_name }}</p>
        </div>
        <div class="col-span-12 md:col-span-6 lg:col-span-4 text-right md:text-center">
          <h5>شماره تماس تحویل گیرنده</h5>
          <p class="text-sm text-cool-500 font-thin mt-2">{{ order.shipments[0].address.mobile }}</p>
        </div>
        <div class="col-span-12 md:col-span-6 lg:col-span-4 text-right md:text-center">
          <h5>کد رهگیری مرسوله</h5>
          <p class="text-sm text-cool-500 font-thin mt-2">{{ order.shipments[0].tracking_code }}</p>
        </div>
        <div class="col-span-12 md:col-span-6 lg:col-span-12 text-right md:text-center">
          <h5>آدرس پستی</h5>
          <p class="text-sm text-cool-500 font-thin mt-2">{{ fullAddress }}</p>
        </div>

      </div>
    </div>
    <div>
      <div class="title-section mb-6 relative">
        <h3 class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10 mt-8">
          فاکتور این سفارش
        </h3>
      </div>
      <div class="factor-area rounded-lg border border-cool-200 px-5 pb-6">
        <div class="title-item grid-cols-6 gap-4 py-3 hidden lg:grid">
          <div class="col-span-12 md:col-span-3 text-center">
            <h5 class="h-5">نام محصول</h5>
          </div>
          <div class="col-span-6 md:col-span-1 text-center ">
            <h5>قیمت واحد</h5>
          </div>
          <div class="col-span-6 md:col-span-1  text-center">
            <h5> تعداد</h5>
          </div>
          <div class="col-span-12 md:col-span-1  text-center">
            <h5>قیمت کل</h5>
          </div>
        </div>
        <template v-for="(variant,index) in order.product_variants">
          <div :key="index" class=" cart-item grid grid-cols-6 gap-4 border-b border-cool-400 border-dashed py-4">
            <div class="col-span-6 md:col-span-3 ">
              <div class="product-cart grid grid-cols-12 gap-2 border-b pb-2 border-dashed border-cool-200 md:pb-0 md:border-b-0">
                <div class="col-span-3 md:col-span-4 lg:col-span-3">
                  <nuxt-link :to="{name:'products-slug',params:{slug:variant.product.slug}}">
                    <img class="pimg-cart w-full border-cool-200 border rounded-lg"
                         :src="variant.product.files[0].link" alt="">
                  </nuxt-link>
                </div>
                <div class="col-span-8 md:col-span-7 lg:col-span-8">
                  <a href="">
                    <h3 class="ptitle-cart text-cool-600 text-sm font-bold inline-block">
                      {{ variant.product.name }}</h3>
                  </a>
                  <template v-if="variant.attribute_id">
                    <div class="sp-cart" v-if="variant.attribute.type != 2">
                      <span class="text-xs text-cool-500">{{ variant.attribute.name }}</span>
                      <span class="text-xs text-cool-500"> {{ variant.attribute.vlue }}</span>
                    </div>
                    <div class="sp-cart inline-block" v-else>
                      <span class="text-xs text-cool-500">{{ variant.attribute.name }}</span>
                      <span class="text-xs text-cool-500">
                          <button class=" w-4 h-4 border-2 rounded-3xl mr-1 relative lg:-top-1 top-0"
                                  :style="{borderColor:variant.attribute.code}"></button></span>
                    </div>
                  </template>
                  <div class="holesale-tag lg:float-left mt-1.5" v-if="applePrice(variant) == 'wholesale_price'">
                    <p class="text-red-500 text-xs">عمده محاسبه شده است</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-6 md:col-span-1 text-center ">
              <div
                  class="area-unitprice border-b pb-2 border-dashed md:border-b-0 border-cool-200 md:border-l md:border-r md:border-dashed md:border-cool-300 min-h-90 flex items-center align-middle">
                <div class="block md:hidden">
                  <h5>قیمت واحد: </h5>
                </div>
                <div class=" m-auto">
                        <span class=" m-auto text-right" :class="{
                          'text-cool-400' : !isSellingPrice(variant),
                          'text-red-500' : isSellingPrice(variant),
                          'inline-block ' : isSellingPrice(variant),
                          'block' : !isSellingPrice(variant),
                          'line-through': !isSellingPrice(variant),
                        }">{{ variant.selling_price }}</span>
                  <span class="text-center m-auto text-cool-800 inline-block " v-if="!isSellingPrice(variant)">{{ variant[applePrice(variant)] }}</span>
                  <span class="text-center m-auto text-xs text-cool-800 inline-block mr-1">تومان</span>
                </div>

              </div>
            </div>
            <div class="col-span-6 md:col-span-1 text-center">
              <div
                  class="unit-cart border-b pb-2 border-dashed md:border-b-0 border-cool-200 min-h-90 m-auto flex items-center align-middle">
                <div class="block md:hidden">
                  <h5>تعداد: </h5>
                </div>
                <div class=" text-center m-auto px-2">
                  <span class="ltr md:left-5 lg:left-0">{{ variant.pivot.quantity }}</span>
                </div>
              </div>
            </div>
            <div class="col-span-6 md:col-span-1  text-center">
              <div
                  class="hole-cart md:border-r md:border-dashed md:border-cool-300 m-auto min-h-90 flex items-center align-middle">
                <div class="block md:hidden">
                  <h5>قیمت کل: </h5>
                </div>
                <div class=" m-auto">
                        <span class=" m-auto block text-right" :class="{
                          'text-cool-400' : !isSellingPrice(variant),
                          'text-red-500' : isSellingPrice(variant),
                          'inline-block ' : isSellingPrice(variant),
                          'block' : !isSellingPrice(variant),
                          'line-through': !isSellingPrice(variant),
                        }">{{ variant.pivot.quantity * variant.selling_price }}</span>
                  <span class="text-center m-auto  text-red-500 font-bold inline-block " v-if="!isSellingPrice(variant)">
                          {{ variant.pivot.quantity * variant[applePrice(variant)] }}</span>
                  <span class="text-center m-auto text-xs text-cool-800 inline-block mr-1">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="final-factor grid grid-cols-6 gap-30">
          <div class="col-span-6 lg:col-start-4 lg:col-end-7 rounded-lg rounded-t-none bg-cool-100 text-cool-700 p-2 mt-1">

            <div class="price-item h-7 ">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">جمع کل سفارشات  :</span>
              <span class="text-base font-bold text-cool-500 mx-1 float-left"> {{ sumSellingPrice }}</span>
            </div>
            <div class="price-item h-7 ">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">میزان تخفیف  :</span>
              <span class="text-base font-bold text-red-500 mx-1 float-left"> {{ sumSellingPrice-sumDiscount }} - </span>
            </div>
            <div class="price-item h-7 ">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">هزینه ارسال  :</span>

              <span class="text-base font-bold text-cool-500 mx-1 float-left"> 35,000,000</span>
            </div>
            <div class="price-item h-7 ">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">جمع کل فاکتور  :</span>

              <span class="text-base font-bold text-green-500 mx-1 float-left"> {{ sumDiscount}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  async asyncData(ctx) {
    return {
      number1: 1,
      colorx: '#F97316',
      order: await ctx.store.dispatch('order/getOrder', ctx.params.id).then(res => res.data),
      fullAddress: ''
    };
  },
  computed: {
    sumSellingPrice() {
      let sum = 0
      this.order.product_variants.forEach(variant => {
        sum += variant.pivot.quantity * variant.selling_price
      })
      return sum
    },
    sumDiscount() {
      let sum = 0
      this.order.product_variants.forEach(variant => {
        sum += variant.pivot.quantity * variant[this.applePrice(variant)]
      })
      return sum
    },
    percentDiscount() {
      return ~~((this.sumSellingPrice - this.sumDiscount) / (this.sumSellingPrice / 100))
    }
  },

  methods: {
    applePrice(variant) {
      if (variant.pivot.quantity >= variant.minimum_wholesale) {
        return 'wholesale_price'
      }
      if (variant.discounted_price) {
        return 'discounted_price'
      }
      return 'selling_price'
    },
    isWholesalePrice(variant) {
      return this.applePrice(variant) === 'wholesale_price'
    },
    isDiscountedPrice(variant) {
      return this.applePrice(variant) === 'discounted_price'
    },
    isSellingPrice(variant) {
      return this.applePrice(variant) === 'selling_price'
    },
    async getfullAddress() {
      this.fullAddress = await this.$store.dispatch('address/getFullAddress', this.order.shipments[0].address)
    }
  },
  mounted() {
    this.getfullAddress()
  }
};
</script>
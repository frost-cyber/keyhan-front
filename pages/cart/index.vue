<template>
  <div class="cart-page">
    <section class="cart-itemes">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 lg:col-span-9">
            <div class="title-section mt-3 mb-2 relative">
              <h3
                class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-600 pb-2 pl-5 ">
                <i class="fal fa-shopping-cart text-3xl relative top-3"></i>
                سبد خرید شما
              </h3>
            </div>
            <div class="cart-area rounded-lg border border-cool-200 px-8 pb-6">
              <div class="cart-item grid grid-cols-6 gap-4 border-b border-cool-400 border-dashed py-4">
                <div class="col-span-12 md:col-span-3 ">
                  <h5 class="h-5"></h5>
                </div>
                <div class="col-span-6 md:col-span-1 text-center ">
                  <h5>قیمت واحد</h5>
                </div>
                <div class="col-span-6 md:col-span-1 text-center">
                  <h5> تعداد</h5>
                </div>
                <div class="col-span-12 md:col-span-1 text-center">
                  <h5>قیمت کل</h5>
                </div>
              </div>
              <template v-for="(variant,index) in cart.product_variants">
                <div :key="index" class=" cart-item grid grid-cols-6 gap-4 border-b border-cool-400 border-dashed py-4">
                  <div class="col-span-6 md:col-span-3 ">
                    <div
                      class="product-cart grid grid-cols-12 gap-2 border-b pb-2 border-dashed border-cool-200 md:pb-0 md:border-b-0">
                      <div class="trash-cart col-span-1 md:col-span-1 lg:col-span-1 lg:m-auto relative top-8 md:top-9 lg:top-0">
                        <i class="fal fa-trash text-cool-500 hover:text-orange-400" @click="deleteProductVariant(variant.id)"></i>
                      </div>
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
                        <vs-input-number :min="1" @input="changeQuantity($event , variant)" class="ltr md:left-5 lg:left-0" color="var(--dd)"
                                         icon-pack="fal" icon-dec="fa-minus" icon-inc="fa-plus" v-model="variant.pivot.quantity"/>
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
            </div>
            <div class="btn-go-back text-center -mt-3">
              <nuxt-link class="btn-border" :to="{name:'products'}">بازگشت به آرشیو محصولات</nuxt-link>
            </div>

          </div>
          <div class="col-span-12 lg:col-span-3">
            <div class="col-span-12 lg:col-span-3">
              <div class="sidebar-product rounded-lg border border-cool-200 p-5 lg:mt-16 relative">
                <div class="price-cart h-5">
                  <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">قیمت کالاها</span>
                  <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">
                ({{ cart.product_variants.length }})</span
                  >
                  <del class="text-sm font-bold text-cool-700 mx-1 float-left">{{ sumSellingPrice }}</del>
                </div>
                <div class="price-cart mt-3 h-10 pb-3 border-b border-dashed border-cool-300">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">
                تخفیف کالاها</span
              >

                  <span class="text-sm font-bold text-red-600 mx-1 float-left">{{ sumSellingPrice - sumDiscount }}</span>
                  <span class="text-sm font-bold text-red-600 mx-1 float-left"> ({{ percentDiscount }}%)</span>
                </div>
                <div class="price-cart mt-3 h-7 ">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">
                جمع کل سبد خرید :</span
              >

                  <span class="text-sm font-bold text-blue-500 mx-1 float-left">{{ sumDiscount }}</span>
                </div>
                <div class="text-send text-cool-500 text-xs mt-3">
                  هزینه‌ی ارسال در ادامه بر اساس موارد انتخابی شما‌ محاسبه و به این مبلغ اضافه خواهد شد
                </div>
                <div class="cart-btn block-btn mt-4">
                  <nuxt-link :to="{name:'cart-checkout'}">
                    <vs-button color="var(--cart)">ادامه فرآیند خرید</vs-button>
                  </nuxt-link>
                </div>

              </div>
              <div class="note mt-4">
                <figure>
                  <i class="fal fa-exclamation text-3xl text-red-500"></i>
                  <p class="text-cool-500 text-xs relative -top-6 lg:-top-9 pr-6">
                    کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند، برای ثبت
                    .سفارش مراحل بعدی را تکمیل کنید
                  </p>

                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

export default {
  middleware({store , redirect}){
    if (store.getters['cart/currentCartCountItems'] === 0){
      redirect('/')
    }
  },
  data() {
    return {
      number1: 1,
      number2: 1,
      cart: {product_variants: []},
    };
  },
  computed: {
    sumSellingPrice() {
      let sum = 0
      this.cart.product_variants.forEach(variant => {
        sum += variant.pivot.quantity * variant.selling_price
      })
      return sum
    },
    sumDiscount() {
      let sum = 0
      this.cart.product_variants.forEach(variant => {
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
    deleteProductVariant(id) {
      this.$store.dispatch('cart/deleteProductFromCart', id).then(res => {
        if (res.data = 'Deatached') {
          this.cart.product_variants.forEach((productVariant, index) => {
            if (productVariant.id === id) {
              this.cart.product_variants.splice(index, 1)
            }
            this.$store.dispatch('cart/currentCart', {withCount: ['productVariants']}).then(r => {
              this.$store.commit('cart/SET_CURRENT_CART', r.data)
            })
          })
          this.$vs.notify({
            title: 'با موفقیت حذف انجام شد',
            color: 'success',
            position: 'bottom-right'
          })
        }
      })
    },
    changeQuantity(vale, variant) {
      this.$store.dispatch('cart/addToCart', {
        product: variant.product.id,
        product_variant: variant.id,
        quantity: vale
      }).then(res => {
        this.$store.dispatch('cart/currentCart', {withCount: ['productVariants']}).then(r => {
          this.$store.commit('cart/SET_CURRENT_CART', r.data)
        })
      }).catch(error => {
        if (error.response.status === 400) {
          this.$vs.notify({
            title: "با خطا مواجه شده است",
            time: 2000,
            color: "danger",
            text: error.response.data,
            position: "bottom-right",
            icon: 'check_box',
          })
        }
      })
    },
    getCurrentCart() {
      this.$store.dispatch('cart/currentCart', {with: ['productVariants.product.files', 'productVariants.attribute']}).then(r => {

        this.cart = r.data
      })
    }
  },
  fetch() {
    this.getCurrentCart()
  }
};
</script>

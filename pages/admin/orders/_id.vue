<template>
  <vs-card>
    <div class="grid grid-cols-6 gap-2">
     <div class="col-span-2">
       <vs-list>
         <vs-list-item title="نام">{{order.user.name}}</vs-list-item>
         <vs-list-item title="ایمیل">{{order.user.email}}</vs-list-item>
         <vs-list-item title="آدرس">
           {{ state.find(c => c.id == order.shipments[0].address.state).name }}-{{ cities.find(c => c.id == order.shipments[0].address.city).name }}-{{order.shipments[0].address.address}}
         </vs-list-item>
       </vs-list>
       <div>
         <vs-list>
           <vs-list-item title="وضعیت پرداخت">
             {{order.payments[0].status}}
           </vs-list-item>
           <vs-list-item title="کد رهگیری پستی">
             <vs-input class="w-full" v-model="order.shipments[0].tracking_code"/>
           </vs-list-item>
           <vs-list-item title="وضعیت سفارش">
             <template>
               <tree-select  :options="statuses" v-model="order.status"/>
             </template>
           </vs-list-item>
         </vs-list>
       </div>
       <vs-button @click.native="save" color="success">ثبت</vs-button>
     </div>
      <div class="col-span-4">
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
                    <span   class="ltr md:left-5 lg:left-0">{{variant.pivot.quantity}}</span>
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
        <div class="sidebar-product rounded-lg border border-cool-200 p-5 lg:mt-16 relative">
          <div class="price-cart h-5">
            <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">قیمت کالاها</span>
            <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">
                ({{ order.product_variants.length }})</span
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
        </div>

      </div>
    </div>
  </vs-card>
</template>

<script>
import {cities, ostan} from "~/plugins/cities";

export default {
  name: "_id",
  async asyncData(ctx){
    return{
      order : await ctx.store.dispatch('order/getOrder',ctx.params.id).then(res=>res.data),
      state: ostan,
      cities: cities,
      statuses:[
        {label : 'درحال پردازش',id:0},
        {label : 'لغو شد',id:1},
        {label : 'ارسال شد',id:2},
      ]
    }
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
    save(){
      this.$store.dispatch('order/saveChange',
          {orderId:this.order.id,data:{'status':this.order.status,'tracking_code':this.order.shipments[0].tracking_code}}).then(res=>{
        if(res.status === 200){
          this.$vs.notify({
            'title' : 'با موفقیت ذخیره شد',
            'color' : 'success',
            'position' : 'bottom-right'
          })
        }
      }).catch(errors=>{
        if(errors.response.status ===422){
          this.$vs.notify({
            'title' : 'با  خطا مواجه شده است',
            'color' : 'danger',
            'text'   : Object.values(errors.response.data.errors).map(z=>z[0]).join(' <br> '),
            'position' : 'bottom-right'
          })
        }
      })

    }
  }
}
</script>

<style>
.vs-list--slot{
  width: 70%;
}
</style>
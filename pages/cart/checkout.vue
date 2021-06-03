<template>
  <div class="cart-page">
    <section class="cart-itemes">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 lg:col-span-9">
            <div class="title-section mt-3 mb-2 relative">
              <h3
                class="title-border relative text-xl font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-5 "
              >
                <i class="fal fa-credit-card-front text-3xl relative top-3"></i>
                آدرس ها و فاکتورها
              </h3>
            </div>
            <div class="checkout-area rounded-lg border border-cool-200 px-5 pb-6">
              <div class="add-address bg-cool-300 rounded-lg m-auto text-center p-5 mt-5" @click.prevent="popupActive=!popupActive">
                <i class="fal fa-map-marker-plus text-9xl text-cool-500"></i>
                <h3 class="mt-3 text-cool-500 font-bold">افزودن آدرس جدید</h3>
              </div>
              <save-address :currentAddress="currentAddress" :titlePopup="titlePopup" :popupActive="popupActive" @close="close" @saveAddress="saveAddress"/>
              <div class="addreses grid grid-cols-12 gap-5 md:gap-30 mt-5">
                <div class="col-span-12 md:col-span-4" v-for="(address,index) in addresses" :key="index">
                  <vs-button class="block-btn text-right text-sm w-full" color="#4B5563" @click.native="setAddress(address.id)" :type="address.id == cart.address_id ?'filled':'border'">
                    <div class="name">{{address.name}}</div>
                    <div class="address"> {{ state.find(s => s.id == address.state).name }} -
                      {{ cities.find(c => c.id == address.city).name }}- {{ address.address }}</div>
                    <div class="codeposti">{{ address.phone }}</div>
                    <div class="phone">{{address.mobile}}</div>
                  </vs-button>
                </div>
              </div>

            </div>
          </div>
          <div class="col-span-12 lg:col-span-3">
            <div class="sidebar-product rounded-lg border border-cool-200 p-5 lg:mt-16 relative">
              <div class="price-checkout h-7" v-if="false">
                <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">جمع سبد خرید</span>
                <del class="text-sm font-bold text-cool-700 mx-1 float-left">{{ sumDiscount }}</del>
              </div>
           <template v-if="false">
             <div class="price-checkout h-7">
              <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">
                هزینه ارسال</span>
               <del class="text-sm font-bold text-cool-700 mx-1 float-left"> 20,000</del>
             </div>
             <div class="price-cart h-7 pb-3 border-b border-dashed border-cool-300">
              <span class="text-cool-600 text-sm font-normal float-right mt-0.5">
                اعمال تخفیف</span
              >
               <span class="text-sm font-bold text-red-600 mx-1 float-left"> 12,000- </span>
             </div>
             <div class="coupon mt-3 pb-3 relative">
               <h4 class="text-cool-600 text-sm font-normal text-right mt-0.5 mb-4">
                 کد تخفیف</h4
               >
               <vs-input class="w-full max-w-full" size="default" placeholder=" کد تخفیف را وارد کنید " v-model="value1"/>
               <vs-button color="#9CA3AF" type="filled">اعمال تخفیف</vs-button>
             </div>
           </template>
              <div class="price-checkout h-7 pt-3 border-t border-cool-300 border-dashed">
              <span class="cart-kalaha text-cool-600 text-sm font-normal float-right mt-0.5">
                هزینه نهایی</span>
                <del class="text-sm font-bold text-cool-700 mx-1 float-left"> {{ sumDiscount }}</del>
              </div>
            </div>
            <div class="sidebar-product rounded-lg border border-cool-200 p-5 mt-5 relative">
              <h3 class="font-bold text-cool-700 mb-4">انتخاب روش پرداخت</h3>
              <div class="pay-model text-right">
                <vs-radio class="mb-2" color="#f97416" v-model="radios1" vs-value="HEX">درگاه بانک ملت</vs-radio>
                <vs-radio class="mb-2" color="#f97416" v-model="radios2" vs-value="HEX">درگاه بانک پاسارگاد</vs-radio>
                <vs-radio class="mb-2" color="#f97416" v-model="radios3" vs-value="HEX">درگاه زرین پال</vs-radio>

              </div>
              <div class="cart-btn block-btn mt-8">
                <vs-button color="var(--cart)">پرداخت</vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import saveAddress from '@/components/front/profile/saveAddress'
import {cities, ostan} from '@/plugins/cities'
export default {
  data() {
    return {
      currentAddress: {},
      addresses:[],
      popupActive: false,
      titlePopup: 'ایجاد',
      state: ostan,
      cities: cities,
      cart: {product_variants: []},
    };
  },
  computed:{
    sumDiscount() {
      let sum = 0
      this.cart.product_variants.forEach(variant => {
        sum += variant.pivot.quantity * variant[this.applePrice(variant)]
      })
      return sum
    },
  },
  methods: {
    setAddress(id){
      this.$store.dispatch('cart/setAddress',id).then(res=>{
        if (res.status ==200){
          this.$vs.notify({
            title:'ادرس با موفقیت اضافه شد',
            possitions:'bottom-right',
            color:'success',
          })
            this.cart.address_id = id
        }
      })

    },
    applePrice(variant) {
      if (variant.pivot.quantity >= variant.minimum_wholesale) {
        return 'wholesale_price'
      }
      if (variant.discounted_price) {
        return 'discounted_price'
      }
      return 'selling_price'
    },
    close(val){
      if (val === this.popupActive){
        return
      }
      if(!val){
          this.currentAddress={}
      }
      this.popupActive=! this.popupActive
    },
    getAddresses() {
      this.$store.dispatch('address/getAddress').then(res => {
        if (res.status === 200) {
          this.addresses = res.data
        }
      })
    },
    saveAddress() {
      this.$store.dispatch('address/saveAddress', this.currentAddress).then(res => {
        if (res.status == 200) {
          this.$vs.notify({
            title: "با موفقیت ذخیره شد",
            color: "success"
          })
          this.getAddresses()
          this.popupActive = false
        }
      }).catch(errors => {
        if (errors.response.status == 422) {
          this.$store.commit('address/SET_ERRORS', errors.response.data.errors)
        }
      })
      return
    },
    getCurrentCart() {
      this.$store.dispatch('cart/currentCart', {with: ['productVariants.product.files', 'productVariants.attribute']}).then(r => {

        this.cart = r.data
      })
    }

  },
  fetch() {
    this.getAddresses(),
    this.getCurrentCart()

  },
  components: {
    saveAddress
  },
};
</script>

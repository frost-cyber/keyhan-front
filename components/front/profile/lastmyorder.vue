<template>
  <div>
    <div class="title-section mb-2 relative">
      <h3
          class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10 "
      >
        لیست سفارش های من
      </h3>
    </div>
    <div class="order-list mt-5 " v-for="(order,index) in orders" :key="index">
      <div class="num-order text-sm text-cool-600 inline-block">
        <span>شماره سفارش : </span>
        <span class="font-thin">{{ order.order_number }}</span>
      </div>
      <div class="num-order text-sm text-cool-600 inline-block mr-5">
        <span>تاریخ ثبت : </span>
        <span class="font-thin">{{ $jalaali(order.created_at).format('jD jMMMM jYYYY') }}</span>
      </div>
      <div class="num-order text-sm text-cool-600 my-3">
        <span>مبلغ کل : </span>
        <span class="font-thin">{{ order.total_price | currency }}</span>
      </div>
      <div class="num-order text-sm text-cool-600 my-3">
        <span>محصولات : </span>
        <div class="product-list mt-3 pb-3 border-b border-dashed border-cool-200">
          <a href="" v-for="(variant,index) in order.product_variants.slice(0,5)" :key="index">
            <img class="w-11 border rounded-lg border-solid border-cool-300 inline-block mx-1"
                 :src="(variant.files[0]|| variant.product.files[0]).link" alt="">
          </a>
          <span v-if="order.product_variants.length >5"> و...</span>
          <nuxt-link class="text-xs text-cool-500 hover:text-orange-500" :to="{name:'profile-orders-id',params:{id:order.id}}">
            <vs-button class="text-xs mx-auto block mt-4" color="#F97316" type="border">
              مشاهده جزئیات
            </vs-button>
          </nuxt-link>
        </div>

      </div>
    </div>

    <div class="paganition profile mt-6 mx-auto">
      <vs-pagination :total="pagination.last_page" icon-pack="fal" prev-icon="fa-arrow-right" next-icon="fa-arrow-left" v-model="pagination.current_page"></vs-pagination>
    </div>
    <div class="more text-left mb-3 mt-9">
      <a class=" text-cool-600 text-sm px-3 pb-2 border-cool-600 border-b border-dashed" href="">مشاهده همه</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "myorder",
  data() {
    return {
      orders:[],
      pagination: {
        last_page: 1,
        current_page: 1
      },
    }
  },
  watch: {
    'pagination.current_page'() {
      this.getLastOrders()
    }
  },
  fetch() {
    this.getLastOrders()
  },
  methods: {
    getLastOrders() {
      let query = {
        user: this.$auth.user.id,
        with: ['payments', 'shipments', 'productVariants.product.files','productVariants.files'],
        paginate: 2,
        page: this.pagination.current_page,
        sort: '+created_at'
      }
      this.$store.dispatch('order/getOrders', query).then(res => {
        if (res.status === 200) {
          this.pagination = res.data
          this.orders = res.data.data
        }
      })
    }
  },
}
</script>

<style scoped>
img {
  max-width: 9%;
}
</style>

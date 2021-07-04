<template>
  <div>
    <div class="title-section mb-6 relative">
      <vs-alert :active="redirectedFromGateWay" :color="alertColor" icon="new_releases">
        <span>{{ message }}</span>
      </vs-alert>
      <h3 class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10">
        همه سفارش ها
      </h3>
    </div>
    <div class="title-order grid-cols-12 gap-4 mb-6 hidden lg:grid text-center">
      <div class="col-span-2">
        <h5>شماره سفارش</h5>
      </div>
      <div class="col-span-2">
        <h5>تاریخ ثبت</h5>
      </div>
      <div class="col-span-2">
        <h5>وضعیت تحویل</h5>
      </div>
      <div class="col-span-2">
        <h5>مبلغ</h5>
      </div>
      <div class="col-span-2">
        <h5>عملیات پرداخت</h5>
      </div>
      <div class="col-span-2">
        <h5>جزئیات</h5>
      </div>
    </div>
    <div class="item-order grid grid-cols-12 gap-4 my-3 text-center" v-for="(order,index) in orders" :key="index">
      <div class="col-span-6 md:col-span-4 lg:col-span-2">
        <h5 class="block lg:hidden mb-2">شماره سفارش</h5>
        <a href="">
          <span class="text-cool-500 text-sm font-thin">{{ order.order_number }}</span>
        </a>
      </div>
      <div class="col-span-6 md:col-span-4 lg:col-span-2">
        <h5 class="block lg:hidden mb-2">تاریخ ثبت</h5>
        <span class="text-cool-500 text-sm font-thin">{{ $jalaali(order.created_at).format('jD jMMMM jYYYY') }}</span>
      </div>
      <div class="col-span-6 md:col-span-4 lg:col-span-2">
        <h5 class="block lg:hidden mb-2">وضعیت تحویل</h5>
        <span class="border-blue-500 border text-blue-500 py-1 px-3 text-xs rounded-lg bg-blue-100">{{ order.shipments[0].status }}</span>
      </div>
      <div class="col-span-6 md:col-span-4 lg:col-span-2">
        <h5 class="block lg:hidden mb-2">مبلغ</h5>
        <span class="text-cool-700 text-sm font-thin">{{ order.total_price | currency }}</span>
      </div>
      <div class="col-span-6 md:col-span-4 lg:col-span-2">
        <h5 class="block lg:hidden mb-2">عملیات پرداخت</h5>
        <span class="py-1 px-3 text-xs rounded-lg" :class="{
          'text-green-500':order.payments[0].status==='پرداخت شده',
          'text-yellow-500':order.payments[0].status==='در انتظار پرداخت',
          'text-red-500':order.payments[0].status==='پرداخت لغو شده',
        }">{{ order.payments[0].status }}</span>
      </div>
      <div class="col-span-6 md:col-span-4 lg:col-span-2">
        <h5 class="block lg:hidden mb-2">جزئیات</h5>
        <nuxt-link class="text-xs text-cool-500 hover:text-orange-500" :to="{name:'profile-orders-id',params:{id:order.id}}">
          مشاهده جزئیات
        </nuxt-link>
      </div>
      <hr class="col-span-full border-cool-200 border-dashed">
    </div>

    <div class="paganition profile mt-10 mx-auto">
      <vs-pagination :total="pagination.last_page" icon-pack="fal" prev-icon="fa-arrow-right" next-icon="fa-arrow-left" v-model="pagination.current_page"></vs-pagination>
    </div>
  </div>

</template>
<script>
export default {
  name: "index",
  data() {
    return {
      redirectedFromGateWay: false,
      alertColor:'warning',
      message: "در حال بررسی پرداخت",
      orders: [],
      pagination: {
        last_page: 1,
        current_page: 1
      },
    }
  },
  watch: {
    'pagination.current_page'() {
      this.getOrders()
    }
  },
  methods: {
    getOrders() {
      let query = {
        user: this.$auth.user.id,
        with: ['payments', 'shipments'],
        paginate: true,
        page: this.pagination.current_page,
        sort: '-created_at'
      }
      this.$store.dispatch('order/getOrders', query).then(res => {
        if (res.status === 200) {
          this.orders = res.data.data
          this.pagination = res.data
        }
      })
    }
  },
  mounted() {
    if (this.$route.query.Status) {
      this.redirectedFromGateWay = true
      this.$store.dispatch('cart/checkPay', this.$route.query).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.message = 'پرداخت موفقیت آمیز'
          this.alertColor = 'success'
          this.getOrders()
        }
      }).catch(errors => {
        if (errors.response.status === 400) {
          this.message = 'پرداخت لغو شده'
          this.alertColor = 'danger'
          this.getOrders()
        }
      })
    }
  },
  fetch() {
    this.getOrders()
  }
}
</script>

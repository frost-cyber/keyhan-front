<template>
  <vs-card>
    <vs-table ref="table" pagination :data="orders">
      <template slot="thead">
        <vs-th>شماره سفارش</vs-th>
        <vs-th>نام کاربر</vs-th>
        <vs-th>تاریخ</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
          <vs-td >
            <p>
              {{tr.order_number}}
            </p>
          </vs-td>
          <vs-td >
            <p>
              {{tr.user.name}}
            </p>
          </vs-td>
          <vs-td>
            <p class="">{{ $jalaali(tr.created_at).format('jYYYY/jMM/jDD') }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-orders-id' , params:{id:tr.id}}" >
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      orders:[]
    }
  },
  methods: {
    getOrders(){
      this.$store.dispatch('order/getOrders',{with:'user'}).then(res=>{
        if(res.status){
          this.orders = res.data
        }
      })
    }
  },
  fetch() {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>

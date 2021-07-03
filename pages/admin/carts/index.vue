<template>
  <vs-card>
    <vs-table ref="table" pagination :data="carts">
      <template slot="thead">
        <vs-th>نام کاربر</vs-th>
        <vs-th>تاریخ</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
          <vs-td >
            <p>
                {{tr.user.name}}
            </p>
          </vs-td>
          <vs-td>
            <p class="">{{ $jalaali(tr.created_at).format('jYYYY/jMM/jDD') }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-carts-id' , params:{id:tr.id}}" >
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
     carts:[]
    }
  },
  methods: {
    getCarts(){
      this.$store.dispatch('cart/getCarts',{with:'user'}).then(res=>{
        if(res.status){
          this.carts = res.data
        }
      })
    }
  },
  fetch() {
    this.getCarts()
  }
}
</script>

<style scoped>

</style>

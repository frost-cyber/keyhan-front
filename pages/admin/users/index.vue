<template>
  <vs-card>
    <vs-table ref="table" pagination :data="users">
      <template slot="thead">
        <vs-th>نام و نام خانوادگی</vs-th>
        <vs-th>شماره موبایل</vs-th>
        <vs-th>کد ملی</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

          <vs-td>
            <span class="">{{ tr.name }} {{tr.last_name}}</span>
          </vs-td>
          <vs-td>
            <span>{{tr.mobile}}</span>
          </vs-td>
          <vs-td>
            <span>{{tr.national_code}}</span>

          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-users-id' , params:{id:tr.id}}" >
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteUser(tr)"/>

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
      image:true,
      users:[]
    }
  },
 methods:{
   deleteUser(id){
     this.$store.dispatch('user/deleteUser', id).then((res) =>{
       if (res.status === 200){
         this.$store.commit('user/DELETE_USER', id)
         this.$vs.notify({
           title: "با موفقیت حذف شد.",
           time: 2000,
           color: "success",
           position: "bottom-right",
           icon: 'check_box',
         })
         this.getUsers()
       }
     }).catch((err) =>{
       this.$vs.notify({
         title: "حذف ناموفق!",
         text: "خطایی رخ داده است.",
         time: 2000,
         color: "danger",
         position: "bottom-right",
         icon: 'check_box',
       })
     })
   },
   getUsers(){
     this.$store.dispatch('user/getUsers').then(res=>{
       this.users = res.data
     })
   }
 },
  fetch() {
    this.getUsers()
  },
}
</script>

<style scoped>

</style>
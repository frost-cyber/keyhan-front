<template lang="html">
    <vs-card>
      <vs-table ref="table" pagination :data="admins">
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
              <NuxtLink :to="{name:'admin-admins-id' , params:{id:tr.id}}" >
                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
              </NuxtLink>
              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteAdmin(tr)"/>

            </vs-td>
          </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </vs-card>

</template>

<script>
export default {
  name:"index",
  data(){
    return{
      image:true,
      admins:[]
    }
  },
  methods:{
    deleteAdmin(id){
      this.$store.dispatch('admin/deleteAdmin', id).then((res) =>{
        if (res.status === 200){
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
          this.getAdmins()
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
    getAdmins(){
      this.$store.dispatch('admin/getAdmins').then(res=>{
        this.admins = res.data
      })
    }
  },
  fetch() {
    this.getAdmins()
  }
}
</script>
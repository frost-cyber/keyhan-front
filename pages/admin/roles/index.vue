<template lang="html">
<vs-card>
  <vs-table ref="table" pagination :data="roles">
    <template slot="thead">
      <vs-th>نوع</vs-th>

    </template>
    <template slot-scope="{data}">
      <tbody>
      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

        <vs-td>
          <span class="">{{ tr.name }}</span>
        </vs-td>

        <vs-td class="whitespace-no-wrap">
          <NuxtLink :to="{name:'admin-roles-id' , params:{id:tr.id}}" >
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
          </NuxtLink>
          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteRole(tr)"/>

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
      roles:[],
    }
  },
  methods:{
    getroles(){
      this.$store.dispatch('role/getRoles').then(res=>{
        this.roles=res.data
      })
    },
    deleteRole(id){
      this.$store.dispatch('role/deleteRole', id).then((res) =>{
        if (res.status === 200){
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
          this.getroles()
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
    }
  },
  fetch() {
    this.getroles()
  }
}
</script>

<style scoped>

</style>
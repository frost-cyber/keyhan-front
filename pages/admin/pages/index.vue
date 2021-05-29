<template>
<vs-card>
  <vs-table ref="table" pagination :data="pages">
    <template slot="thead">
      <vs-th>عنوان</vs-th>
      <vs-th>وضعیت</vs-th>
      <vs-th>تاریخ</vs-th>
      <vs-th>تنظیمات</vs-th>
    </template>
    <template slot-scope="{data}">
      <tbody>
      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
        <vs-td>
          <p class="">{{ tr.title }}</p>
        </vs-td>
        <vs-td v-if="tr.status === 'active'">فعال</vs-td>
        <vs-td v-else> غیر فعال</vs-td>
        <vs-td>
          <p class="">{{ $jalaali(tr.created_at).format('jYYYY/jMM/jDD') }}</p>
        </vs-td>
        <vs-td class="whitespace-no-wrap">
          <NuxtLink :to="{name:'admin-pages-id' , params:{id:tr.id}}" >
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
          </NuxtLink>
          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deletePage(tr)"/>
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
      pages:[]
    }
  },
  fetch() {
    this.getPage()
  },
  methods:{
    getPage(){
      this.$store.dispatch('page/getPages').then(res=>{
        this.pages = res.data
      })
    },
    deletePage(page){
      this.$store.dispatch('page/deletePage', page).then((res) =>{
        if (res.status === 200){
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
        this.getPage()
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
    }

}
</script>

<style scoped>

</style>

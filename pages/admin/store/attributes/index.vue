<template>
  <vs-card>
    <vs-table ref="table" pagination :data="attributes">
      <template slot="thead">
        <vs-th>نام</vs-th>
        <vs-th>نوع</vs-th>
        <vs-th>متغیر</vs-th>
        <vs-th>تعداد ویژگی ها</vs-th>
        <vs-th>ویرایش</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="">{{ tr.name }}</p>
          </vs-td>
          <vs-td>
            <p class="">{{ tr.type }}</p>
          </vs-td>
          <vs-td>
            <vs-chip :color="tr.is_variable?'primary':'success'" class="product-order-status">{{ tr.is_variable ? 'متغیر است' : 'ساده است' }}</vs-chip>
          </vs-td>
          <vs-td>
            <p class="">{{ tr.countAttributes }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-store-attributes-id' , params:{id:tr.id}}">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteAttribute(tr)"/>
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
  computed: {
    attributes() {
      return this.$store.getters['attribute/getAttributes']
    }
  },
  methods: {
    deleteAttribute(attribute) {
      this.$store.dispatch('attribute/deleteAttribute', {attribute , query:{group:null}}).then((res) =>{
        if (res.status === 200){
          this.$store.commit('attribute/DELETE_ATTRIBUTE', attribute)
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-center",
            icon: 'check_box',
          })
        }
      }).catch((err) =>{
        this.$vs.notify({
          title: "حذف ناموفق!",
          text: "خطایی رخ داده است.",
          time: 2000,
          color: "danger",
          position: "bottom-center",
          icon: 'check_box',
        })
      })
    }
  },
  fetch() {
    this.$store.dispatch('attribute/getAttributes' , {
      groupBy : 'name',
    })
  }
}
</script>

<style scoped>

</style>

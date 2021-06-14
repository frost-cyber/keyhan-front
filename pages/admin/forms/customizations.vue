<template>
  <vs-card>
    <vs-table ref="table" :data="customizations">
      <template slot="thead">
        <vs-th>نام و نام خانوادگی</vs-th>
        <vs-th>شماره تماس</vs-th>
        <vs-th>توضیحات</vs-th>
        <vs-th>وضعیت</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(tr, index) in data">
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.contact }}
          </vs-td>
          <vs-td>
            {{ tr.discription }}
          </vs-td>
          <vs-td>
            <vs-switch @input="changeStatus(tr.id)" color="success" v-model="tr.status">
              <span slot="on"> بررسی شده</span>
              <span slot="off">بررسی نشده</span>
            </vs-switch>
          </vs-td>
          <vs-td>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteCustomization(tr)"/>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
export default {
  name: "customizations",
  data() {
    return {
      customizations: []
    }
  },
  fetch() {
    this.getCuctomizations()
  },
  methods: {
    getCuctomizations() {
      this.$store.dispatch('form/getCustomizations').then(res => {
        if (res.status === 200) {
          this.customizations = res.data
          this.$store.commit('form/SET_CUSTOMIZATION', this.$cloneObject(res.data))
        }
      })
    },
    deleteCustomization(customization) {
      this.$store.dispatch('form/deleteCustomization', customization).then((res) => {
        if (res.status === 200) {
          this.$store.commit('form/DELETE_CUSTOMIZATION', customization)
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
        this.getCuctomizations()
      }).catch((err) => {
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
    changeStatus(id) {
      this.$store.dispatch('form/toggleCustomizationStatus', id)

    }

  }
}
</script>

<style scoped>

</style>

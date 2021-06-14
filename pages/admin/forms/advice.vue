<template>
  <vs-card>
    <vs-table ref="table" :data="advices">
      <template slot="thead">
        <vs-th>نام و نام خانوادگی</vs-th>
        <vs-th>شماره تماس</vs-th>
        <vs-th>درخواست</vs-th>
        <vs-th>وضعیت</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(tr, index) in data">
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.phone }}
          </vs-td>
          <vs-td>
            {{ tr.subject }}
          </vs-td>
          <vs-td>
            <vs-switch @input="changeChecked(tr.id)" color="success" v-model="tr.check">
              <span slot="on"> بررسی شده</span>
              <span slot="off">بررسی نشده</span>
            </vs-switch>
          </vs-td>
          <vs-td>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteAdvice(tr)"/>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
export default {
  name: "advice",
  data() {
    return {
      advices: []
    }
  },
  fetch() {
    this.getAdvices()
  },
  methods: {
    getAdvices() {
      this.$store.dispatch('form/getAdvices').then(res => {
        if (res.status === 200) {
          this.advices = res.data
          this.$store.commit('form/SET_ADVICE', this.$cloneObject(res.data))
        }
      })
    },
    deleteAdvice(advice) {
      this.$store.dispatch('form/deleteAdvice', advice).then((res) => {
        if (res.status === 200) {
          this.$store.commit('form/DELETE_ADVICE', advice)
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
        this.getAdvices()
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
    changeChecked(id) {
      this.$store.dispatch('form/toggleAdviceCheck', id)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <SaveAttribute :attribute="attribute" :disable="disabled" @save-attribute="saveAttribute"/>
  </div>
</template>

<script>
import SaveAttribute from "~/components/admin/SaveAttribute";

export default {
  name: "update",
  components: {SaveAttribute},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({params , store}) {
    await store.dispatch('attribute/getAttribute', params.id)
    return {
      attribute: store.getters["attribute/getAttribute"],
      disabled: false,
    }
  },
  methods: {
    saveAttribute() {
      this.disabled = true
      this.$store.dispatch('attribute/updateAttribute', this.attribute).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفیت ویژگی آپدیت شد",
            text: "چند لحظه دیگر به صفحه ویژگی ها هدایت خواهید شد.",
            time: 2000,
            color: "success",
            position: "bottom-center",
            icon: 'check_box',
          })
          setTimeout(() => {
            this.$router.push('.')
          }, 2100)
        }
      }).catch(error => {
        this.disabled = false
        if (error.response && error.response.status === 422) {
          this.$store.commit('attribute/SET_ERRORS', error.response.data.errors)
        }
      })
    }
  },
  destroyed() {
    this.$store.commit('attribute/SET_ATTRIBUTE')
  }
}
</script>

<style scoped>

</style>

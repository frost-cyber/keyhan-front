<template>
  <div>
    <SaveAttribute :attribute="attribute" :disable="disabled" @save-attribute="saveAttribute"/>
  </div>
</template>

<script>
import SaveAttribute from "~/components/admin/SaveAttribute";

export default {
  name: "create",
  components: {SaveAttribute},
  data() {
    return {
      attribute: {},
      disabled: false,
    }
  },
  methods: {
    saveAttribute() {
      this.disabled = true
      this.$store.dispatch('attribute/storeAttribute', this.attribute).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفیت ویژگی ساخته شد",
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
  created() {
    this.attribute = JSON.parse(JSON.stringify(this.$store.getters["attribute/getAttribute"]))
  },
  destroyed() {
    this.$store.commit('attribute/SET_ATTRIBUTE')
  }
}
</script>

<style scoped>

</style>

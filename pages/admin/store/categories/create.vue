<template>
  <div>
    <SaveStoreCategory :category="category" :disable="disabled" @save-category="saveCategory" />
  </div>
</template>

<script>
import SaveStoreCategory from "~/components/admin/SaveStoreCategory";

export default {
  name: "create",
  components: {SaveStoreCategory},
  data() {
    return {
      category: {},
      disabled: false,
    }
  },
  methods: {
    saveCategory() {
      this.disabled = true
      this.$store.dispatch('storeCategory/storeCategory', this.category).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفقیت دسته ساخته شد",
            text: "چند لحظه دیگر به صفحه دسته ها هدایت خواهید شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
          setTimeout(() => {
            this.$router.push('.')
          }, 2100)
        }
      }).catch(error => {
        this.disabled = false
        if (error.response && error.response.status === 422) {
          this.$store.commit('storeCategory/SET_ERRORS', error.response.data.errors)
        }
      })
    }
  },
  created() {
    this.category = this.$cloneObject(this.$store.getters['storeCategory/getCategory'])
  },
  destroyed() {
    this.$store.commit('storeCategory/SET_CATEGORY')
    this.category = this.$cloneObject(this.$store.getters['storeCategory/getCategory'])
  }
}
</script>

<style scoped>

</style>

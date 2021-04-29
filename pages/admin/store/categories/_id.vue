<template>
  <div>
    <SaveStoreCategory :category="category" :disable="disabled" @save-category="saveCategory" />
  </div>
</template>

<script>
import SaveStoreCategory from "~/components/admin/SaveStoreCategory";

export default {
  name: "update",
  components: {SaveStoreCategory},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({params , store}) {
    let cat = {}
    store.dispatch('storeCategory/getCategory', {categoryId : params.id}).then(res => cat = res.data)
    return {
      category: cat,
      disabled: false,
    }
  },
  methods: {
    saveCategory() {
      this.disabled = true
      this.$store.dispatch('storeCategory/updateCategory', this.category).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفقیت ویژگی آپدیت شد",
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
          this.$store.commit('storeCategory/SET_ERRORS', error.response.data.errors)
        }
      })
    }
  },
  destroyed() {
    this.$store.commit('storeCategory/SET_CATEGORY')
    this.category = this.$store.getters['storeCategory/getCategory']
  }
}
</script>

<style scoped>

</style>

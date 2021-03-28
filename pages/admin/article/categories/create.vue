<template>
  <div>
    <SaveArticleCategory :category="category" :disable="disabled" @save-category="saveCategory" />
  </div>
</template>

<script>
  import SaveArticleCategory from "~/components/admin/SaveArticleCategory";

  export default {
    name: "create",
    components: {SaveArticleCategory},
    data() {
      return {
        category: {},
        disabled: false,
      }
    },
    methods: {
      saveCategory() {
        this.disabled = true
        this.$store.dispatch('articleCategory/storeCategory', this.category).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت ویژگی ساخته شد",
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
            this.$store.commit('articleCategory/SET_ERRORS', error.response.data.errors)
          }
        })
      }
    },
    created() {
      this.category = this.$store.getters['articleCategory/getCategory']
    },
    destroyed() {
      this.$store.commit('articleCategory/SET_CATEGORY')
      this.category = this.$store.getters['articleCategory/getCategory']
    }
  }
</script>

<style scoped>

</style>

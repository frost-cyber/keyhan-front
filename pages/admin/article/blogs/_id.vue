<template>
  <div>
    <SaveArticle :article="article" :disable="disabled" @save-article="saveArticle"/>
  </div>
</template>

<script>
  import SaveArticle from "~/components/admin/SaveArticle.vue";

  export default {
    name: "update",
    components: {SaveArticle},
    validate({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData({params , store}) {
      await store.dispatch('article/getArticle', params.id)
      let article = store.getters["article/getArticle"]
      article.categories = article.categories[0]??null
      return {
        article: article,
        disabled: false,
      }
    },
    methods: {
      saveArticle() {
        this.disabled = true
        this.$store.dispatch('article/updateArticle', this.article).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت مقاله آپدیت شد",
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
            this.$store.commit('article/SET_ERRORS', error.response.data.errors)
          }
        })
      }
    },
    destroyed() {
      this.$store.commit('article/SET_ARTICLE')
    }
  }
</script>

<style scoped>

</style>

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
    async asyncData({params , store,$cloneObject,$jalaali}) {
      await store.dispatch('article/getArticle', params.id)
      let article = $cloneObject(store.getters["article/getArticle"])
      article.published_at = $jalaali(article.published_at).format('jYYYY/jMM/jDD')
      article.categories = article.categories.map(z=>z.id)
      return {
        meta:{},
        article: article,
        disabled: false,
      }
    },
    methods: {
      saveArticle() {
        this.disabled = true
        let article = this.$cloneObject(this.article)
        article.published_at = this.$jalaali(article.published_at, 'jYYYY/jMM/jDD').format('YYYY/MM/DD')
        this.$store.dispatch('article/updateArticle', article).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت مقاله آپدیت شد",
              text: "چند لحظه دیگر به صفحه مقاله ها هدایت خواهید شد.",
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

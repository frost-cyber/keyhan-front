<template>
  <div>
    <SaveArticle :article="article" :disable="disable" @save-article="saveArticle"/>
  </div>
</template>

<script>
    import SaveArticle from "~/components/admin/SaveArticle";
    export default {
      name: "create",
      components: {SaveArticle},
      destroyed() {
        this.$store.commit('article/SET_ARTICLE')
      },
      methods:{
        saveArticle() {
          this.disabled = true
          this.$store.dispatch('article/storeArticle', this.article).then((response) => {
            if (response.status === 200) {
              this.$vs.notify({
                title: " مقاله با موفقیت ساخته شد",
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
              console.log(error.response)
              this.$store.commit('article/SET_ERRORS', error.response.data.errors)
            }
          })
        },
      },
      data(){
          return{
            article:{
              thumbnail:{},
              meta:{},
            },
            categories:[{
              id:'',
              name:'',
              slug:''
            }],
            disable:false,
          }
      }
    }
</script>

<style scoped>

</style>

<template>
  <div>
    <SavePost :post="post"  @save_post="savePost"/>
  </div>
</template>

<script>
import SavePost from "~/components/admin/SavePost";

export default {
  name: "update",
  components: {SavePost},
    data() {
      return {
        post: {
          states: [],
          weight: [],
        }
      }
    },
  fetch() {
    this.getPost()
  },
  methods: {
    getPost(){
      this.$store.dispatch('post/getPost',this.$route.params.id).then(res=>{
        this.post = res.data
      })
    },
    savePost() {
      this.$store.dispatch('post/updatePost', this.post).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: "با موفقیت پست آپدیت شد",
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
        if (error.response && error.response.status === 422) {
          this.$store.commit('post/SET_ERRORS', error.response.data.errors)
        }
      })
    }
  },
  destroyed() {
    this.$store.commit('post/SET_POST')
  }
}
</script>

<style scoped>

</style>

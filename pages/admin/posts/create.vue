<template>
<SavePost :post="post" @save_post="savePost"/>
</template>

<script>
import SavePost from '~/components/admin/SavePost'
export default {
  name: "create",
  components:{
    SavePost
  },
  data(){
    return{
      post:{
        states:[],
        weight:[],
      }
    }
  },
  methods:{
    savePost(){
      this.disabled = true
      this.$store.dispatch('post/storePost', this.post).then((response) => {
        if (response.status === 200) {
          this.$vs.notify({
            title: " پست با موفقیت ساخته شد",
            text: "چند لحظه دیگر به صفحه پست ها هدایت خواهید شد.",
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
          this.$store.commit('post/SET_ERRORS', error.response.data.errors)
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
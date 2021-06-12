<template>
  <save-role @saveRole="updateRole" :role="role"></save-role>

</template>

<script>
import saveRole from "~/components/admin/SaveRole";

export default {
  name: "update",
  data(){
    return{
      role:{}
    }
  },
  components:{
    saveRole
  },
  fetch(){
    this.getRole()
  },
  methods:{
    getRole(){
      this.$store.dispatch('role/getRole',this.$route.params.id).then(res=>{
        this.role = res.data
      })
    },
    updateRole(){
      this.$store.dispatch('role/updateRole', this.role).then(res => {
        if (res.status === 200) {
          this.$vs.notify({
            title: 'نقش با موفقیت ویرایش شد',
            position: 'bottom-right',
            color: 'success'
          })
        }
        setTimeout(()=>this.$router.push('.'),2000)
      }).catch(error => {
        if (error.response.status === 422) {
          this.$vs.notify({
            title: 'با خطا مواجه شده است',
            position: 'bottom-right',
            color: 'danger'
          })
          this.$store.commit('role/SET_ERRORS', error.response.data.errors)

        }
      })
    }
  }
}
</script>

<style scoped>

</style>
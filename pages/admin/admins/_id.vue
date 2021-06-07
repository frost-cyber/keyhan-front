<template>
  <save-admin @saveAdmin="updateAdmin" :admin="admin"  />
</template>

<script>
import saveAdmin from '~/components/admin/SaveAdmin'
export default {
  name: "update",
  data(){
    return{
      admin:{
        avatar:{}
      }
    }
  },
  components:{
    saveAdmin
  },
  methods:{
    updateAdmin(){
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$store.dispatch('admin/updateAdmin', this.admin).then((response) => {
            this.$store.commit('admin/SET_ADMIN', this.admin)
            if (response.status === 200) {
              this.$vs.notify({
                title: "با موفقیت ادمین آپدیت شد",
                text: "چند لحظه دیگر به صفحه نظرات  هدایت خواهید شد.",
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
              this.$store.commit('admin/SET_ERRORS', error.response.data.errors)
            }
          })
        }
      })

    },
 async getAdmin(){
     await this.$store.dispatch('admin/getAdmin',this.$route.params.id);
      this.admin=this.$store.getters['admin/getAdmin'];

    },

  },
  fetch() {
    this.getAdmin()
  }
}
</script>

<style scoped>

</style>
<template>
  <save-admin @saveAdmin="saveAdmin" :admin="admin"/>
</template>

<script>
import saveAdmin from '~/components/admin/SaveAdmin'

export default {
  name: "create",
  data() {
    return {
      admin: {
        avatar: {}
      }
    }
  },
  components: {
    saveAdmin
  },
  methods: {
    saveAdmin() {
      this.$store.dispatch('admin/saveAdmin', this.admin).then(res => {
        if (res.status === 200) {
          this.$vs.notify({
            title: 'ادمین با موفقیت ساخته شد',
            position: 'bottom-right',
            color: 'success'
          })
          this.$router.push('.')
        }
      }).catch(error => {
        if (error.response.status === 422) {
          this.$vs.notify({
            title: 'با خطا مواجه شده است',
            position: 'bottom-right',
            color: 'danger'
          })
          this.$store.commit('admin/SET_ERRORS', error.response.data.errors)

        }
      })
    }
  }
}
</script>

<style scoped>

</style>
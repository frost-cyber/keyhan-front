<template>
  <save-role @saveRole="saveRole" :role="role"></save-role>
</template>

<script>
import saveRole from '~/components/admin/SaveRole'

export default {
  name: "create",
  data() {
    return {
      role: {
        permissions: []
      }
    }
  },
  components: {
    saveRole
  },
  methods: {
    saveRole() {
      this.$store.dispatch('role/saveRole', this.role).then(res => {
        if (res.status === 200) {
          this.$vs.notify({
            title: 'نقش با موفقیت ساخته شد',
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
<template>
  <form @submit.prevent="checkVerifyCode">
    <vs-input label="کد تایید" placeholder="کد تایید" type="text" v-model="verifyCode"/>
    <vs-button label="ارسال" @click.native="checkVerifyCode"/>
  </form>
</template>

<script>
export default {
  name: "verifyCode",
  data() {
    return {
      verifyCode: null,
      username: null
    }
  },
  methods: {
    checkVerifyCode() {
      this.$apiClient.post('api/auth/check.verify.code', {username: this.username, verifyCode: this.verifyCode}).then(response => {
        this.$router.push({name: 'Auth-register', query: {username: JSON.parse(response.config.data).username}})
        if (response.status === 200){
          this.$router.push({name: 'Auth-register', query: {username: JSON.parse(response.config.data).username}})
        }
        if (response.status === 204){
          this.$vs.notify({
            time: 3000,
            title: 'کد تایید',
            text: 'کد تایید اشتباه می باشد.',
            color: 'warning',
            icon: 'query_builder'
          })
        }
      }).catch(error => {
        if (error.status ===  403){
          this.$vs.notify({
            time: 3000,
            title: 'نام کاربری',
            text: 'نام کاربری شما بررسی نشده است',
            color: 'danger',
            icon: 'query_builder'
          })
          setTimeout(() => {
            this.$router.push({name: 'Auth-checkUsername'})
          }, 3500)
        }
      })
    },
    sendVerifyCode() {
      this.$apiClient.post('api/auth/send.verify.code', {username: this.username}).then(response => {
        if (response.status === 200 && response.data === 'success') {
          this.$vs.notify({
            time: 3000,
            title: 'کد تایید',
            text: 'کد تایید با موفقیت ارسال گردید.',
            color: 'primary',
            icon: 'query_builder'
          })
        }
      }).catch(error => {
        if (error.response.status === 403) {
          this.$vs.notify({
            time: 3000,
            title: 'نام کاربری',
            text: 'نام کاربری شما بررسی نشده است',
            color: 'danger',
            icon: 'query_builder'
          })
          setTimeout(() => {
            this.$router.push({name: 'Auth-checkUsername'})
          }, 3500)
        }
      })
    }
  },
  mounted() {
    this.username = this.$route.query.username
    this.sendVerifyCode()
  },
}
</script>

<style scoped>

</style>

<template>
  <form @submit.prevent="checkUsername">
    <vs-input label="نام" placeholder="ایمیل یا شماره موبایل خود را وارد نمایید" type="text" v-model="username"/>
    <vs-button label="ارسال" @click.native="checkUsername"/>
  </form>
</template>

<script>
export default {
  name: "checkUsername",
  data() {
    return {
      username: null
    }
  },
  methods: {
    checkUsername() {
      this.$apiClient.post('api/auth/check.username', {username: this.username}).then(response => {
        if (response.status === 200 && response.data.status) {
          this.$router.push({name: 'Auth-login', query: {username: JSON.parse(response.config.data).username}})
        }
        if (response.status === 200 && !response.data.status) {

          this.$router.push({name: 'Auth-verifyCode', query: {username: JSON.parse(response.config.data).username}})
        }
      }).catch(error => console.error(error))
    }
  }
}
</script>

<style scoped>

</style>

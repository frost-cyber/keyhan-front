<template>
  <div>
    <vs-input label="نام کاربری" v-model="login.username" />
    <vs-input label="کلمه عبور" v-model="login.password" />
    <vs-button color="primary" @click.native="loginAction">ورود</vs-button>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return{
      login:{
        username:'',
        password:'',
      }
    }
  },
  methods: {
    loginAction (){
      this.$auth.login({data:this.login})
    }
  },
  mounted () {
    this.login.username = this.$route.query.username
    window.history.pushState('', '', window.location.pathname);
  }
}
</script>

<style scoped>

</style>

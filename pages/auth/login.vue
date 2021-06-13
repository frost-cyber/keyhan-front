<template>
  <div>
    <div class="content-form">
      <h3 class="font-bold text-cool-700 text-lg">رمز عبور را وارد کنید</h3>
      <p class="text-sm text-cool-500 font-thin mt-3"> برای ورود به حساب کاربری رمز عبور خود را وارد کنید</p>
      <form @submit.prevent="loginAction">
        <vs-input class="contactform mt-6" size="large" v-on:icon-click="switchVisibility" :icon-after="true" icon-pack="fa"  placeholder="رمز عبور ارسال شده را وارد کنید"
                  :icon="login.passwordField === 'password' ?'fa-eye' : 'fa-eye-slash'" label="کلمه عبور" :type="login.passwordField" v-model="login.password"></vs-input>
        <vs-button class="mt-5 mx-auto block" color="#F97316" type="filled" @click.native="loginAction"> برو بــعــدی</vs-button>
      </form>
      <div class="fp-link mt-5" v-if="false">
        <a class="text-blue-400 text-xs hover:text-blue-600" href=""> رمز عبور خود را فراموش کرده ام</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "login",
  middleware:'auth',
  auth: 'guest',
  data() {
    return {
      login: {
        username: '',
        password: '',
        passwordField: 'password'

      }
    }
  },
  methods: {
    switchVisibility() {
      this.login.passwordField = this.login.passwordField === 'password' ? 'text' : 'password'
    },
    loginAction() {
      this.$auth.login({data: this.login})
    }
  },
  mounted() {
    this.login.username = this.$route.query.username
    window.history.pushState('', '', window.location.pathname);
  }
}
</script>

<style scoped>
</style>

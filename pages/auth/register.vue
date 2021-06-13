<template>
  <div>
    <h3 class="font-bold text-cool-700 text-lg">رمز عبور </h3>
    <p class="text-sm text-cool-500 font-thin mt-3">رمز عبور خود را برای ورود دوباره وارد کنید</p>
    <form @submit.prevent="register">
      <vs-input class="contactform mt-6" size="large" v-on:icon-click="switchVisibility" :icon-after="true" icon-pack="fa"
                :icon="passwordField === 'password' ?'fa-eye' : 'fa-eye-slash'" label="کلمه عبور" :type="passwordField" v-model="password"></vs-input>
      <vs-button class="mt-5 mx-auto block" color="#F97316" type="filled" @click.native="register">ادامــــــــه</vs-button>
    </form>
    <p class="text-xs text-cool-500 font-thin mt-8 text-center">با ورود و یا ثبت نام در وبسایت ما شما شرایط و قوانین استفاده از سرویس های سایت ما و قوانین حریم خصوصی آن را می‌پذیرید. </p>
  </div>
</template>

<script>
export default {
  name: "register",
  middleware:'auth',
  auth: 'guest',
  data() {
    return {
      username: "",
      password: "",
      passwordField: 'password'

    }
  },
  methods: {
    switchVisibility() {
      this.passwordField = this.passwordField === 'password' ? 'text' : 'password'
    },
    register() {
      this.$apiClient.post('api/auth/register', {username: this.username, password: this.password}).then(response => {
        if (response.status === 200 && /^\d+\|\w*/i.test(response.data)) {
          this.$auth.login({
            data: {
              username: this.username,
              password: this.password,
            }
          })
        }
      }).catch(error => {
        if (error.response.status === 422) {
          this.$vs.notify({
            title: 'خطا!!',
            time: 2000,
            text: error.response.data.errors.username[0],
            color: 'danger'
          })
        }
      })
    }
  },
  mounted() {
    this.username = this.$route.query.username
  }

}
</script>

<style>
.vuesax-app-is-rtl .vs-input--icon.icon-after{
  cursor: pointer !important;
}
</style>

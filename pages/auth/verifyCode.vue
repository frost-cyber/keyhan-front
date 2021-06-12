<template>
  <div>
    <h3 class="font-bold text-cool-700 text-lg">کد تایید را وارد کنید</h3>
    <p class="text-sm text-cool-500 font-thin mt-3">شما حساب کاربری ندارید  و در حال ایجاد حساب کاربری هستید</p>
    <form @submit.prevent="checkVerifyCode">
      <vs-input class="contactform mt-6" label="کد تایید" placeholder="کد تایید" type="text" v-model="verifyCode" size="large"/>
      <vs-button class="mt-5 mx-auto block" color="#F97316" type="filled" @click.native="checkVerifyCode">ارسال کد</vs-button>
    </form>
    <p class="text-xs text-cool-500 font-thin mt-8 text-center">با ورود و یا ثبت نام در وبسایت ما شما شرایط و قوانین استفاده از سرویس های سایت ما و قوانین حریم خصوصی آن را می‌پذیرید. </p>
  </div>
</template>

<script>
export default {
  name: "verifyCode",
  middleware:'auth',
  auth: 'guest',
  data() {
    return {
      verifyCode: null,
      username: null
    }
  },
  methods: {
    checkVerifyCode() {
      this.$apiClient.post('api/auth/check.verify.code', {username: this.username, verifyCode: this.verifyCode}).then(response => {
        if (response.status === 200){
          this.$router.push({name: 'auth-register', query: {username: JSON.parse(response.config.data).username}})
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

        if (error.response.status ===  403){
          this.$vs.notify({
            time: 3000,
            title: 'نام کاربری',
            text: 'نام کاربری شما بررسی نشده است',
            color: 'danger',
            icon: 'query_builder'
          })
          setTimeout(() => {
            this.$router.push({name: 'auth'})
          }, 3500)
        }
        if (error.response.status ===  422) {
          this.$vs.notify({
            title: 'خطا!!',
            time: 2000,
            text: error.response.data.errors.verifyCode[0],
            color: 'danger'
          })
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
            this.$router.push({name: 'auth'})
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

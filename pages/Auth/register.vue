<template>
  <div>
    <h3 class="font-bold text-cool-700 text-lg">رمز عبور </h3>
    <p class="text-sm text-cool-500 font-thin mt-3">رمز عبور خود را برای ورود دوباره وارد کنید</p>
    <form @submit.prevent="register">
      <vs-input class="contactform mt-6" size="large" label="کلمه عبور" type="password"  v-model="password"></vs-input>
      <vs-button class="mt-5 mx-auto block" color="#F97316" type="filled"  @click.native="register">ادامــــــــه</vs-button>
    </form>
    <p class="text-xs text-cool-500 font-thin mt-8 text-center">با ورود و یا ثبت نام در وبسایت ما شما شرایط و قوانین استفاده از سرویس های سایت ما و قوانین حریم خصوصی آن را می‌پذیرید. </p>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods:{
    register(){
      this.$apiClient.post('api/auth/register'  , {username :this.username , password: this.password}).then(response  => {
        if (response.status === 200 &&  /^\d+\|\w*/i.test(response.data)){
          console.log(response.data)
        }
      })
    }
  },
  mounted() {
    this.username = this.$route.query.username
  }

}
</script>

<style scoped>

</style>

<template>
  <div>
    <vs-input label="کلمه عبور" type="password"  v-model="password"></vs-input>
    <vs-button @click.native="register"></vs-button>
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

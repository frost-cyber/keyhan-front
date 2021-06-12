<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">صفحه ورود کارکنان</h4>
                </div>
                <div>
                  <vs-input name="email" icon-no-border icon="icon icon-user" icon-pack="feather" label-placeholder="ایمیل" v-model="admin.username" class="w-full"/>
                  <vs-input type="password" name="password" icon-no-border icon="icon icon-lock" icon-pack="feather" label-placeholder="پسسورد" v-model="admin.password" class="w-full mt-6"/>
                  <div class="flex flex-wrap justify-between my-5" v-if="false">
                    <router-link to="">Forgot Password?</router-link>
                  </div>
                  <vs-button class="float-right my-5" @click.native="login">ورود</vs-button>
                </div>
              </div>
            </div>
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "staff",
  layout: 'FullPage',
  data() {
    return {
      admin: {
        username: '',
        password: '',
        admin:true,
      }
    }
  },
  methods: {
    login() {
      this.$auth.login({data:this.admin}).then(res => {
        this.$router.push({name:'admin'})
      }).catch(error => {
        if (error.response.status === 422){
          this.$vs.notify({
            title:'باخطا مواجه شدید',
            text:error.response.data.errors.username[0],
            color:'danger',
            position:'bottom-right'
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>

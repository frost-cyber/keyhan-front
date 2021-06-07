<template>
  <vs-card>
    <div class="grid grid-cols-7 gap-3">
      <form data-vv-scope="profile" class="col-span-5 grid grid-cols-3 gap-3">
        <div class="col-span-1 row-start-1 row-end-4">
          <img :src="admin.avatar.link || require('@/assets/images/Flag_of_None.png')" @click="selectFile" alt="">
        </div>
        <div class="col-span-1 row-start-1">
          <vs-input class="w-full" label="نام" v-validate="'required'" name="name" data-vv-as="نام" v-model="admin.name"/>
          <span class="text-danger text-sm" v-show="errors.has('profile.name')">{{ errors.first('profile.name') }}</span>
        </div>
        <div class="col-span-1 row-start-1">
          <vs-input class="w-full" label="نام خانوادگی" v-validate="'required'" name="last_name" data-vv-as="نام خانوادگی" v-model="admin.last_name"/>
          <span class="text-danger text-sm" v-show="errors.has('profile.last_name')">{{ errors.first('profile.last_name') }}</span>
        </div>
        <div class="col-span-1 row-start-2">
          <vs-input class="w-full" label="موبایل" v-validate="'required'" name="mobile" data-vv-as="موبایل" v-model="admin.mobile"/>
          <span class="text-danger text-sm" v-show="errors.has('profile.mobile')">{{ errors.first('profile.mobile') }}</span>
        </div>
        <div class="col-span-1 row-start-2">
          <vs-input class="w-full" label="تلفن ثابت" v-validate="'required'" name="phone" data-vv-as="تلفن ثابت" v-model="admin.phone"/>
          <span class="text-danger text-sm" v-show="errors.has('profile.phone')">{{ errors.first('profile.phone') }}</span>
        </div>
        <div class="col-span-1 row-start-3">
          <vs-input class="w-full" label="ایمیل" v-validate="'required'" name="email" data-vv-as="ایمیل" v-model="admin.email"/>
          <span class="text-danger text-sm" v-show="errors.has('profile.email')">{{ errors.first('profile.email') }}</span>
        </div>
        <div class="col-span-1 row-start-3">
          <vs-input class="w-full" label="کد ملی" v-validate="'required'" name="national_code" data-vv-as="کد ملی" v-model="admin.national_code"/>
          <span class="text-danger text-sm" v-show="errors.has('profile.national_code')">{{ errors.first('profile.national_code') }}</span>
        </div>
        <div class="col-span-3">
          <vs-button @click.native="updateProfile">ذخیره</vs-button>
        </div>
      </form>
      <form data-vv-scope="password" class="col-span-2 grid grid-cols-3 gap-3">
        <div class="col-span-3">
          <vs-input class="w-full" label="رمز عبور قبلی" v-validate="'required'" name="current_password" data-vv-as="رمز عبور قبلی" v-model="password.current_password"/>
          <span class="text-danger text-sm" v-show="errors.has('password.current_password')">{{ errors.first('password.current_password') }}</span>
        </div>
        <div class="col-span-3">
          <vs-input class="w-full" label="رمز عبور جدید" v-validate="'required'" name="password" data-vv-as="رمز عبور جدید" v-model="password.password"/>
          <span class="text-danger text-sm" v-show="errors.has('password.password')">{{ errors.first('password.password') }}</span>
        </div>
        <div class="col-span-3">
          <vs-input class="w-full" label="تکرار رمز عبور جدید" v-validate="'required'" name="name" data-vv-as="تکرار رمز عبور جدید" v-model="password.password_confirmation"/>
          <span class="text-danger text-sm" v-show="errors.has('password.password_confirmation')">{{ errors.first('password.password_confirmation') }}</span>
        </div>
        <div class="col-span-3">
          <vs-button @click.native="updatePassword">ذخیره</vs-button>
        </div>
      </form>
    </div>
  </vs-card>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      admin: {avatar: {}},
      password: {}
    }
  },
  fetch() {
    this.admin = this.$cloneObject(this.$auth.user)
  },
  watch: {
    '$store.state.profile.errors': {
      deep: false,
      handler(errors) {
        let scope = 'profile'
        Object.keys(errors).forEach(x => {
          if (x.includes('password')) {
            scope = 'password'
          }
        })
        Object.entries(errors).forEach(error => {
          let name = error[0].split('.')
          if (name.length === 1) {
            name = name[0]
          } else {
            name = `${name[2]}[${name[1]}]`
          }
          this.errors.add({
            field: name,
            scope: scope,
            msg: error[1][0]
          })
        })
      }
    }
  },
  methods: {
    updateProfile() {
      this.$validator.validateAll('profile').then(res => {
        if (!res) return
        this.$store.dispatch('profile/updateProfile', this.admin).then((response) => {
          this.$auth.fetchUser()
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت اطلاعات حساب کاربری شما آپدیت شد",
              time: 2000,
              color: "success",
              position: "bottom-right",
              icon: 'check_box',
            })
          }
        }).catch(error => {
          if (error.response && error.response.status === 422) {
            this.$store.commit('profile/SET_ERRORS', error.response.data.errors)
          }
        })
      })
    },
    updatePassword() {
      this.$validator.validateAll('password').then(resp => {
        if (!resp) return
        this.$store.dispatch('profile/updatePassword', this.password).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت رمز عبور آپدیت شد",
              time: 2000,
              color: "success",
              position: "bottom-right",
              icon: 'check_box',
            })
          }
        }).catch(error => {
          this.disabled = false
          if (error.response && error.response.status === 422) {
            this.$store.commit('profile/SET_ERRORS', error.response.data.errors)
          }
        })
      })
    },
    selectFile() {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event) {
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProfileImage', file).then(res => {
        this.admin.avatar = res.data
      }).catch(error => {
        if (error.response.status === 422) {
          this.$vs.notify({
            title: 'درخواست شما با خطا مواجه شد',
            text: error.response.data.errors.file[0],
            color: 'danger',
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>

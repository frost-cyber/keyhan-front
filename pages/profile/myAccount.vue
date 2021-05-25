<template>
  <div>
    <div class="area-account grid grid-cols-12 gap-5">
      <div class="right-info col-span-12 lg:col-span-6">
        <div class="title-section mb-6 relative">
          <h3 class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10">
            ویرایش حساب من
          </h3>
        </div>
        <div class="form-info">
          <form data-vv-scope="profile">
            <div class="grid grid-cols-2 gap-5">
              <div class="first-name col-span-2 md:col-span-1">
                <vs-input size="default" v-validate="'required'" name="name" placeholder="تکتم" v-model="user.name" data-vv-as="نام" />
                <span class="text-danger text-sm" v-show="errors.has('profile.name')">{{ errors.first('profile.name') }}</span>
              </div>
              <div class="last-name col-span-2 md:col-span-1">
                <vs-input size="default" v-validate="'required'" name="last_name" placeholder="حیدرزاده" v-model="user.last_name"  data-vv-as="نام خانوادگی" />
                <span class="text-danger text-sm" v-show="errors.has('profile.last_name')">{{ errors.first('profile.last_name') }}</span>
              </div>
              <div class="mobile-num col-span-2 md:col-span-1">
                <vs-input size="default" v-validate="'required'" name="mobile" placeholder=" تلفن همراه" v-model="user.mobile"   data-vv-as="تلفن همراه" />
                <span class="text-danger text-sm" v-show="errors.has('profile.mobile')">{{ errors.first('profile.mobile') }}</span>
              </div>
              <div class="phone-num col-span-2 md:col-span-1">
                <vs-input size="default" v-validate="'required'" name="phone" placeholder=" شماره تماس ثابت" v-model="user.phone"  data-vv-as="شماره تماس ثابت"  />
                <span class="text-danger text-sm" v-show="errors.has('profile.phone')">{{ errors.first('profile.phone') }}</span>
              </div>
              <div class="email-p col-span-2 md:col-span-1">
                <vs-input size="default" v-validate="'required'" name="email" placeholder=" ایمیل" v-model="user.email"  data-vv-as="ایمیل" />
                <span class="text-danger text-sm" v-show="errors.has('profile.email')">{{ errors.first('profile.email') }}</span>
              </div>
              <div class="codemelli col-span-2 md:col-span-1">
                <vs-input size="default" v-validate="'required'" name="national_code" placeholder=" کد ملی  " v-model="user.national_code"  data-vv-as="کدملی" />
                <span class="text-danger text-sm" v-show="errors.has('profile.national_code')">{{ errors.first('profile.national_code') }}</span>
              </div>
              <div class="avatar-profile col-span-2" >
                <img class="profileImage" :src="user.avatar.link ||  require('@/assets/images/Flag_of_None.png')" @click="selectFile">
                <span class="text-danger text-sm" v-show="errors.has('profile.avatar')">{{ errors.first('profile.avatar') }}</span>
                <vs-row vs-justify="flex-start">
                  <vs-button  @click.native="user.avatar = {}"  color="danger"> حذف عکس</vs-button>
                </vs-row>
              </div>
              <div class="send-btn col-span-2">
                <vs-button color="#F97316" type="filled" @click="updateProfile"> ثبت ویرایش حساب </vs-button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="left-info col-span-12 lg:col-span-6">
        <div class="title-section mb-6 relative">
          <h3 class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10">
            تغییر رمز عبور
          </h3>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <form data-vv-scope="password">
            <div class="first-name col-span-2">
              <vs-input class="w-auto block" v-validate="'required'"  size="default" name="current_password" placeholder="رمز عبور کنونی" v-model="user.current_password" data-vv-as="رمز عبور کنونی" />
              <span class="text-danger text-sm" v-show="errors.has('password.current_password')">{{ errors.first('password.current_password') }}</span>

            </div>
            <div class="last-name col-span-2">
              <vs-input size="default" name="password" v-validate="'required'"  placeholder="رمز عبور جدید" v-model="user.password" data-vv-as="رمز عبور جدید" />
              <span class="text-danger text-sm" v-show="errors.has('password.password')">{{ errors.first('password.password') }}</span>

            </div>
            <div class="mobile-num col-span-2">
              <vs-input size="default" type='password' v-validate="'required'"  name="password_confirmation" placeholder=" تکرار رمز عبور جدید" v-model="user.password_confirmation" data-vv-as="تکرار رمز عبور جدید" />
              <span class="text-danger text-sm" v-show="errors.has('password.password_confirmation')">{{ errors.first('password.password_confirmation') }}</span>

            </div>
          </form>

          <div class="btn-send col-span-2">
            <vs-button color="#6B7280" type="border" @click="updatePassword">ثبت رمز عبور</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"myAccount",
  data() {
    return {
      colorx  : '#F97316',
      user   : {
        avatar:{},

      },
      password: []
    };
  },
  fetch() {
    this.getProfile()
  },
  methods: {
    updateProfile() {
      this.$validator.validateAll('profile').then(res => {
        if (!res) return
        this.$store.dispatch('profile/updateProfile', this.user).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title   : "با موفقیت کاربر آپدیت شد",
              text    : "چند لحظه دیگر به صفحه ویژگی ها هدایت خواهید شد.",
              time    : 2000,
              color   : "success",
              position: "bottom-center",
              icon    : 'check_box',
            })
            this.getProfile()
          }
          this.$store.dispatch('profile/getUser').then(res=>{
            if(validated){
              this.$store.commit('profile/SET_USER',res.data)
            }
          })
        }).catch(error => {
          this.disabled = false
          if (error.response && error.response.status === 422) {
            this.$store.commit('profile/SET_ERRORS', error.response.data.errors)
          }
        })
      })

    },
    updatePassword(){
      this.$validator.validateAll('password').then(resp => {
        if(!resp) return
        this.$store.dispatch('profile/updatePassword', {
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
          current_password: this.user.current_password,
        }).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت پسورد آپدیت شد",
              text: "چند لحظه دیگر به صفحه کاربر  هدایت خواهید شد.",
              time: 2000,
              color: "success",
              position: "bottom-center",
              icon: 'check_box',
            })
            setTimeout(() => {
              this.$router.push('.')
            }, 2100)
          }
        }).catch(error => {
          this.disabled = false
          if (error.response && error.response.status === 422) {
            this.$store.commit('profile/SET_ERRORS', error.response.data.errors)
          }
        })
      })
    },
    getProfile() {
      this.$store.dispatch('profile/getUser').then(res => {
        if (res.status === 200) {
          this.user = res.data
          this.$store.commit('profile/SET_USER',this.$cloneObject(res.data))
        }

      })
    },

    async uploadFile(event){
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProfileImage' , file).then(res=>{
        this.user.avatar = res.data
        this.errors.remove('profile.avatar')
      }).catch(error=>{
        if(error.response.status === 422){
          this.$vs.notify({
            title : 'درخواست شما با خطا مواجه شد',
            text : error.response.data.errors.file[0],
            color : 'danger',
          })
        }
      })
    },

    successUpload(event){
      let response = (JSON.parse(event.currentTarget.response))
      this.$vs.notify({color:'success',title:'با موفقیت آپلود شد'})
      this.getProfile()

    },
    selectFile(){
      let input = document.createElement('input')
      input.type='file'
      input.onchange = this.uploadFile
      input.click()
    },
  },
  watch:{
    '$store.state.profile.errors': {
      deep: false,
      handler(errors) {
        let scope = 'profile'
        Object.keys(errors).forEach(x=>{
         if(x.includes('password')){
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
  }

}
</script>
<style>
.profileImage{
  height: 200px;
  width: 50%;

}
</style>

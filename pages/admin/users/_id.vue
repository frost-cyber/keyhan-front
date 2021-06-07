<template>
  <div class="vx-row">
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>نام:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="name" v-validate="'required'" v-model="user.name" data-vv-as="نام"/>
            <span class="text-danger text-sm" v-show="errors.has('name')" >{{ errors.first('name') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>نام خانوادگی:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="last_name" v-validate="'required'" v-model="user.last_name" data-vv-as="نام خانوادگی"/>
            <span class="text-danger text-sm" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>ایمیل:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="email" v-validate="'required'" v-model="user.email" data-vv-as="ایمیل"/>
            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
        </div>
        <vs-button color="success" @click="updateUser">update</vs-button>
      </vs-card>

    </div>
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>کد ملی:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="national_code" v-validate="'required'" v-model="user.national_code" data-vv-as="کدملی"/>
            <span class="text-danger text-sm" v-show="errors.has('national_code')">{{ errors.first('national_code') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>تلفن ثابت:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="phone" v-validate="'required'" v-model="user.phone" data-vv-as="تلفن ثابت"/>
            <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>تلفن همراه:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="mobile" v-validate="'required'" v-model="user.mobile" data-vv-as="تلفن همراه"/>
            <span class="text-danger text-sm" v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>
          </div>

        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>پسورد:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
              <vs-input v-model="user.password" name="password"  type="password" data-vv-as="رمز عبور"/>
            <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

          </div>

        </div>
      </vs-card>
    </div>
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-3/3 w-full">
            <img class="userImage"  :src="user.avatar.link||require('@/assets/images/Flag_of_None.png')" @click="selectFile">

          </div>
        </div>

      </vs-card>

    </div>

  </div>
</template>

<script>
export default {
  name: "update",
  async asyncData({params, store}) {
    await store.dispatch('user/getUser', params.id)
    return {
      user: store.getters['user/getUser'],
    }
  },
  watch: {
    '$store.state.user.errors': {
      deep: false,
      handler(errors) {
        Object.entries(errors).forEach(error => {
          let name = error[0].split('.')
          if (name.length === 1) {
            name = name[0]
          } else {
            name = `${name[2]}[${name[1]}]`
          }
          this.errors.add({
            field: name,
            msg: error[1][0]
          })
        })
      }
    }
  },
  methods:{
    updateUser(){
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$store.dispatch('user/updateUser', this.user).then((response) => {
            this.$store.commit('user/SET_USER', this.user)
            if (response.status === 200) {
              this.$vs.notify({
                title: "با موفقیت کاربر آپدیت شد",
                text: "چند لحظه دیگر به صفحه نظرات  هدایت خواهید شد.",
                time: 2000,
                color: "success",
                position: "bottom-right",
                icon: 'check_box',
              })
              setTimeout(() => {
                this.$router.push('.')
              }, 2100)
            }
          }).catch(error => {
            if (error.response && error.response.status === 422) {
              this.$store.commit('user/SET_ERRORS', error.response.data.errors)
            }
          })
        }
      })
    },
    selectFile(){
      let input = document.createElement('input')
      input.type='file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event){
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProfileImage' , file).then(res=>{
        this.user.avatar = res.data
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
  }
}
</script>

<style scoped>
.userImage {
  height: 200px;
  width: 100%;

}
</style>
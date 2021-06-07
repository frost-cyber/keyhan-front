<template>
  <div class="vx-row">
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>نام:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="name" v-validate="'required'" v-model="admin.name" data-vv-as="نام"/>
            <span class="text-danger text-sm" v-show="errors.has('name')" >{{ errors.first('name') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>نام خانوادگی:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="last_name" v-validate="'required'" v-model="admin.last_name" data-vv-as="نام خانوادگی"/>
            <span class="text-danger text-sm" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>ایمیل:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="email" v-validate="'required'" v-model="admin.email" data-vv-as="ایمیل"/>
            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
        </div>
        <vs-button color="success" @click.native="saveAdmin">ذخیره</vs-button>
      </vs-card>

    </div>
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>کد ملی:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="national_code" v-validate="'required'" v-model="admin.national_code" data-vv-as="کدملی"/>
            <span class="text-danger text-sm" v-show="errors.has('national_code')">{{ errors.first('national_code') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>تلفن ثابت:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="phone" v-validate="'required'" v-model="admin.phone" data-vv-as="تلفن ثابت"/>
            <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>تلفن همراه:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input name="mobile" v-validate="'required'" v-model="admin.mobile" data-vv-as="تلفن همراه"/>
            <span class="text-danger text-sm" v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>
          </div>

        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>پسورد:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input v-model="admin.password" name="password"  type="password" data-vv-as="رمز عبور"/>
            <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

          </div>

        </div>
      </vs-card>
    </div>
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-3/3 w-full">
            <img class="adminImage" :src="admin.avatar.link||require('@/assets/images/Flag_of_None.png')" @click="selectFile">
            <span class="text-danger text-sm" v-show="errors.has('avatar')">{{ errors.first('avatar') }}</span>

          </div>
        </div>

      </vs-card>

    </div>

  </div>

</template>

<script>
export default {
  name: "SaveAdmin",
  props:{
    admin:{
      required : true
    }
  },
  watch: {
    '$store.state.admin.errors': {
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
    selectFile(){
      let input = document.createElement('input')
      input.type='file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event){
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProfileImage' , file).then(res=>{
        this.admin.avatar = res.data
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
    saveAdmin(){
      this.$validator.validateAll().then(res=>{
        if(res){
          this.$emit('saveAdmin')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
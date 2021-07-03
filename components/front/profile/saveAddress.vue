<template>
  <vs-popup class="address-popup" title="اطلاعات خود را وارد کنید" :title="titlePopup" :active.sync="popupActive"
            icon-pack="fal" icon-close="fa-times">
    <div class="grid grid-cols-2 gap-5">
      <div class="first-name col-span-1 md:col-span-1">
        <vs-input size="default" placeholder="تکتم" name="name" v-validate="'required'" v-model="currentAddress.name"
                  data-vv-as="نام"/>
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

      </div>
      <div class="last-name col-span-1">
        <vs-input size="default" placeholder="حیدرزاده" name="last_name" v-validate="'required'"
                  v-model="currentAddress.last_name" data-vv-as="نام خانوادگی"/>
        <span class="text-danger text-sm" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>

      </div>
      <div class="mobile-num col-span-1">
        <vs-input size="default" placeholder=" 09150760345" name="mobile" v-validate="'required'"
                  v-model="currentAddress.mobile" data-vv-as="شماره همراه"/>
        <span class="text-danger text-sm" v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>

      </div>
      <div class="phone-num col-span-1">
        <vs-input size="default" placeholder=" شماره تماس ثابت" name="phone" v-validate="'required'"
                  v-model="currentAddress.phone" data-vv-as="شماره تلفن ثابت"/>
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

      </div>
      <div class="ostan">
        <tree-select class="selectostan" label="استان" v-model="currentAddress.state" v-validate="'required'"
                     name="state" :options="ostan" :maxHeight="150"
                     :normalizer="(val)=>{return {label:val.name , id:val.id}}" icon="fa-arrow-down" icon-pack="fal"
                     width="100%" data-vv-as="استان"/>
        <span class="text-danger text-sm" v-show="errors.has('state')">{{ errors.first('state') }}</span>

      </div>
      <div class="city">
        <tree-select class="selectostan" label="شهرستان" v-model="currentAddress.city" v-validate="'required'"
                     name="city" :options="stateCities" :maxHeight="150" icon="fa-arrow-down" icon-pack="fal"
                     width="100%" data-vv-as="شهر"/>
        <span class="text-danger text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>

      </div>
      <div class="youraddress col-span-2">
        <vs-input size="default" placeholder=" آدرس پستی شما" name="address" v-validate="'required'"
                  v-model="currentAddress.address" data-vv-as="آدرس پستی"/>
        <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>

      </div>
      <div class="codeposti col-span-1">
        <vs-input size="default" placeholder=" کد پستی ده رقمی" name="postcode" v-validate="'required'"
                  v-model="currentAddress.postcode" data-vv-as="کد پستی"/>
        <span class="text-danger text-sm" v-show="errors.has('postcode')">{{ errors.first('postcode') }}</span>
      </div>
      <div class="codeposti col-span-1">
        <vs-input size="default" placeholder=" ایمیل" v-model="currentAddress.email" v-validate="'required'"
                  name="email" data-vv-as="ایمیل"/>
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>
      <div class="note-address col-span-2">
        <vs-textarea label="یادداشت" v-model="currentAddress.description" v-validate="'required'" name="description"
                     data-vv-as="توضیحات"/>
        <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>
      </div>
    </div>
    <vs-button color="primary" @click.native="saveAddress">ذخیره</vs-button>
  </vs-popup>
</template>

<script>
import treeSelect from '@riophae/vue-treeselect'
export default {
  name: "saveAddress",
  props:{
    currentAddress:{
      required:true
    },
    titlePopup:{
      required : true
    },
    popupActive:{
      required : true
    }
  },
  methods:{
    saveAddress(){
      this.$validator.validateAll().then(validated => {
        if (!validated) return
        this.$emit('saveAddress')
      })
    }
  },
  watch:{
    'popupActive'(val){
      if(!val){
        this.$emit('close' , val)
      }
    },
    '$store.state.address.errors': {
      deep: true,
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
  computed:{
    ostan(){
      return this.$store.getters['address/getOstans']
    },
    cities(){
      return this.$store.getters['address/getCities']
    },
    stateCities() {
      if (!~~this.currentAddress.state) {
        return []
      }
      let currentCity = []
      for (let i = 0; i < this.cities.length; i++) {
        if (~~this.cities[i].ostan === ~~this.currentAddress.state) {
          currentCity.push({
            id: this.cities[i].id,
            label: this.cities[i].name
          })
        }
      }
      return currentCity;
    }
  },
  components:{
    treeSelect
  }
}
</script>

<style scoped>

</style>

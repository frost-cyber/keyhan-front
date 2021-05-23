<template>
  <div>

    <div class="add-address bg-cool-200 rounded-lg m-auto text-center p-5 mt-5" @click="popupActive=true">

      <i class="fal fa-map-marker-plus text-9xl text-cool-500"></i>
      <h3 class="mt-3 text-cool-500 font-bold">افزودن آدرس جدید</h3>
    </div>
    <vs-popup class="address-popup" title="اطلاعات خود را وارد کنید" :title="titlePopup" :active.sync="popupActive" icon-pack="fal" icon-close="fa-times">
      <div class="grid grid-cols-2 gap-5">
        <div class="first-name col-span-1 md:col-span-1">
          <vs-input size="default" placeholder="تکتم" v-model="currentAddress.name"/>
        </div>
        <div class="last-name col-span-1">
          <vs-input size="default" placeholder="حیدرزاده" v-model="currentAddress.last_name"/>
        </div>
        <div class="mobile-num col-span-1">
          <vs-input size="default" placeholder=" 09150760345" v-model="currentAddress.mobile"/>
        </div>
        <div class="phone-num col-span-1">
          <vs-input size="default" placeholder=" شماره تماس ثابت" v-model="currentAddress.phone"/>
        </div>
        <div class="ostan">
          <tree-select class="selectostan" label="استان" v-model="currentAddress.state" :options="state" maxHeight="150" :normalizer="(val)=>{return {label:val.name , id:val.id}}" icon="fa-arrow-down" icon-pack="fal" width="100%"/>
        </div>
        <div class="city">
          <tree-select class="selectostan" label="شهرستان" v-model="currentAddress.city" :options="stateCities" maxHeight="150" icon="fa-arrow-down" icon-pack="fal" width="100%"/>

        </div>
        <div class="youraddress col-span-2">
          <vs-input size="default" placeholder=" آدرس پستی شما" v-model="currentAddress.address"/>
        </div>
        <div class="codeposti col-span-1">
          <vs-input size="default" placeholder=" کد پستی ده رقمی" v-model="currentAddress.postcode"/>
        </div>
        <div class="codeposti col-span-1">
          <vs-input size="default" placeholder=" ایمیل" v-model="currentAddress.email"/>
        </div>
        <div class="note-address col-span-2">
          <vs-textarea label="یادداشت" v-model="currentAddress.description"/>
        </div>

      </div>
      <vs-button color="primary" @click.native="saveAddress">ذخیره</vs-button>
    </vs-popup>

    <div class="addreses grid grid-cols-12 gap-5 mt-5 ">
      <div class="col-span-12 lg:col-span-4" v-for="(address,index) in addresses" :key="index">
        <div class="block-btn text-right text-sm p-3 border border-cool-200 bg-ff rounded-lg text-cool-600">
          <div class="name"> {{ address.name }}</div>
          <div class="address"> {{ state.find(s=>s.id==address.state).name }} - {{ cities.find(c=>c.id == address.city) }}- {{ address.address }}</div>
          <div class="codeposti">{{ address.phone }}</div>
          <div class="phone">{{ address.mobile }}</div>
          <div class="edite-add text-left mt-5">
            <div class="remove inline-block">
              <vs-button color="#4B5563" type="flat" @click.stop="deleteAddress(address)">حــــذف</vs-button>
            </div>
            <div class="edite inline-block mr-2">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" @click.stop="brand = JSON.parse(JSON.stringify(tr)) ; editPopup = true"/>

              <vs-button color="#4B5563" type="border" class="ml-2" @click="currentAddress = $cloneObject(address) ; popupActive = true">ویـــرایش</vs-button>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import treeSelect from '@riophae/vue-treeselect'
import {cities, ostan} from '@/plugins/cities'

export default {
  components: {
    treeSelect
  },
  name      : "editaddress",
  data() {
    return {
      addresses  : [],
      currentAddress:{},
      popupActive: false,
      titlePopup : 'ایجاد',
      state      : ostan,
      cities     : cities,
    }
  },
  computed: {
    stateCities() {
      if (!~~this.currentAddress.state) {
        return []
      }
      let currentCity = []
      for (let i = 0; i < this.cities.length; i++) {
        if (~~this.cities[i].ostan === ~~this.currentAddress.state) {
          currentCity.push({
            id   : this.cities[i].id,
            label: this.cities[i].name
          })
        }
      }
      return currentCity;
    }
  },
  props   : {
    users: {
      required: true,
    }
    ,
    addresses: {
      required: true
    }
  }
  ,

  methods: {


    deleteAddress(address) {
      this.$store.dispatch('address/deleteAddress', address).then((res) => {
        if (res.status === 200) {
          this.$vs.notify({
            title   : "با موفقیت حذف شد.",
            time    : 2000,
            color   : "success",
            position: "bottom-center",
            icon    : 'check_box',
          })
          this.$emit('getAddresses')
        }
      }).catch((err) => {
        this.$vs.notify({
          title   : "حذف ناموفق!",
          text    : "خطایی رخ داده است.",
          time    : 2000,
          color   : "danger",
          position: "bottom-center",
          icon    : 'check_box',
        })
      })
    },
    saveAddress(){
      if(typeof this.currentAddress.id  !== 'undefined'){
        this.$store.dispatch('address/updateAddress',this.currentAddress).then(res=>{
          if(res.status == 200){
            this.$vs.notify({
              title:"با موفقیت ویرایش شد",
              color:"success"
            })
            this.$emit('getAddresses')
          }
        })
        return
      }
      this.$store.dispatch('address/saveAddress',this.currentAddress).then(res=>{
        if(res.status == 200){
          this.$vs.notify({
            title:"با موفقیت ذخیره شد",
            color:"success"
          })
          this.$emit('getAddresses')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

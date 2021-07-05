<template>
  <div>
    <div class="add-address bg-cool-200 rounded-lg m-auto text-center p-5 mt-5" @click.prevent="popupActive=!popupActive">

      <i class="fal fa-map-marker-plus text-9xl text-cool-500"></i>
      <h3 class="mt-3 text-cool-500 font-bold">افزودن آدرس جدید</h3>
    </div>
    <save-address :currentAddress="currentAddress" :titlePopup="titlePopup" :popupActive="popupActive" @saveAddress="saveAddress" @close="close"/>
    <div class="addreses grid grid-cols-12 gap-5 mt-5 ">
      <div class="col-span-12 lg:col-span-4" v-for="(address,index) in addresses" :key="index">
        <div class="block-btn text-right text-sm p-3 border border-cool-200 bg-ff rounded-lg text-cool-600">
          <div class="name"> {{ address.name }}</div>
          <div class="address"> {{ state.find(s => s.id == address.state).name }} -
            {{ cities.find(c => c.id == address.city).name }}- {{ address.address }}
          </div>
          <div class="codeposti">{{ address.phone }}</div>
          <div class="phone">{{ address.mobile }}</div>
          <div class="edite-add text-left mt-5">
            <div class="remove inline-block">
              <vs-button color="#4B5563" type="flat" @click.stop="deleteAddress(address)">حــــذف</vs-button>
            </div>
            <div class="edite inline-block mr-2">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2"
                            @click.stop="brand = JSON.parse(JSON.stringify(tr)) ; editPopup = true"/>
              <vs-button color="#4B5563" type="border" class="ml-2"
                         @click.native="currentAddress = $cloneObject(address) ; popupActive = true">ویـــرایش
              </vs-button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
import saveAddress from '~/components/front/profile/saveAddress'
import {cities, ostan} from '@/plugins/cities'

export default {
  name: "address",
  components: {
    saveAddress
  },

  data() {
    return {
      colorx: '#F97316',
      addresses: [],
      currentAddress: {},
      popupActive: false,
      titlePopup: 'ایجاد',
      state: ostan,
      cities: cities,
    };
  },
  fetch() {
    this.getAddresses()
  },
  methods: {
    close(val){
      if (val === this.popupActive){
        return
      }
      if(!val){
        this.currentAddress={}
      }
      this.popupActive=! this.popupActive
    },
    getAddresses() {
      this.$store.dispatch('address/getAddress').then(res => {
        if (res.status === 200) {
          this.addresses = res.data
        }
      })
    },
    deleteAddress(address) {
      this.$store.dispatch('address/deleteAddress', address).then((res) => {
        if (res.status === 200) {
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
          this.getAddresses()
        }
      }).catch((err) => {
        this.$vs.notify({
          title: "حذف ناموفق!",
          text: "خطایی رخ داده است.",
          time: 2000,
          color: "danger",
          position: "bottom-right",
          icon: 'check_box',
        })
      })
    },
    saveAddress() {
      if (typeof this.currentAddress.id !== 'undefined') {
        this.$store.dispatch('address/updateAddress', this.currentAddress).then(res => {
          if (res.status == 200) {
            this.$vs.notify({
              title: "با موفقیت ویرایش شد",
              color: "success",
            })
            this.getAddresses()
            this.popupActive = false
            this.currentAddress = {}
          }
        }).catch(errors => {
          if (errors.response.status == 422) {
            this.$store.commit('address/SET_ERRORS', errors.response.data.errors)
          }
        })
        return
      }
      this.$store.dispatch('address/saveAddress', this.currentAddress).then(res => {
        if (res.status == 200) {
          this.$vs.notify({
            title: "با موفقیت ذخیره شد",
            color: "success"
          })
          this.getAddresses()
          this.popupActive = false
          this.currentAddress = {}
        }
      }).catch(errors => {
        if (errors.response.status == 422) {
          this.$store.commit('address/SET_ERRORS', errors.response.data.errors)
        }
      })
    }
  },

}
</script>

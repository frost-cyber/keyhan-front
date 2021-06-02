import {cities, ostan} from '@/plugins/cities'
export const state=()=>({
  ostan,
  cities,
  errors:[],
  addresses:[],
  address:{
    id:null,
    name:null,
    last_name:null,
    state:null,
    mobile:null,
    phone:null,
    city:null,
    address:null,
    postcode:null,
    email:null,
    user_id:null,
    description:null,
  }
})
export const mutations={
  SET_ERRORS(state, errors) {
    state.errors = errors
    console.log(state.errors)
  },
  DELETE_ADDRESS(state, address) {
    if (typeof address == "object" && typeof address.id !== "undefined") {
      address = state.addresses.findIndex(addre => addre.id === address.id)
    }
    state.addresses.splice(address, 1)
  },
  SET_ADDRESSES(state, addresses) {

    state.addresses = addresses
  },

}
export const actions={
   deleteAddress({commit , state}, address) {
    return this.$apiClient.delete(`api/profile/address/${address.id}`)
  },
   getAddress({commit},query=null) {
    let url = 'api/profile/address'
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    return this.$apiClient.get(url)
  },
  saveAddress({commit},address){
    let url='api/profile/address'
    return this.$apiClient.post(url,address)
  },
  updateAddress({commit},address){
    let url='api/profile/address/'+address.id
    return this.$apiClient.put(url,address)
  }
}
export const getters={
  getErrors(state) {
    return JSON.parse(JSON.stringify(state.errors))
  },
  getCities(state){
    return state.cities
  },
  getOstans(state){
    return state.ostan
  }
}

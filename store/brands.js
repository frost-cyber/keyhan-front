export const state = () => {
  return {
    brands: [],
    brand:{},
  }
}

export const mutations = {
  SET_BRANDS(state, brands) {
    state.brands = brands
  },
  SET_BRAND(state, brand) {
    state.brand = brand
  },
  DELETE_BRAND(state, brand) {
    if (typeof brand == "object" && typeof brand.id !== "undefined") {
      brand = state.brands.findIndex(bra => bra.id === brand.id)
    }
    state.brands.splice(brand, 1)
  },
}

export const actions = {
  async getBrands({commit} , query){
    let url = 'api/brands'
    if (query){
      url += "?"+ this.$createQuery(query).substr(1)
    }
    let response  = await this.$apiClient.get(url)
    commit('SET_BRANDS' , response.data)
  },
  async getBrand({commit} , {brandID , query}){
    let url = `api/brands/${brandID}`
    if (query){
      url += "?"+ this.$createQuery(query).substr(1)
    }
    let response  = await this.$apiClient.get(url)
    commit('SET_BRAND' , response.data)
  },
  storeBrand({commit} , brand){
    return this.$apiClient.post('api/brands' , brand)
  },
  updateBrand({commit} , brand){
    return this.$apiClient.patch(`api/brands/${brand.id}` , brand)
  },
  deleteBrand({commit} , brandID){
    return this.$apiClient.delete(`api/brands/${brandID}`)
  }
}

export const getters = {
  getBrands(state){
    return state.brands
  },
  getBrand(state){
    return JSON.parse(JSON.stringify(state.brand))
  }
}

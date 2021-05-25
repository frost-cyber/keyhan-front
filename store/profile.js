export const state = () => ({
  errors: [],
  users: [],
  products:[],
  product:{
    is_virtual:null,

  },
  user: {
    id: null,
    name: null,
    email: null,
    mobile: null,
    phone: null,
    national_code: null,
    password: null,
    current_password: null,
    password_confirmation: null,
    avatar_id: null,
    is_admin: null,
    files: [{}],
    avatar: {},

  }
})
export const mutations = {
  SET_ERRORS(state, errors) {
    state.errors = errors
  },

  SET_USERS(state, users) {
    state.users = users
  },
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_USER(state, user = null) {
    if (user == null) {
      user = {
        id: null,
        name: null,
        email: null,
        mobile: null,
        phone: null,
        national_code: null,
        password: null,
        avatar_id: null,
        is_admin: null,
        file: null,
        avatar: {},
      }
    }
    state.user = user
  },

}
export const actions = {
  async updateProfile({commit, state}, user) {
    return this.$apiClient.patch(`api/profile/update`, user)
  },
  deleteProductFromWishlist({commit,state},product){
    return this.$apiClient.get(`api/products/${product}/toggle_withlist`)
  },
  async updatePassword({commit, state}, password) {
    return this.$apiClient.put(`api/profile/password`, password)
  },
  updateLogo({commit, state}, avatar) {
    return this.$apiClient.put(`api/profile/update/avatar`, avatar)

  },
  async getUser({commit}, query = null) {
    let url = 'api/profile/user'
    if (query) {
      url += "?" + this.$createQuery(query).substr(1)
    }
    const users = await this.$apiClient.get(url)
    commit('SET_USERS', users.data)
    return this.$apiClient.get(url)
  },
  async getProductWishlist({commit}, query = null) {
    let url = 'api/profile/wishlist'
    if (query) {
      url += "?" + this.$createQuery(query).substr(1)
    }
    const products = await this.$apiClient.get(url)
    commit('SET_PRODUCTS', products.data)
    return this.$apiClient.get(url)
  },
}
export const getters = {
  getUser(state) {
    return state.user
  },
  getErrors(state) {
    return JSON.parse(JSON.stringify(state.errors))
  }
}

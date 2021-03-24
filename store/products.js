export const state = ()=>{
  return {
    products:[],
    product: {
      name: '',
      slug: '',
      sku: '',
      type: null,
      review:'46546',
      published_at: '',
      attributes: [],
      images:[],
      variable: {
        id: '',
        values: []
      },
      variables: [],
    },
    errors:{},
  }
}

export const mutations = {
  SET_PRODUCTS(state , products){
    state.products = products
  },
  ADD_PRODUCT(state , product){
    state.products.push(product)
  },
  ADD_PRODUCT_TO_FIRST(state, product) {
    state.products.unshift(product)
  },
  DELETE_PRODUCT(state , product){
    if (typeof product == "object" && typeof product.id !== "undefined") {
      product = state.products.findIndex(prod => prod.id === product.id)
    }
    state.products.splice(product, 1)
  },
  SET_PRODUCT(state , product){
    state.product = product
  },
  SET_ERRORS(state , errors){
    state.errors = errors
  },
}

export const actions = {
  async getProducts({commit}) {
    const products = await this.$apiClient.get('api/products')
    commit('SET_PRODUCTS', products.data)
  },
  async getProduct({commit}, productId) {
    const product = await this.$apiClient.get(`api/products/${productId}`)
    commit('SET_PRODUCT', product.data)
  },
  async storeProduct({commit , state}, product) {
    return this.$apiClient.post('api/products', product)
  },
  async updateProduct({commit , state}, product) {
    return this.$apiClient.patch(`api/products/${product.id}`, product)
  },
  async deleteProduct({commit , state}, product) {
    return this.$apiClient.delete(`api/products/${product.id}`)
  }
}

export const getters = {
  getProducts(state) {
    return JSON.parse(JSON.stringify(state.products))
  },
  getProduct(state) {
    return JSON.parse(JSON.stringify(state.product))
  },
  getErrors(state) {
    return JSON.parse(JSON.stringify(state.errors))
  }
}

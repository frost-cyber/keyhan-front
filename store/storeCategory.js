export const state = () => ({
  categories: [],
  category: {
    name: null,
    slug: null,
    parent_id:null,
  },
  errors: [],
})
export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  ADD_CATEGORY(state, category) {
    state.categories.push(category)
  },
  ADD_CATEGORY_TO_FIRST(state, category) {
    state.categories.unshift(category)
  },
  DELETE_CATEGORY(state, category) {
    if (typeof category == "object" && typeof category.id !== "undefined") {
      category = state.categories.findIndex(cat => cat.id === category.id)
    }
    state.categories.splice(category, 1)
  },
  REPLACE_CATEGORY(state, category) {
    const categoryIndex = state.categories.findIndex(cat => cat.id === category.id)
    state.categories[categoryIndex] = category
  },
  SET_CATEGORY(state, category = null) {
    if (category == null){
      category = {
        name: null,
        slug: null,
        parent_id:null,
      }
    }
    state.category = category
  },
  SET_ERRORS(state, errors) {
    state.errors = errors
  }
}
export const actions = {
  async getCategories({commit}) {
    const categories = await this.$apiClient.get('api/storeCategories')
    commit('SET_CATEGORIES', categories.data)
  },
  async getCategory({commit}, categoryId) {
    const category = await this.$apiClient.get(`api/storeCategories/${categoryId}`)
    commit('SET_CATEGORY', category.data)
  },
  async storeCategory({commit , state}, category) {
    return this.$apiClient.post('api/storeCategories', category)
  },
  async updateCategory({commit , state}, category) {
    return this.$apiClient.patch(`api/storeCategories/${category.id}`, category)
  },
  async deleteCategory({commit , state}, category) {
    return this.$apiClient.delete(`api/storeCategories/${category.id}`)
  }
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getCategory(state) {
    return state.category
  },
  getErrors(state) {
    return state.errors
  }
}

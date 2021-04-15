export const state = () => ({
  attributes: [],
  attribute: {
    name: null,
    type: null,
    is_variable: false,
    values: []
  },
  errors: [],
})
export const mutations = {
  SET_ATTRIBUTES(state, attributes) {
    state.attributes = attributes
  },
  ADD_ATTRIBUTE(state, attribute) {
    state.attributes.push(attribute)
  },
  ADD_ATTRIBUTE_TO_FIRST(state, attribute) {
    state.attributes.unshift(attribute)
  },
  DELETE_ATTRIBUTE(state, attribute) {
    if (typeof attribute == "object" && typeof attribute.id !== "undefined") {
      attribute = state.attributes.findIndex(att => att.id === attribute.id)
    }
    state.attributes.splice(attribute, 1)
  },
  REPLACE_ATTRIBUTE(state, attribute) {
    const attributeIndex = state.attributes.findIndex(att => att.id === attribute.id)
    state.attributes[attributeIndex] = attribute
  },
  SET_ATTRIBUTE(state, attribute = null) {
    if (attribute == null){
      attribute = {
        name: null,
        type: null,
        is_variable: false,
        values: []
      }
    }
    state.attribute = attribute
  },
  SET_ERRORS(state, errors) {
    state.errors = errors
  }
}
export const actions = {
  async getAttributes({commit} , query = null) {
    let url = 'api/attributes'
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    const attributes = await this.$apiClient.get(url)
    commit('SET_ATTRIBUTES', attributes.data)
  },
  async getAttribute({commit}, attributeId) {
    const attribute = await this.$apiClient.get(`api/attributes/${attributeId}`)
    commit('SET_ATTRIBUTE', attribute.data)
  },
  storeAttribute({commit , state}, attribute) {
    return this.$apiClient.post('api/attributes', attribute)
  },
  updateAttribute({commit , state}, attribute) {
    return this.$apiClient.patch(`api/attributes/${attribute.id}`, attribute)
  },
  deleteAttribute({commit , state}, {attribute , query = null}) {
    let url = `api/attributes/${attribute.id}`
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    return this.$apiClient.delete(url)
  }
}
export const getters = {
  getAttributes(state) {
    return JSON.parse(JSON.stringify(state.attributes))
  },
  getAttribute(state) {
    return JSON.parse(JSON.stringify(state.attribute))
  },
  getErrors(state) {
    return JSON.parse(JSON.stringify(state.errors))
  }
}

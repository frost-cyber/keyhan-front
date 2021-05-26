export const state = () => {
  return {
    advices:[],
    advice:{
      name:null,
      phone:null,
      subject:null,
      check:null,
    },
    header : {logo:{} , navbar:{}},
    home :{slider: [],sliderBanners:[{},{}] , brands:[] , categories:[] ,recommendedProducts:{}},
    footer:{contacts:{}},
  }
}

export const mutations = {
  SET_ADVICE(state, advice = null) {
    if (advice == null){
      advice = {
        name:null,
        phone:null,
        subject:null,
      }
    }

    state.advice = advice
  },
  DELETE_ADVICE(state, advice) {
    if (typeof advice == "object" && typeof advice.id !== "undefined") {
      advice = state.advices.findIndex(art => art.id === advice.id)
    }
    state.advices.splice(advice, 1)
  },
  SET_ERRORS(state, errors) {
    state.errors = errors
  },
  SET_HEADER(state , header){
    state.header = header
  },
  SET_FOOTER(state , footer){
    state.footer = footer
  },
  SET_HOME(state , home){
    state.home = home
  }
}

export const actions = {
  async getAdvices({commit}, query = null) {
    let url = 'api/showallAdvices'
    if (query) {
      url += "?" + this.$createQuery(query).substr(1)
    }
    const advices = await this.$apiClient.get(url)
    commit('SET_USERS', advices.data)
    return this.$apiClient.get(url)
  },
  storeAdvice({commit , state}, advice) {
    return this.$apiClient.post('api/advice', advice)
  },
  async deleteAdvice({commit , state}, advice) {
    return this.$apiClient.delete(`api/delete/${advice.id}`)
  },
 getHeader({}){
   return this.$apiClient.$get('api/settings/header')
 },
 updateHeader({} , header){
   return this.$apiClient.$put('api/settings/header' , header)
 },
 getFooter({}){
   return this.$apiClient.$get('api/settings/footer')
 },
 updateFooter({} , footer){
   return this.$apiClient.$put('api/settings/footer' , footer)
 },
 getHome({}){
   return this.$apiClient.$get('api/settings/home')
 },
 updateHome({} , home){
   return this.$apiClient.$put('api/settings/home' , home)
 },
  async toggleCheck({commit},adviceId){
    return  this.$apiClient.put(`api/advice/${adviceId}/toggleCheck`)
  },
}

export const getters = {
  getHeader(state){
    return state.header
  },
  getFooter(state){
    return state.footer
  },
  getHome(state){
    return state.home
  },
}

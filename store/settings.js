export const state = () => {
  return {
    header : {},
    home :{},
    footer:{},
  }
}

export const mutations = {
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
   return this.$apiClient.$get('api/settings/footer')
 },
 updateHome({} , home){
   return this.$apiClient.$put('api/settings/home' , home)
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

export const state = () => {
  return {
  }
}

export const mutations = {

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

}

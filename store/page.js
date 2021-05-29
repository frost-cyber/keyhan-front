export const state=()=>{
  return{
    pages:[],
    page:{
      title:null,
      body:null,
      slug:null,
      status:null
    }
  }
}
export const actions={
  savePage({},page){
    return this.$apiClient.post('api/pages',page)
  },
  getPage({},page){
    return this.$apiClient.get(`api/pages/${page}`)
  },
  updatePage({},page){
    return this.$apiClient.put(`api/pages/${page.id}`,page)
  },
  getPages({},query=null){
    return this.$apiClient.get(`api/pages`)
  },
  async deletePage({}, page) {
    return this.$apiClient.delete(`api/pages/${page.id}`)
  },
}
export const mutations={
}
export const getters={

}

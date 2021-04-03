export const state=()=>({
  comments:[],
  errors: [],
  comment:{
    created_at:null,
    body:null,
    confirmed:null,
    name:null,
    email:null,
  }
})
export const getters={
  getComment(state) {
    return JSON.parse(JSON.stringify(state.comment))
  },
  getComments(state){
    return JSON.parse(JSON.stringify(state.comments))
  },
}
export const actions={
  async getComment({commit}, commentId) {
    const comment = await this.$apiClient.get(`api/articleComments/${commentId}`)
    commit('SET_COMMENT', comment.data)
  },
  async toggleConfirm({commit},commentId){
    return  this.$apiClient.put(`api/articleComments/${commentId}/toggleConfirm`)
  },
  async deleteComment({commit , state}, comment) {
    return this.$apiClient.delete(`api/articleComments/${comment.id}`)
  },
  async getComments({commit},query=null) {
    let url = 'api/articleComments'
    if(query){
      let params = new URLSearchParams(query)
      url += "?" + params.toString()
    }
    const comments = await this.$apiClient.get(url)
    commit('SET_COMMENTS', comments.data)

  },
}
export const mutations={
  SET_COMMENT(state, comment = null) {
    if (comment == null){
      comment = {
        name:null,
        email:null,
        created_at:null,
        body:null,
        confirmed:null,
      }
    }
    state.comment = comment
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },
  DELETE_COMMENT(state, comment) {
    if (typeof comment == "object" && typeof comment.id !== "undefined") {
      comment = state.comments.findIndex(com => com.id === comment.id)
    }
    state.comments.splice(comment, 1)
  },
}

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
    const comment = await this.$apiClient.get(`api/product/comments/${commentId}`)
    commit('SET_COMMENT', comment.data)
  },
  toggleConfirm({commit},commentId){
    return this.$apiClient.put(`api/product/comments/${commentId}/toggleConfirm`)
  },
  deleteComment({commit , state}, comment) {
    return this.$apiClient.delete(`api/product/comments/${comment.id}`)
  },
  async getComments({commit},query=null) {
    let url = 'api/product/comments'
    if(query){
      url += "?" + this.$createQuery(query).substr(1);
    }
    const comments = await this.$apiClient.get(url)
    commit('SET_COMMENTS', comments.data)
  },
  updateComment({commit} , comment){
    return this.$apiClient.put(`api/product/comments/${comment.id}` , comment)
  }
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

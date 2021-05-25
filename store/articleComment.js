export const state=()=>({
  comments:[],
  errors: [],
  article:{
    id: null
  },
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
   storeComment({commit , state}, comment) {
    return this.$apiClient.post('api/articleComments', comment)
  },
  async updateComment({commit , state}, comment) {
    return this.$apiClient.patch(`api/articleComments/${comment.id}`, comment)
  },
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
    let url = `api/articleComments`
    if(query){
      url += "?" + this.$createQuery(query).substr(1);
    }
    const comments = await this.$apiClient.get(url)
    commit('SET_COMMENTS', comments.data)
  },
}
export const mutations={

  SET_ARTICLECOMMENT(state, comment = null) {
    if (comment == null){
      comment = {
        created_at:null,
        body:null,
        confirmed:null,
        name:null,
        email:null,
      }
    }
    state.comment = comment
  },
  SET_ERRORS(state, errors) {
    state.errors = errors
  },
  SET_COMMENT(state, comment = null) {
    if (comment == null){
      comment = {
        name:null,
        email:null,
        body:null,
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

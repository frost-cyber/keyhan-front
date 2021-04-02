export const state=()=>({
  articles:[],
  tags:[],
  errors: [],
  article:{
    image_id:null,
    created_at:null,
    slug:null,
    title:null,
    status:null,
    body:null,
    description:null,
    publish_at:null,
    category_id:null,
    thumbnail:{},
    file:null,
  }
})
export const mutations={
  SET_TAGS(state,tags){
    state.tags = tags
  },
  DELETE_ARTICLE(state, article) {
    if (typeof article == "object" && typeof article.id !== "undefined") {
      article = state.articles.findIndex(art => art.id === article.id)
    }
    state.articles.splice(article, 1)
  },
  SET_ERRORS(state, errors) {
    state.errors = errors
  },
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  SET_ARTICLE(state, article = null) {
    if (article == null){
      article = {
        image_id:null,
        slug:null,
        title:null,
        status:null,
        body:null,
        file:null,
        description:null,
        publish_at:null,
        tags:[]
      }
    }
    state.article = article
  },
}
export const actions={
  async getTags({commit}){
    const tags = await this.$apiClient.get('api/tags')
    commit('SET_TAGS',tags.data)
  },
  async getArticles({commit},query=null) {
    let url = 'api/articles'
    if(query){
      let params = new URLSearchParams(query)
      url += "?" + params.toString()
    }
    const articles = await this.$apiClient.get(url)
    commit('SET_ARTICLES', articles.data)

  },
  async getArticle({commit}, articleId) {
    const article = await this.$apiClient.get(`api/articles/${articleId}`)
    commit('SET_ARTICLE', article.data)
  },
  async deleteArticle({commit , state}, article) {
    return this.$apiClient.delete(`api/articles/${article.slug}`)
  },
  async storeArticle({commit , state}, article) {
    return this.$apiClient.post('api/articles', article)
  },
  async updateArticle({commit , state}, article) {
    return this.$apiClient.patch(`api/articles/${article.slug}`, article)
  },
}
export const getters={
  getTags(state){
    return JSON.parse(JSON.stringify(state.tags))
  },
  getArticle(state) {
    return JSON.parse(JSON.stringify(state.article))
  },
  getArticles(state){
    return JSON.parse(JSON.stringify(state.articles))
  },
  getErrors(state) {
    return JSON.parse(JSON.stringify(state.errors))
  }
}

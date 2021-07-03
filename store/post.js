export const state=()=>({
    posts:[],
    errors: [],
    post:{
        id:null,
        start:null,
        end:null,
        price:null,
        is_free:null,
        name:null,
        states:[],
        weight:[],
    }
})
export const mutations={
    SET_POST(state, post = null) {
        if (post == null){
            post = {
                id:null,
                start:null,
                end:null,
                price:null,
                is_free:null,
                name:null,
                states:[],
                weight:[],
            }
        }
        state.post = post
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
    DELETE_POST(state, post) {
        if (typeof post == "object" && typeof post.id !== "undefined") {
            post = state.posts.findIndex(po => po.id === post.id)
        }
        state.posts.splice(post, 1)
    },
}
export const actions={
    async storePost({commit , state}, post) {
        return this.$apiClient.post('api/posts', post)
    },
    async deletePost({commit , state}, post) {
        return this.$apiClient.delete(`api/posts/${post.id}`)
    },
    async getPosts({commit},query=null) {
        let url = 'api/posts'
        if(query){
            url += "?" + this.$createQuery(query).substr(1)
        }
        return this.$apiClient.get(url)
    },
    updatePost({commit , state}, post) {
        return this.$apiClient.patch(`api/posts/${post.id}`, post)
    },
     getPost({}, post) {
        return this.$apiClient.get(`api/posts/${post}`)
    },
}
export const getters={
    getErrors(state) {
        return JSON.parse(JSON.stringify(state.errors))
    },

}

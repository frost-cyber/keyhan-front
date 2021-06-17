export const state=()=>({
    posts:[],
    errors: [],
    post:{
        id:null,
        start:null,
        end:null,
        price:null,
        is_free:null,
        name:null
    }
})
export const mutations={
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
}
export const actions={
    async storePost({commit , state}, post) {
        return this.$apiClient.post('api/posts', post)
    },

}
export const getters={
    getErrors(state) {
        return JSON.parse(JSON.stringify(state.errors))
    }
}

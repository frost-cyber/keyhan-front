export const state = () => ({
    errors:[],
    users:[],
    user: {
        name:null,
        last_name:null,
        email:null,
        phone:null,
        mobile:null,
        national_code:null,
        avatar: {},
        is_admin:null,
        password:null,
        current_password: null,
        password_confirmation: null,
        avatar_id: null,
        files: [{}],

    }
})
export const mutations = {
    DELETE_USER(state, user) {
        if (typeof user == "object" && typeof user.id !== "undefined") {
            user = state.users.findIndex(us => us.id === user.id)
        }
        state.users.splice(user, 1)
    },
    SET_USERS(state, user = null) {
        if (user == null) {
            user = {
                image_id: null,
                slug: null,
                title: null,
                status: null,
                body: null,
                password:null,
                file: null,
                description: null,
                publish_at: null,
            }
        }
        state.user = user
    },
    SET_USER(state, user = null) {
        if (user == null){
            user = {
                image_id: null,
                slug: null,
                title: null,
                status: null,
                body: null,
                file: null,
                password:null,
                description: null,
                publish_at: null,
            }
        }

        state.user = user
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
}
export const actions = {
    async deleteUser({commit , state}, user) {
        return this.$apiClient.delete(`api/users/${user.id}`)
    },
    async updateUser({commit , state}, user) {
        return this.$apiClient.put(`api/users/${user.id}`, user)
    },
    async getUsers({commit}, query = null) {
        let url = 'api/users'
        if (query) {
            url += "?" + this.$createQuery(query).substr(1)
        }
        const users = await this.$apiClient.get(url)
        commit('SET_USERS', users.data)
        return this.$apiClient.get(url)
    },
    async getUser({commit}, userId) {
        const user = await this.$apiClient.get(`api/users/${userId}`)
        commit('SET_USER', user.data)
    },

}
export const getters = {
    getUser(state) {
        return JSON.parse(JSON.stringify(state.user))
    },

}

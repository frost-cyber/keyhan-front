export const state = () => ({
    errors:[],
    admins:[],
    admin: {
        name:null,
        last_name:null,
        email:null,
        phone:null,
        mobile:null,
        national_code:null,
        avatar: {},
        is_admin:1,
        password:null,
        current_password: null,
        password_confirmation: null,
        avatar_id: null,
        files: [{}],

    }
})
export const mutations = {
    DELETE_Admin(state, admin) {
        if (typeof admin == "object" && typeof admin.id !== "undefined") {
            admin = state.admins.findIndex(ad => ad.id === admin.id)
        }
        state.admins.splice(admin, 1)
    },
    SET_ADMINS(state, admin = null) {
        if (admin == null) {
            admin = {
                image_id: null,
                slug: null,
                title: null,
                status: null,
                is_admin:1,
                body: null,
                password:null,
                file: null,
                description: null,
                publish_at: null,
            }
        }
        state.admin = admin
    },
    SET_ADMIN(state, admin = null) {
        if (admin == null){
            admin = {
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

        state.admin = admin
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
}
export const actions = {
    async deleteAdmin({commit , state}, admin) {
        return this.$apiClient.delete(`api/admins/${admin.id}`)
    },
    async updateAdmin({commit , state}, admin) {
        return this.$apiClient.put(`api/admins/${admin.id}`, admin)
    },
    async getAdmins({commit}, query = null) {
        let url = 'api/admins'
        if (query) {
            url += "?" + this.$createQuery(query).substr(1)
        }
        const admins = await this.$apiClient.get(url)
        commit('SET_ADMINS', admins.data)
        return this.$apiClient.get(url)
    },
    async getAdmin({commit}, adminId) {
        const admin = await this.$apiClient.get(`api/admins/${adminId}`)
        commit('SET_ADMIN', admin.data)
    },
    async saveAdmin({commit}, admin) {
        return this.$apiClient.post('api/admins', admin)

    },


}
export const getters = {
    getAdmin(state) {
        return JSON.parse(JSON.stringify(state.admin))
    },

}

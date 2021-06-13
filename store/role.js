export const state = () => ({
    roles: [],
    errors: [],
    role: {
        name: null,
    }

})
export const mutations = {
    SET_ROLE(state, role = null) {
        if (role == null) {
            role = {
                name: null,
            }
        }
        state.role = role
    },
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
}
export const actions = {
    deleteRole({commit, state}, role) {
        return this.$apiClient.delete(`api/roles/${role.id}`)
    },
    saveRole({commit, state}, role) {
        return this.$apiClient.post('api/roles', role)
    },
    updateRole({commit, state}, role) {
        return this.$apiClient.put(`api/roles/${role.id}`, role)
    },
    getRole({}, role) {
        return this.$apiClient.get(`api/roles/${role}`)
    },
    getRoles({commit}, query = null) {
        let url = 'api/roles'
        if (query) {
            url += "?" + this.$createQuery(query).substr(1)
        }
        return this.$apiClient.get(url)
    },
}
export const getters = {
    getRoles(state) {
        return state.roles
    },
}
export const state = () => {
    return {
        advices: [],
        customizations: [],
        customization: {
            name: null,
            contact: null,
            description: null,
            product_id: null,
            status: null,
        },
        advice: {
            name: null,
            phone: null,
            subject: null,
            check: null,
        },
    }
}

export const mutations = {
    SET_ADVICE(state, advice = null) {
        if (advice == null) {
            advice = {
                name: null,
                phone: null,
                subject: null,
            }
        }
        state.advice = advice
    },
    SET_CUSTOMIZATION(state, customization = null) {
        if (customization == null) {
            customization = {
                name: null,
                contact: null,
                description: null,
            }
        }
        state.customization = customization
    },
    DELETE_ADVICE(state, advice) {
        if (typeof advice == "object" && typeof advice.id !== "undefined") {
            advice = state.advices.findIndex(art => art.id === advice.id)
        }
        state.advices.splice(advice, 1)
    },
    DELETE_CUSTOMIZATION(state, customization) {
        if (typeof customization == "object" && typeof customization.id !== "undefined") {
            customization = state.customizations.findIndex(art => art.id === customization.id)
        }
        state.customizations.splice(customization, 1)
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
}

export const actions = {
    async getAdvices({commit}, query = null) {
        let url = 'api/forms/advices'
        if (query) {
            url += "?" + this.$createQuery(query).substr(1)
        }
        const advices = await this.$apiClient.get(url)
        commit('SET_USERS', advices.data)
        return this.$apiClient.get(url)
    },
    saveCustomization({commit, state}, customization) {
        return this.$apiClient.post('api/forms/customizations', customization)
    },
    async getCustomizations({commit}, query = null) {
        let url = 'api/forms/customizations'
        if (query) {
            url += "?" + this.$createQuery(query).substr(1)
        }
        return this.$apiClient.get(url)
    },
    storeAdvice({commit, state}, advice) {
        return this.$apiClient.post('api/forms/advices', advice)
    },
    async deleteAdvice({commit, state}, advice) {
        return this.$apiClient.delete(`api/forms/advices/${advice.id}`)
    },
    async deleteCustomization({commit, state}, customization) {
        return this.$apiClient.delete(`api/forms/customizations/${customization.id}`)
    },

    async toggleAdviceCheck({commit}, adviceId) {
        return this.$apiClient.put(`api/forms/advices/${adviceId}/toggleCheck`)
    },
    async toggleCustomizationStatus({commit}, customizationId) {
        return this.$apiClient.put(`api/forms/customizations/${customizationId}/toggleStatus`)
    },
}

export const getters = {}

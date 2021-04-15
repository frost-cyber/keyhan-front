export const state = () => {
  return {
    file: {}
  }
}

export const mutations = {
  SET_FILE(state, file) {
    state.file = file
  }
}

export const actions = {
  async uploadProductImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    await this.$apiClient.post('api/files/upload?for=ProductImage', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => data = res.data).catch(err => console.log(err))
    commit('SET_FILE' , data)
  },
  uploadBrandLogo({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=BrandLogo', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async uploadArticleImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    await this.$apiClient.post('api/files/upload?for=ArticleThumbnail', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => data = res.data).catch(err => console.log(err))
    commit('SET_FILE' , data)
  },
  async uploadEditorImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    await this.$apiClient.post('api/files/upload?for=EditorImage', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => data = res.data).catch(err => console.log(err))
    commit('SET_FILE' , data)
  }
}

export const getters = {
  getFile(state){
    return JSON.parse(JSON.stringify(state.file))
  }
}

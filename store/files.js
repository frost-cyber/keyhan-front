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
  HomeSliderImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=HomeSliderImage', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  HomeCategoryImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=HomeCategoryImage', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  HomeBrandImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=HomeBrandImage', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadSiteLogo({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=SettingSiteLogo', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadLicenseImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=SettingLicenseImage', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
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
  uploadArticleImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=ArticleThumbnail', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadProfileImage({commit}, file) {
    let fileData = new FormData
    fileData.append('file', file)
    let data = null
    return this.$apiClient.post('api/files/upload?for=ProfileAvatar', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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

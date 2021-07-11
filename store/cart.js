export const state=()=>{
 return{
   currentCart:{},
   $productvariant:{}
 }

}
export const actions={
  setAddress({},id){
    return this.$apiClient.post(`api/carts/currentCart/setAddress/${id}`)
  },
  addToCart({},data){
    return this.$apiClient.post('api/carts/currentCart/add',data)
  },
  currentCart({commit},query=null){
    let url = 'api/carts/currentCart'
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    return this.$apiClient.get(url)
  },
  getCart({commit},cartId,query=null){
    let url = `api/carts/${cartId}`
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    return this.$apiClient.get(url)
  },
  getCarts({commit},query=null){
    let url = 'api/carts'
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    return this.$apiClient.get(url)
  },
  deleteProductFromCart({},id){
    return this.$apiClient.get(`api/carts/currentCart/${id}`)
  },
  payCart(){
    return this.$apiClient.get('api/orders/payCart')
  },
  checkPay({},query){
    let url ='api/orders/checkPayment'
    if(query){
      url += "?" + this.$createQuery(query).substr(1)
    }
    return this.$apiClient.get(url)
  },
  redirectUserToGetWay({},url,method,data){
    let form = document.createElement('form')
    form.action = url
    form.method = method
    document.body.append(form)
    for(let i in data){
      let input = document.createElement('input')
      input.name = i
      input.type ='hidden'
      input.value = data[i]
      form.append(input)
    }
    form.submit()
  }

}
export const getters={
  currentCart(state){
     return state.currentCart
  },
  currentCartCountItems(state){
    return state.currentCart.product_variants_count || 0
  },

}
export const mutations={
  SET_CURRENT_CART(state,cart){
    state.currentCart=cart
  },

}

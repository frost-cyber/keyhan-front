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
  deleteProductFromCart({},id){
    return this.$apiClient.get(`api/carts/currentCart/${id}`)
  },

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

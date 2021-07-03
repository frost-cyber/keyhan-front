export const state =()=>{
    return {}
}
export const actions={
    getOrders({commit},query=null){
        let url = 'api/orders'
        if(query){
            url += "?" + this.$createQuery(query).substr(1)
        }
        return this.$apiClient.get(url)
    },
    getOrder({commit},orderId,query=null){
        let url = `api/orders/${orderId}`
        if(query){
            url += "?" + this.$createQuery(query).substr(1)
        }
        return this.$apiClient.get(url)
    },
    saveChange({},{orderId,data}){
        let url =`api/orders/${orderId}`
        return this.$apiClient.put(url,data)
    }
}
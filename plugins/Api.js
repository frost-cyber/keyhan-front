import axios from 'axios'
export default function (context , injector) {
  const apiClient  = axios.create({
    baseURL: "http://server.keyhan.p",
    withCredentials: true,
  })
  async function getCSRF(request){
    if (["post" , "put" , "patch"].includes(request.method.toLowerCase())){
      await apiClient.get("sanctum/csrf-cookie")
    }
    return request
  }
  apiClient.interceptors.request.use(getCSRF)

  injector('apiClient' , apiClient)
}

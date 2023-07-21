import axios from 'axios';


type Parameter= {
  url:string,
  data?:Object,
  config?:Object,
}
function createAxios() {
  const axInstance = axios.create()
  axInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //config.baseURL =  process.env.VITE_API_URL
    config.baseURL = import.meta.env.VITE_API_URL;

    console.log("req: ",config.data)
    //VITE_API_URL
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axInstance.interceptors.response.use((response) =>{
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("resp: ",response.data)
    if (response.status!==200){
      console.error("ERROR : ",response)
    }else{
      return response;
    }


  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


  return {
    get: async (parames:Parameter )=>{
      const {url,data} = parames
      const res = await axInstance.get(url, data)
      return res.data
      //return res
    },
    post: async (parames:Parameter )=>{
      const {url,data} = parames
      const res = await axInstance.post(url, data)
      return res.data
      //return res
    } ,
    put: async (parames:Parameter )=>{
      const {url,data} = parames
      const res = await axInstance.put(url, data)
      return res.data
      //return res
    } ,
    delete: async (parames:Parameter )=>{
      const {url,data} = parames
      const res = await axInstance.delete(url, data)
      return res.data
      //return res
    } ,
  }

}
export const request = createAxios()

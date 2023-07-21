import { httpsFeatch } from './https_list';
const api_head_ = {
  GET_: {
    "Content-type": 'application/x-www-from-urlencoded'
  },
  POST_: {
    "Content-type": 'application/json'
  },
}
// 通用接口请求
export const http_all = (url, params, opt = {}) => {
  opt.data = params
  opt.header = api_head_['POST_']
  return httpsFeatch(url, opt)
}

// get请求
export const get = (url, params, opt = {}) => {
  opt.header = api_head_['GET_']
  opt.method = "GET"
  opt.data = params
  return httpsFeatch(url, opt)
}

// post请求
export const post = (url, params, opt = {}) => {
  opt.header = api_head_['POST_']
  opt.method = 'POST',
    opt.data = params
  return httpsFeatch(url, opt)
}
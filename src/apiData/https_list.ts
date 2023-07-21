import store from '@/store_/index'
import { get_, set_, clear_ } from '@/utils'
import { APIHTTPS } from '@/store_/mutation-types'
let Times = 0  // 获取不到商家id时重新调用的次数
interface httpsObject {
  params: Array<[]>,
  method: string,
  url: string,
  data: object,
  header: object,
  timeout: number,
  code: number
}
const httpsFeatch = (url: string, opt: httpsObject) => {
  //包装请求对象
  let params = opt.params ? ('?' + Object.keys(opt.params).map(key => key + '=' + opt.params[key]).join('&')) : ''
  opt.method = opt.method || "GET";

  let header = {}
  if (get_('SUPP_ID')) {
    let info = uni.getSystemInfoSync()
    header = { suppliercert: get_('SUPP_ID'), token: get_('Token'), deviceno: info.deviceId }
  }

  let api_data = { url_: url, data: opt.data, ...header, ...opt }
  // let url_https = store.state.is_mock ? store.state.httpsMock : get_(APIHTTPS)
  let url_https = get_(APIHTTPS) && get_(APIHTTPS) || '/api'
  opt.url = url_https + url + params
  // #ifdef MP-WEIXIN
  if (!get_('Token')) {
    if (!store.state.user.LodingModal) {
      store.commit('LoginModal', true)
    }
    is_token(get_('Token'))
  }
  // #endif

  opt.header = { ...opt.header, ...header }
  opt.data = opt && opt.data || {};
  opt.timeout = 50000;
  //发起请求
  return new Promise((resolve, reject) => {
    let options = {}
    Object.keys(opt).map(key => {
      if (key !== "params") {
        return options[key] = opt[key]
      }
    })
    uni.request(options)
      .then(res => interceptorsRes(res, resolve, reject))
      .catch(err => interceptorsErr(err, api_data, reject))
  })
}
const interceptorsRes = (res: httpsObject, resolve: any, reject: any) => {
  const { code } = res.data
  if (code === 40026) {  //没有登录的时候直接回首页
    // #ifdef H5
    store.dispatch('index_')
    // #endif
    if (get_('Token')) {
      is_login()
    }
    return
  }
  resolve(res.data)
}
//登录过期
const is_login = () => {
  uni.showModal({
    title: '提示',
    content: '登录过期',
    showCancel: false,
    success(res) {
      if (res.confirm) {
        clear_('Token')
        store.dispatch('login_')
      }
    }
  })
}
// 检测没有登录
const is_token = (node: boolean) => {
  let showMod = !node ? true : false
  let pages = getCurrentPages()
  if (store.state.user.LodingModal) {
    let whiteList = ['pages/login/login', 'pages/index/index', 'subpkg/agreement/agreement']
    let view = pages[pages.length - 1]
    if (view && showMod == true && whiteList.indexOf(view.route) == -1) {
      uni.showModal({
        title: '提示',
        content: '检测到您还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            showMod = false
            store.dispatch('login_')
            store.commit('LoginModal', false)
          } else if (res.cancel) {
            showMod = false
            store.dispatch('index_')
            store.commit('LoginModal', false)
            uni.$showMsg('您取消了授权登录,请先登录！')
          }
        }
      })
    }
  }
}
// 异常处理
const interceptorsErr = (err: string, api_data: object, reject: any) => {
  // store.dispatch('page_found')
  console.warn('请求出错', err)
  set_('api_data_url', api_data)
  reject(err)
}
export { httpsFeatch }

import { createStore, createLogger } from "vuex";
import { ISLOADING, HEADTOP, ERRORiMG } from './mutation-types'
import getters from "./getters";
import user from "./modules/user";
import https from "./modules/https";
import routerPath from "./modules/routerPath";
const bool = import.meta.env.MODE !== 'production'
const url = import.meta.env.VITE_HTTPS_URL
const state = {
  loading_: false,
  httpsMock: url,
  headTop_: true,
  errorImg: false, //兼容xxx
  tel: '',     // 门店微信号
  qrcode: '',  // 门店微信二维码
  // LodingModal: false,
  is_mock: false,//是否启用模拟数据
}
export default createStore({
  state,
  getters,
  modules: {
    user,
    https,
    routerPath
  },
  plugins: bool ? [createLogger()] : [],
  mutations: {
    //loading
    [ISLOADING](state, { name, value }) {
      console.log(name, value)
      state.loading_ = value
    },
    //headtop
    [HEADTOP](state, { name, value }) {
      state.headTop_ = value
    },
    [ERRORiMG](state, { name, value }) {
      state.errorImg = value
    },

  }
})
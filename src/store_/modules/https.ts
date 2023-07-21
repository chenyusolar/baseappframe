
import { APIHTTPS } from '../mutation-types'
import { set_, get_, clear_ } from '@/utils'
import server from '@/apiData/api';
interface objects {
  Node: boolean,
  LodingModal: boolean
}
const state = () => ({
  items: [],
  LodingModal: false
})
const geteers = {}
const mutations = {
  LoginModal(state: objects, Node: boolean) {
    state.LodingModal = Node
  }
}
const actions = {
  getSupplier({ commit: any }, data: string) {
    let ext = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
    return new Promise((resolve, reject) => {
      if (ext && ext.suppliercret && ext.merchant_name) {
        set_('SUPP_ID', ext.suppliercret)
        set_('shop_avat', ext.logo ? ext.logo : '')
        set_('mini_shop_logo', ext.mini_logo ? ext.mini_logo : '')
        set_('shop_name', ext.merchant_name)
        resolve(ext)
        console.log(ext, 'ext')
      } else {
        server.app_id_get_suppid({ app_id: data })
          .then((e) => {
            if (e.code == 0) {
              // commit('Supplier', e.data.suppliercret)
              set_('subscribe_id', e.data && JSON.stringify(e.data.subscribe_list))
              set_('SUPP_ID', e.data.suppliercret)
              set_('shop_avat', e.data.logo)
              set_('shop_name', e.data.merchant_name)
              set_('mini_shop_logo', e.data.mini_logo)

              resolve(e)
            }
          })
      }
    })
  },
  async wxUpload_() {
    try {
      // 获取版本更新信息
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        console.log('小程序是否有版本更新 onLaunch', res.hasUpdate);
      });
      // 监听小程序有版本更新事件
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，现在就去体验吧！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      // 监听小程序更新失败事件
      updateManager.onUpdateFailed(() => {
        // 新版本下载失败   
        console.log('新版本下载失败');
      });
    } catch (err) {
      console.log('app onLaunch updateManager fail', err);
    }
  },
  getHttps({ dispatch }, Node: string) {
    set_(APIHTTPS, 'www.baidu.com')
    dispatch('getSupplier', Node)
  },
}
export default {
  state,
  geteers,
  mutations,
  actions

}
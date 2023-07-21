import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./store_";
import { setupStore } from '@/store'
import { apiMixin } from './utils/mixin'
import uviewPlus from 'uview-plus'
import headTop from '@/components/loading/index.vue'
// import BMoney from '@/components/BMoney/BMoney.vue'

uni.$showMsg = function (title = '获取数据失败', duration = 1500) {
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration
  })
}
export function createApp() {
  const app = createSSRApp(App);
  app.mixin(apiMixin)
  app.use(store)
  setupStore(app);
  app.use(uviewPlus)
  app.component('headTop', headTop);
  // app.component('BMoney', BMoney);
  // uni.$u.config.unit = 'rpx'
  return {
    app,
  };
}

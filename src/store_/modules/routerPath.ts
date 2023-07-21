const state = () => ({

})
const geteers = {}
const mutations = {

}
const actions = {
  login_() {
    uni.navigateTo({
      url: '../../pages/login/login'
    })
  },
  index_() {
    uni.reLaunch({
      url: '../../pages/index/index'
    })
  },
}
export default {
  state,
  geteers,
  mutations,
  actions

}
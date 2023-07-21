
interface objects {
  items: Array<[]>,
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

}
export default {
  state,
  geteers,
  mutations,
  actions

}
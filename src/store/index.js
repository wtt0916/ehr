import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
  state: {
    userInfo: {
    },
    actionList:{},
    roleList:""
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setAction(state,actionList){
      state.actionList = actionList
    },
    setRole(state,roleList){
      state.roleList = roleList
    }
  }
})

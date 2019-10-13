import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

// import VuexPersistence from 'vuex-persist'
import createPersistedStateS from "vuex-persistedstate"


import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()
    createPersistedStateS()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

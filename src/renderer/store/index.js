import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import createMutationsSharer,{LocalStorageStrategy} from "vuex-shared-mutations";

// import VuexPersistence from 'vuex-persist'
import createPersistedStateS from "vuex-persistedstate"


import modules from './modules'

console.log(modules)

let array  = [];


//获取所有m
for (const key in modules) {
  if (modules.hasOwnProperty(key)) {
    const element = modules[key];
    

    for (const k in element['mutations']) {
      if (element['mutations'].hasOwnProperty(k)) {
        const e = element['mutations'][k];

        console.log(e.name);
        array.push(e.name);
        
      }
    }

  }
}
// modules.keys().forEach((v,i)=>{

//   console.log(modules[v]['mutations'])
//   modules[v]['mutations'].forEach((v1,k1,m1)=>{
//       array.push(k1);
//     })
// })

console.log('mutations',array);

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    createMutationsSharer({
      predicate:array
      // strategy: LocalStorageStrategy()
    })
    // createSharedMutations()
    // createPersistedStateS()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

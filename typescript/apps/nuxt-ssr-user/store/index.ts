import Vuex, { Store } from "vuex"

interface RootState {}
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: () => {}
  }
})
const createStore = (): Store<RootState> => {
  return store
}

export default createStore

// Import all your submodules
// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
// ...

// This compiles to nothing and only serves to return the correct type of the accessor
//

import { getAccessorType } from 'typed-vuex'

import * as place from '~/store/place'

// Import all your submodules
// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
// ...

// This compiles to nothing and only serves to return the correct type of the accessor
//
export const accessorType = getAccessorType({
  modules: {
    place,
  },
})

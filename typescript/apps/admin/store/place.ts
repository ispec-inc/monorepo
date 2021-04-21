import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import PlaceData from '~/types/place'

export const state = () => ({
  list: [] as Array<PlaceData>,
  current: null as PlaceData | null,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  list: (state) => state.list,
  current: (state) => state.current,
})

export const mutations = mutationTree(state, {
  setList(state, list): void {
    state.list = list
  },
  setCurrent(state, current): void {
    state.current = current
  },
  addList(state, animeData): void {
    state.list.push(animeData)
  },
  updateList(state, animeData): void {
    state.list = state.list.map((data) =>
      data.id === animeData.id ? animeData : data
    )
  },
  deleteList(state, animeData): void {
    state.list = state.list.filter((data) => data.id !== animeData.id)
  },
  clearAll(state) {
    state.list = []
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getPlaceList({ commit }) {
      const res = await this.$axios.get<PlaceData[]>('/places')
      commit('setList', res.data)
    },
    async getPlace({ commit }, { id }) {
      const res = await this.$axios.get<PlaceData>(`/places/${id}`)
      commit('setCurrent', res.data)
    },
  }
)

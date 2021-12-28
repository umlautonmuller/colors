import { v4 as uuidv4 } from "uuid";

/* eslint-disable no-unused-vars */
const module = {
  namespaced: true,
  state: () => ({
    colors: [
      { id: uuidv4(), locked: false },
      { id: uuidv4(), locked: false },
      { id: uuidv4(), locked: false },
      { id: uuidv4(), locked: false },
      { id: uuidv4(), locked: false }
    ],
    originals: [],
    size: 5,
  }),
  mutations: {
    setColors(state, colors) {
      state.colors = colors;
      state.size = colors.length;
    },
    increment(state) {
      state.size = state.size + 1;

      state.colors.push({
        id: uuidv4(),
        locked: false
      });
    },
    decrement(state) {
      state.size = state.size - 1;
    },
    randomize() {
      this.$refs.columns.map((component) => component.randomize());
    },
    deleteColorAt(state, index) {
      state.colors.splice(index, 1);
    },
    insertColorAt(state, { color, index }) {
      state.colors.splice(index, 0, color);
    },
    toggleLockColorAt(state, index) {
      state.colors[index].locked = !state.colors[index].locked;
    },
    unlockAll(state) {
      state.colors.forEach((color) => color.locked = false);
    },
  },
  actions: {
    increment({ commit, state }) {
      if (state.size < 8) {
        commit('increment');
      }
    },
    clear({ commit, state }) {
      const locked = state.colors.filter((color) => color.locked);

      commit("setColors", locked);

      while (state.colors.length < 5) {
        commit("increment");
      }
    },
    randomize({ commit, state }) {
      const originalSize = state.size;
      const locked = state.colors.filter((color) => color.locked);

      commit("setColors", locked);

      while (state.colors.length < originalSize) {
        commit("increment");
      }
    },
    deleteColorById({ commit, state }, id) {
      if (state.size > 3) {
        commit("decrement");
        const position = state.colors.findIndex((color) => color.id === id);

        if (position >= 0) {
          commit("deleteColorAt", position);
        }
      }
    },
    toggleLockById({ commit, state }, id) {
      const position = state.colors.findIndex((color) => color.id === id);

      if (position >= 0) {
        commit("toggleLockColorAt", position);
        return state.colors[position].locked;
      }
    },
    sendToFront({ commit, state }, id) {
      const position = state.colors.findIndex((color) => color.id === id);
      const lockedCount = state.colors.filter((color) => color.locked).length;
      const color = state.colors[position];

      commit("deleteColorAt", position);
      commit("insertColorAt", { color: color, index: lockedCount - 1});
    },
    unlockAll({ commit }) {
      commit("unlockAll");
    }
  }
};

export default module;

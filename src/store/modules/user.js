/* eslint-disable no-unused-vars */
const module = {
  namespaced: true,
  state: () => ({
    user: undefined,
    logged: false
  }),
  mutations: {
    set(state, user) {
      state.user = user;
      state.logged = true;
    },
    logout(state, user) {
      state.user = undefined;
      state.logged = false;
      localStorage.removeItem("colors.token");
    }
  },
};

export default module;

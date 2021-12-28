const module = {
  namespaced: true,

  state: () => ({
    message: '',
    color: '#CCC',
    timeout: 2000,
    visible: false,
  }),
  
  mutations: {
    show (state, {message, color, timeout}) {
      state.message = message || '';
      state.color = color || '#CCC';
      state.timeout = timeout || 2000;
      state.visible = true;
    },
    hide (state) {
      state.message = '';
      state.color = '#CCC';
      state.timeout = 2000;
      state.visible = false;
    },
  }
}

export default module;
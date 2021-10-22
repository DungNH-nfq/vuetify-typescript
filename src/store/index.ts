import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const requireComponent = require.context("@/store/modules", true, /\.ts$/);
let modules: any = {};

requireComponent.keys().forEach((fileName) => {
  const storeConfig = requireComponent(fileName);

  modules = Object.assign(modules, storeConfig);
});

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage: "",
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
  },
  actions: {},
  modules,
});

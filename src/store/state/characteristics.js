import Vue from 'vue';

const state = Vue.observable({
  all: new Map(),
});

export default {
  get state() {
    return state;
  },

  getAll() {
    return state.all;
  },

  setAll(all) {
    state.all = all;
  },
};

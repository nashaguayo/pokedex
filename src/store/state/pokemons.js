import Vue from 'vue';

const state = Vue.observable({
  all: [],
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

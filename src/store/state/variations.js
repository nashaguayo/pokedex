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

  setVariant(name, variants) {
    state.all.set(name, variants);
  },
};

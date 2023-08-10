import Vue from 'vue';

const state = Vue.observable({
  filter: '',
  all: [],
  pokemons: new Map(),
});

export default {
  get state() {
    return state;
  },

  getFilter() {
    return state.filter;
  },

  setFilter(filter) {
    state.filter = filter;
  },

  getAll() {
    return state.all;
  },

  setAll(all) {
    state.all = all;
  },

  remove(generation) {
    const index = state.all.findIndex((g) => g === generation);
    state.all.splice(index, 1);
  },

  getPokemons() {
    return state.pokemons;
  },

  setPokemons(name, pokemons) {
    state.pokemons.set(name, pokemons);
  },
};

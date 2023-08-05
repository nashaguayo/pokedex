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

  setAll(all) {
    state.all = all;
  },

  removeShapeAt(index) {
    state.all.splice(index, 1);
  },

  getPokemons() {
    return state.pokemons;
  },

  setPokemons(name, pokemons) {
    state.pokemons.set(name, pokemons);
  },
};

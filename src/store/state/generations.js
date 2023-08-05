import Vue from 'vue';

const state = Vue.observable({
  filter: '',
  all: [],
  pokemons: new Map(), //pokemonsByGeneration
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

  removeGenerationAt(index) {
    state.all.splice(index, 1);
  },

  setPokemons(name, pokemons) {
    state.pokemons.set(name, pokemons);
  },
};

import Vue from 'vue';

const state = Vue.observable({
  filter: '',
  all: [], // allGenerations
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

  setPokemons(pokemons) {
    state.pokemons = pokemons;
  },
};

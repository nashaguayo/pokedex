import Vue from 'vue';

const state = Vue.observable({
  filters: [],
  all: [],
  pokemons: new Map(),
});

export default {
  get state() {
    return state;
  },

  getFilters() {
    return state.filters;
  },

  getPokemons() {
    return state.pokemons;
  },

  setAll(types) {
    state.all = types;
  },

  removeFilter(type) {
    const index = state.filters.findIndex((t) => type === t);
    state.filters.splice(index, 1);
  },

  addFilter(type) {
    state.filters.push(type);
  },

  clearFilters() {
    state.filters = [];
  },

  setPokemonsByType(type, pokemons) {
    state.pokemons.set(type, pokemons);
  },

  replaceTranslation(type, translation) {
    const index = state.all.findIndex((t) => t === type);
    state.all[index] = translation;
  },

  remove(type) {
    const index = state.all.findIndex((t) => t === type);
    state.all.splice(index, 1);
  },
};

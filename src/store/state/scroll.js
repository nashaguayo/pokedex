import Vue from 'vue';

const state = Vue.observable({
  pokemons: [],
  nextUrl: '',
  isLoading: false,
});

export default {
  get state() {
    return state;
  },

  getPokemons() {
    return state.pokemons;
  },

  setPokemons(pokemons) {
    state.pokemons = pokemons;
  },

  getNextUrl() {
    return state.nextUrl;
  },

  setNextUrl(nextUrl) {
    state.nextUrl = nextUrl;
  },

  getIsLoading() {
    return state.isLoading;
  },

  setIsLoading(isLoading) {
    state.isLoading = isLoading;
  },
};

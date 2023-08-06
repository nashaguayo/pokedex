import Vue from 'vue';

const state = Vue.observable({
  results: [], // search.results
  isSearching: false, // search.isSearchingPokemon
});

export default {
  get state() {
    return state;
  },

  setResults(results) {
    state.results = results;
  },

  getIsSearching() {
    return state.isSearching;
  },

  setIsSearching(isSearching) {
    state.isSearching = isSearching;
  },
};

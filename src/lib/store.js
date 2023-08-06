import Vue from 'vue';

const state = Vue.observable({
  isLoadingAllPokemons: false,
});

export default {
  get state() {
    return state;
  },

  clearPokemon() {
    state.pokemon = new Map();
  },
};

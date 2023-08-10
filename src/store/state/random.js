import Vue from 'vue';

const state = Vue.observable({
  pokemons: [],
});

export default {
  get state() {
    return state;
  },

  clearPokemons() {
    state.pokemons = [];
  },

  add(pokemon) {
    state.pokemons.push(pokemon);
  },

  popPokemon() {
    state.pokemons.pop();
  },

  unshift(pokemon) {
    state.pokemons.unshift(pokemon);
  },

  getPokemons() {
    return state.pokemons;
  },
};

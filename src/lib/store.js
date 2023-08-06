import Vue from 'vue';
import { getPokemon as getPokemonApi } from '@/api/pokemon';

const state = Vue.observable({
  isLoadingAllPokemons: false,
});

export default {
  get state() {
    return state;
  },

  async pokemonIsVariant(name) {
    return name.includes('-') && !!(await getPokemonApi(name.split('-')[0]));
  },

  clearPokemon() {
    state.pokemon = new Map();
  },
};

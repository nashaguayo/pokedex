import Vue from 'vue';
import {
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
} from '@api/pokemon';

const state = Vue.observable({
  allPokemons: [],
  pokemons: [],
});

export default {
  get state() {
    return state;
  },

  async getAllPokemons() {
    state.allPokemons = (await getAllPokemonsApi()).results;
  },

  async getPokemons(url) {
    state.pokemons = (await getPokemonsApi(url)).results;
  },
};

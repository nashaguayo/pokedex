import Vue from 'vue';
import {
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
} from '@api/pokemon';

const state = Vue.observable({
  allPokemons: [],
  pokemons: [],
  scroll: {
    previousUrl: '',
    nextUrl: '',
  },
});

export default {
  get state() {
    return state;
  },

  async getAllPokemons() {
    state.allPokemons = (await getAllPokemonsApi()).results;
  },

  async getPokemons(url) {
    const response = await getPokemonsApi(url);
    state.pokemons = response.results;
    state.scroll.previousUrl = response.previous;
    state.scroll.nextUrl = response.next;
  },
};

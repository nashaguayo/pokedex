import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getDataForPokemon as getDataForPokemonApi,
} from '@/api/pokemon';

const state = Vue.observable({
  isLoadingAllPokemons: false,
  isLoadingMorePokemons: false,
  scroll: {
    pokemons: [],
    nextUrl: '',
  },
});

export default {
  get state() {
    return state;
  },

  async getPokemonListCardData(pokemon) {
    const name = pokemon.name;
    const { id, image, types } = await getDataForPokemonApi(name);
    return { id, name, image, types };
  },

  async getPokemons(url, limit) {
    const response = await getPokemonsApi(url, limit);
    const results = await Promise.all(
      response.results.map((pokemon) => this.getPokemonListCardData(pokemon))
    );
    state.scroll.pokemons = results;
    state.scroll.nextUrl = response.next;
  },

  async getMorePokemons(limit) {
    if (state.isLoadingMorePokemons) {
      return;
    }

    state.isLoadingMorePokemons = true;
    const response = await getPokemonsApi(state.scroll.nextUrl, limit);
    if (!response) {
      return;
    }
    const results = await Promise.all(
      response.results.map((pokemon) => this.getPokemonListCardData(pokemon))
    );

    state.scroll.pokemons = [...state.scroll.pokemons, ...results];
    state.scroll.nextUrl = response.next;
    state.isLoadingMorePokemons = false;
  },

  async pokemonIsVariant(name) {
    return name.includes('-') && !!(await getPokemonApi(name.split('-')[0]));
  },

  clearPokemon() {
    state.pokemon = new Map();
  },

  async clearPokemonListAndRefresh() {
    state.scroll.pokemons = [];
    await this.getPokemons();
  },
};

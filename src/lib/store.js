import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
  getDataForPokemon as getDataForPokemonApi,
} from '@/api/pokemon';
import { setVariant } from '@/store/mutations/variations';

const state = Vue.observable({
  allPokemons: [],
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

  async getAllPokemons() {
    if (!state.allPokemons.length && !state.isLoadingAllPokemons) {
      state.isLoadingAllPokemons = true;
      const allPokemons = (await getAllPokemonsApi()).results;
      const allPokemonsWithHyphens = allPokemons.map((pokemon) => ({
        id: Number(
          pokemon.url
            .replace(process.env.VUE_APP_POKEAPI_URL, '')
            .replace('pokemon/', '')
            .replace('/', '')
        ),
        name: pokemon.name,
      }));

      const pokemons = [];
      const variations = [];
      await Promise.all(
        allPokemonsWithHyphens.map(async (pokemon) => {
          if (!pokemon.name.includes('-')) {
            pokemons.push(pokemon);
          } else if (await this.pokemonIsVariant(pokemon.name)) {
            variations.push(pokemon);
          } else {
            pokemons.push(pokemon);
          }
        })
      );

      pokemons.forEach((pokemon) => {
        const variantsForPokemon = variations.filter((v) =>
          v.name.includes(pokemon.name)
        );
        if (variantsForPokemon.length) {
          setVariant(
            pokemon.name,
            variantsForPokemon.map((p) => p.name)
          );
        }
      });

      state.allPokemons = pokemons;
      state.isLoadingAllPokemons = false;
    }
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

  getAllPokemonsReplace() {
    return state.allPokemons;
  },

  clearPokemon() {
    state.pokemon = new Map();
  },

  async clearPokemonListAndRefresh() {
    state.scroll.pokemons = [];
    await this.getPokemons();
  },
};

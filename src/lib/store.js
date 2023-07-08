import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
  getRandomPokemons as getRandomPokemonsApi,
} from '@api/pokemon';
import { isDarkModeEnabled } from '@lib/localStorage';
import { toggleDarkMode as toggleDarkModeInLocalStorage } from './localStorage';

const state = Vue.observable({
  allPokemons: [],
  randomPokemons: [],
  scroll: {
    pokemons: [],
    nextUrl: '',
  },
  pokemon: new Map(),
  isDarkModeEnabled: isDarkModeEnabled(),
  searchResults: [],
});

export default {
  get state() {
    return state;
  },

  async getAllPokemons() {
    if (state.allPokemons.length) {
      return;
    }
    state.allPokemons = (await getAllPokemonsApi()).results;
  },

  async getPokemons(url) {
    const response = await getPokemonsApi(url);
    state.scroll.pokemons = response.results;
    state.scroll.nextUrl = response.next;
  },

  async getMorePokemons() {
    const response = await getPokemonsApi(state.scroll.nextUrl);
    if (!response) {
      return;
    }

    state.scroll.pokemons = [...state.scroll.pokemons, ...response.results];
    state.scroll.nextUrl = response.next;
  },

  async getPokemon(pokemonId) {
    let pokemon;
    if (pokemon?.has(pokemonId)) {
      pokemon = pokemon.get(pokemonId);
    } else {
      pokemon = await getPokemonApi(pokemonId);
    }

    const stats = pokemon.stats.map((s) => {
      return { name: s.stat.name, value: s.base_stat };
    });
    const image = pokemon.sprites.other.dream_world.front_default;
    const types = pokemon.types.map((t) => t.type.name);
    const name = pokemon.name;
    const id = pokemon.id;
    state.pokemon.set(name, { id, name, image, stats, types });
    state.pokemon.set(id, { id, name, image, stats, types });
  },

  async getRandomPokemons(amountOfRandomPokemons) {
    const pokemons = await getRandomPokemonsApi(amountOfRandomPokemons);
    state.randomPokemons = [];
    for (let pokemon in pokemons) {
      state.randomPokemons.push(this.getPokemonData(pokemons[pokemon]));
    }
  },

  async getNewRandomPokemon() {
    const newPokemon = (await getRandomPokemonsApi(1))[0];
    state.randomPokemons.pop();
    state.randomPokemons.unshift(this.getPokemonData(newPokemon));
  },

  async searchPokemons(searchTerm) {
    if (!state.allPokemons.length) {
      const allPokemons = (await getAllPokemonsApi()).results;
      state.allPokemons = allPokemons.map((pokemon) => pokemon.name);
    }

    const results = [];
    state.allPokemons.forEach((pokemon) => {
      if (pokemon.includes(searchTerm)) {
        results.push(pokemon);
      }
    });
    state.searchResults = results;
  },

  getPokemonData(pokemon) {
    return { name: pokemon.name, image: pokemon.sprites.front_default };
  },

  toggleDarkMode() {
    state.isDarkModeEnabled = !state.isDarkModeEnabled;
    toggleDarkModeInLocalStorage();
  },
};

import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
  getRandomPokemons as getRandomPokemonsApi,
  getImageForPokemon as getImageForPokemonApi,
} from '@api/pokemon';
import { getPokemonEvolutions as getPokemonEvolutionsApi } from '@api/evolutions';
import { isDarkModeEnabled } from '@lib/localStorage';
import { toggleDarkMode as toggleDarkModeInLocalStorage } from './localStorage';

const state = Vue.observable({
  allPokemons: [],
  isLoadingAllPokemons: false,
  randomPokemons: [],
  scroll: {
    pokemons: [],
    nextUrl: '',
  },
  pokemon: new Map(),
  isDarkModeEnabled: isDarkModeEnabled(),
  searchResults: [],
  game: {
    image: '',
    name: '',
  },
});

export default {
  get state() {
    return state;
  },

  async getPokemons(url) {
    const response = await getPokemonsApi(url);
    const results = await Promise.all(
      response.results.map(async (pokemon) => {
        const name = pokemon.name;
        const image = await getImageForPokemonApi(name);
        return { name, image };
      })
    );
    state.scroll.pokemons = results;
    state.scroll.nextUrl = response.next;
  },

  async getAllPokemons() {
    if (!state.allPokemons.length || !state.isLoadingAllPokemons) {
      state.isLoadingAllPokemons = true;
      const allPokemons = (await getAllPokemonsApi()).results;
      const allPokemonNames = allPokemons.map((pokemon) => pokemon.name);
      state.allPokemons = allPokemonNames.filter(
        (pokemon) => !pokemon.includes('-')
      );
      state.isLoadingAllPokemons = false;
    }
  },

  async getMorePokemons() {
    const response = await getPokemonsApi(state.scroll.nextUrl);
    if (!response) {
      return;
    }
    const results = await Promise.all(
      response.results.map(async (pokemon) => {
        const name = pokemon.name;
        const image = await getImageForPokemonApi(name);
        return { name, image };
      })
    );

    state.scroll.pokemons = [...state.scroll.pokemons, ...results];
    state.scroll.nextUrl = response.next;
  },

  async getPokemon(pokemonId) {
    let pokemon;
    if (pokemon?.has(pokemonId)) {
      pokemon = pokemon.get(pokemonId);
    } else {
      pokemon = await getPokemonApi(pokemonId);
    }

    const evolutions = await getPokemonEvolutionsApi(pokemonId);
    const stats = pokemon.stats.map((s) => {
      return { name: s.stat.name, value: s.base_stat };
    });
    const image =
      pokemon.sprites.other.dream_world.front_default ??
      pokemon.sprites.front_default;
    const types = pokemon.types.map((t) => t.type.name);
    const name = pokemon.name;
    const id = pokemon.id;
    state.pokemon.set(name, { id, name, image, stats, types, evolutions });
    state.pokemon.set(id, { id, name, image, stats, types, evolutions });
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
    while (!state.allPokemons.length) {
      this.getAllPokemons();
    }
    const results = [];
    state.allPokemons.forEach((pokemon) => {
      if (pokemon.includes(searchTerm)) {
        results.push(pokemon);
      }
    });
    state.searchResults = results;
  },

  async clearSearchResults() {
    state.searchResults = [];
  },

  async getNewMysteryPokemon() {
    const newMysteryPokemon = (await getRandomPokemonsApi(1))[0];
    state.game.image = newMysteryPokemon.sprites.front_default;
    state.game.name = newMysteryPokemon.name;
  },

  getPokemonData(pokemon) {
    return { name: pokemon.name, image: pokemon.sprites.front_default };
  },

  toggleDarkMode() {
    state.isDarkModeEnabled = !state.isDarkModeEnabled;
    toggleDarkModeInLocalStorage();
  },
};

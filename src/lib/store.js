import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
  getRandomPokemons as getRandomPokemonsApi,
  getDataForPokemon as getDataForPokemonApi,
  getFlavorTextsForSpecies as getFlavorTextsForSpeciesApi,
} from '@/api/pokemon';
import { getPokemonEvolutions as getPokemonEvolutionsApi } from '@/api/evolutions';
import {
  getAllTypes as getAllTypesApi,
  getPokemonsByType as getPokemonsByTypeApi,
} from '@/api/types';
import { isDarkModeEnabled } from '@/lib/localStorage';
import { toggleDarkMode as toggleDarkModeInLocalStorage } from '@/lib/localStorage';

const state = Vue.observable({
  allPokemons: [],
  isLoadingAllPokemons: false,
  isLoadingMorePokemons: false,
  randomPokemons: [],
  scroll: {
    pokemons: [],
    nextUrl: '',
  },
  pokemon: new Map(),
  isDarkModeEnabled: isDarkModeEnabled(),
  game: {
    image: '',
    name: '',
  },
  search: {
    results: [],
    isSearchingPokemon: false,
    types: [],
  },
  allTypes: [],
  pokemonsByType: new Map(),
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

  async getPokemons(url) {
    const response = await getPokemonsApi(url);
    const results = await Promise.all(
      response.results.map(this.getPokemonListCardData)
    );
    state.scroll.pokemons = results;
    state.scroll.nextUrl = response.next;
  },

  async getAllPokemons() {
    if (!state.allPokemons.length && !state.isLoadingAllPokemons) {
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
    if (state.isLoadingMorePokemons) {
      return;
    }

    state.isLoadingMorePokemons = true;
    const response = await getPokemonsApi(state.scroll.nextUrl);
    if (!response) {
      return;
    }
    const results = await Promise.all(
      response.results.map(this.getPokemonListCardData)
    );

    state.scroll.pokemons = [...state.scroll.pokemons, ...results];
    state.scroll.nextUrl = response.next;
    state.isLoadingMorePokemons = false;
  },

  async getPokemon(pokemonId) {
    let pokemon;
    if (pokemon?.has(pokemonId)) {
      pokemon = pokemon.get(pokemonId);
    } else {
      pokemon = await getPokemonApi(pokemonId);
    }

    const evolutions = await getPokemonEvolutionsApi(pokemonId);
    const flavorTexts = pokemon.species.url
      ? await getFlavorTextsForSpeciesApi(pokemon.species.url)
      : [];
    const stats = pokemon.stats.map((s) => {
      return { name: s.stat.name, value: s.base_stat };
    });
    const image =
      pokemon.sprites.other.dream_world.front_default ??
      pokemon.sprites.front_default;
    const types = pokemon.types.map((t) => t.type.name);
    const name = pokemon.name;
    const id = pokemon.id;
    state.pokemon.set(name, {
      id,
      name,
      image,
      stats,
      types,
      evolutions,
      flavorTexts,
    });
    state.pokemon.set(id, {
      id,
      name,
      image,
      stats,
      types,
      evolutions,
      flavorTexts,
    });
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
    if (state.search.isSearchingPokemon) {
      return;
    }

    if (!state.allPokemons.length || !state.pokemonsByType.size) {
      return;
    }

    state.search.isSearchingPokemon = true;

    if (state.search.types.length) {
      state.search.types.forEach((type) => {
        state.search.results = [
          ...new Set(
            state.pokemonsByType
              .get(type)
              .filter((pokemon) => pokemon.includes(searchTerm))
          ),
        ];
      });
      state.search.isSearchingPokemon = false;
      return;
    }

    state.search.results = state.allPokemons.filter((pokemon) =>
      pokemon.includes(searchTerm)
    );
    state.search.isSearchingPokemon = false;
  },

  clearSearchResults() {
    state.search.results = [];
  },

  async getNewMysteryPokemon() {
    const newMysteryPokemon = (await getRandomPokemonsApi(1))[0];
    state.game.image = newMysteryPokemon.sprites.front_default;
    state.game.name = newMysteryPokemon.name;
  },

  async getAllTypes() {
    state.allTypes = await getAllTypesApi();
    await Promise.all(
      state.allTypes.map(async (type) => {
        const pokemons = await getPokemonsByTypeApi(type);
        const filteredPokemonNames = pokemons.filter(
          (pokemon) => !pokemon.includes('-')
        );
        state.pokemonsByType.set(type, filteredPokemonNames);
      })
    );
  },

  async toggleTypeFilter(type) {
    if (state.search.types.includes(type)) {
      const index = state.search.types.findIndex((t) => type === t);
      state.search.types.splice(index, 1);
      return;
    }
    state.search.types.push(type);
  },

  clearFilters() {
    state.search.types = [];
  },

  getPokemonData(pokemon) {
    return { name: pokemon.name, image: pokemon.sprites.front_default };
  },

  toggleDarkMode() {
    state.isDarkModeEnabled = !state.isDarkModeEnabled;
    toggleDarkModeInLocalStorage();
  },
};

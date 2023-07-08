import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
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
  pokemon: new Map(),
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
    state.pokemons = response.results;
    state.scroll.previousUrl = response.previous;
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
};

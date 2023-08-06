import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
  getDataForPokemon as getDataForPokemonApi,
  getSpeciesData as getSpeciesDataApi,
} from '@/api/pokemon';
import { getPokemonEvolutions as getPokemonEvolutionsApi } from '@/api/evolutions';
import { getPokemonColorTranslation as getPokemonColorTranslationApi } from '@/api/colors';
import { getPokemonShapeTranslation as getPokemonShapeTranslationApi } from '@/api/shapes';
import { getPokemonHabitatTranslation as getPokemonHabitatTranslationApi } from '@/api/habitat';
import { getPokemonStatTranslation as getPokemonStatTranslationApi } from '@/api/stats';
import { getPokemonTypeTranslation as getPokemonTypeTranslationApi } from '@/api/types';
import { getAllCharacteristics } from '@/store/mutations/characteristics';
import { getPokemonVariants, setVariant } from '@/store/mutations/variations';

const state = Vue.observable({
  allPokemons: [],
  isLoadingAllPokemons: false,
  isLoadingMorePokemons: false,
  scroll: {
    pokemons: [],
    nextUrl: '',
  },
  pokemon: new Map(),
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

  async getPokemon(pokemonId) {
    if (state.pokemon?.has(pokemonId)) {
      return;
    }

    const pokemon = await getPokemonApi(pokemonId);

    const evolutions = await getPokemonEvolutionsApi(pokemonId);
    const { flavorTexts, color, shape, generation, habitat } = pokemon.species
      .url
      ? await getSpeciesDataApi(pokemon.species.url)
      : [];
    let highestStatName = '';
    let highestStatValue = 0;
    const stats = await Promise.all(
      pokemon.stats.map(async (s) => {
        if (s.base_stat > highestStatValue) {
          highestStatName = s.stat.name;
          highestStatValue = s.base_stat;
        }
        return {
          name: await getPokemonStatTranslationApi(s.stat.name),
          value: s.base_stat,
        };
      })
    );
    let characteristic = '';
    (getAllCharacteristics().get(highestStatName) ?? []).map((c) => {
      if (c.possibleValues.includes(Math.floor(highestStatValue / 5))) {
        characteristic = c.description;
      }
    });
    const variants = [];
    await Promise.all(
      getPokemonVariants(pokemonId)?.map(async (pokemon) => {
        const { name, sprites } = await getPokemonApi(pokemon);
        if (sprites.front_default) {
          variants.push({
            name: name.replace(`${pokemonId}-`, '').replace('-', ' '),
            image: sprites.front_default,
          });
        }
      }) ?? []
    );
    const image = pokemon.sprites.other.dream_world.front_default;
    const smallImage = pokemon.sprites.front_default;
    const types = await Promise.all(
      pokemon.types.map(async (t) => ({
        name: t.type.name,
        translated: await getPokemonTypeTranslationApi(t.type.name),
      }))
    );
    const name = pokemon.name;
    const id = pokemon.id;
    const height = pokemon.height;
    const weight = pokemon.weight;

    state.pokemon.set(name, {
      id,
      name,
      image,
      smallImage,
      stats,
      types,
      evolutions,
      flavorTexts,
      characteristic,
      height,
      weight,
      color: {
        name: color,
        translated: await getPokemonColorTranslationApi(color),
      },
      shape: await getPokemonShapeTranslationApi(shape),
      generation,
      habitat: {
        name: habitat,
        translated: await getPokemonHabitatTranslationApi(habitat),
      },
      variants,
    });
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

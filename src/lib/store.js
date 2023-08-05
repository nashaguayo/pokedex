import Vue from 'vue';
import {
  getPokemon as getPokemonApi,
  getPokemons as getPokemonsApi,
  getAllPokemons as getAllPokemonsApi,
  getDataForPokemon as getDataForPokemonApi,
  getSpeciesData as getSpeciesDataApi,
} from '@/api/pokemon';
import { getPokemonEvolutions as getPokemonEvolutionsApi } from '@/api/evolutions';
import {
  getAllTypes as getAllTypesApi,
  getPokemonsByType as getPokemonsByTypeApi,
} from '@/api/types';
import {
  getAllColors as getAllColorsApi,
  getPokemonsByColor as getPokemonsByColorApi,
  getPokemonColorTranslation as getPokemonColorTranslationApi,
} from '@/api/colors';
import {
  getAllShapes as getAllShapesApi,
  getPokemonsByShape as getPokemonsByShapeApi,
  getPokemonShapeTranslation as getPokemonShapeTranslationApi,
} from '@/api/shapes';
import { getAllCharacteristicsDescriptions as getAllCharacteristicsDescriptionsApi } from '@/api/characteristics';
import { getPokemonHabitatTranslation as getPokemonHabitatTranslationApi } from '@/api/habitat';
import { getPokemonStatTranslation as getPokemonStatTranslationApi } from '@/api/stats';
import { getPokemonTypeTranslation as getPokemonTypeTranslationApi } from '@/api/types';
import { clearFilters as clearFilters } from '@/store/mutations/generations';

const state = Vue.observable({
  allPokemons: [],
  pokemonVariants: new Map(),
  isLoadingAllPokemons: false,
  isLoadingMorePokemons: false,
  randomPokemons: [],
  scroll: {
    pokemons: [],
    nextUrl: '',
  },
  pokemon: new Map(),
  search: {
    results: [],
    isSearchingPokemon: false,
    types: [],
    color: '',
    shape: '',
  },
  allTypes: [],
  pokemonsByType: new Map(),
  allColors: [],
  pokemonsByColor: new Map(),
  allShapes: [],
  pokemonsByShape: new Map(),
  allCharacteristics: new Map(),
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
          state.pokemonVariants.set(
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
    (state.allCharacteristics.get(highestStatName) ?? []).map((c) => {
      if (c.possibleValues.includes(Math.floor(highestStatValue / 5))) {
        characteristic = c.description;
      }
    });
    const variants = [];
    await Promise.all(
      state.pokemonVariants.get(pokemonId)?.map(async (pokemon) => {
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

  async getRandomPokemons(amountOfRandomPokemons) {
    state.randomPokemons = [];
    await Promise.all(
      [...Array(amountOfRandomPokemons)].map(async () => {
        state.randomPokemons.push(await this.getNewRandomPokemon());
      })
    );
  },

  async getNewRandomPokemon(addToRandomPokemon = false) {
    let newRandomPokemon = {};
    do {
      const index = Math.floor(Math.random() * state.allPokemons.length);
      const name = state.allPokemons[index].name;
      const { image } = await getDataForPokemonApi(name);
      newRandomPokemon = { name, image };
    } while (
      this.pokemonIsAlreadyInRandomPokemons(newRandomPokemon.name) ||
      !newRandomPokemon.image
    );

    if (addToRandomPokemon) {
      state.randomPokemons.pop();
      state.randomPokemons.unshift(newRandomPokemon);
      return;
    }

    return newRandomPokemon;
  },

  pokemonIsAlreadyInRandomPokemons(pokemonName) {
    const repeatedPokemon = state.randomPokemons.filter(
      (randomPokemon) => randomPokemon.name === pokemonName
    );
    return !!repeatedPokemon.length;
  },

  async searchPokemons(searchTerm) {
    if (
      state.search.isSearchingPokemon ||
      !state.allPokemons.length ||
      !state.pokemonsByType.size ||
      !state.pokemonsByColor.size ||
      !state.pokemonsByShape.size ||
      !state.pokemonsByGeneration.size
    ) {
      return;
    }

    state.search.isSearchingPokemon = true;
    const searchTermLowerCase = searchTerm.toLowerCase();

    if (state.search.types.length) {
      this.searchPokemonsByType(searchTermLowerCase);
    } else if (state.search.color.length) {
      this.searchPokemonsByColor(searchTermLowerCase);
    } else if (state.search.shape.length) {
      this.searchPokemonsByShape(searchTermLowerCase);
    } else if (generation.state.filter.length) {
      this.searchPokemonsByGeneration(searchTermLowerCase);
    } else {
      this.searchPokemonJustByTerm(searchTermLowerCase);
    }

    state.search.isSearchingPokemon = false;
  },

  searchPokemonJustByTerm(searchTermLowerCase) {
    const results = state.allPokemons.filter((pokemon) =>
      pokemon.name.includes(searchTermLowerCase)
    );
    state.search.results = results.map((pokemon) => pokemon.name);
  },

  searchPokemonsByType(searchTermLowerCase) {
    let repeatedResults = [];
    state.search.types.forEach((type) => {
      const filteredPokemonNamesByType = state.pokemonsByType
        .get(type)
        .filter((pokemon) => pokemon.includes(searchTermLowerCase));
      repeatedResults = [...repeatedResults, ...filteredPokemonNamesByType];
    });

    if (state.search.types.length === 1) {
      state.search.isSearchingPokemon = false;
      state.search.results = repeatedResults;
      return;
    }

    const namesCount = {};
    repeatedResults.forEach(function (name) {
      namesCount[name] = (namesCount[name] ?? 0) + 1;
    });

    const results = Object.entries(namesCount).filter(
      (nameCount) => nameCount[1] === state.search.types.length
    );

    state.search.results = results.map((nameCount) => nameCount[0]);
  },

  searchPokemonsByColor(searchTermLowerCase) {
    const filteredPokemonNamesByColor = state.pokemonsByColor
      .get(state.search.color)
      .filter((pokemon) => pokemon.includes(searchTermLowerCase));

    state.search.isSearchingPokemon = false;
    state.search.results = filteredPokemonNamesByColor;
  },

  searchPokemonsByShape(searchTermLowerCase) {
    const filteredPokemonNamesByShape = state.pokemonsByShape
      .get(state.search.shape)
      .filter((pokemon) => pokemon.includes(searchTermLowerCase));

    state.search.isSearchingPokemon = false;
    state.search.results = filteredPokemonNamesByShape;
  },

  searchPokemonsByGeneration(searchTermLowerCase) {
    const filteredPokemonNamesByGeneration = state.pokemonsByGeneration
      .get(generation.state.filter)
      .filter((pokemon) => pokemon.includes(searchTermLowerCase));

    state.search.isSearchingPokemon = false;
    state.search.results = filteredPokemonNamesByGeneration;
  },

  clearSearchResults() {
    state.search.results = [];
  },

  setNewMysteryPokemon(newMysteryPokemon) {
    state.game = newMysteryPokemon;
  },

  async getAllTypes() {
    const allTypes = await getAllTypesApi();
    state.allTypes = allTypes;
    await Promise.all(
      allTypes.map(async (type) => {
        const { name, pokemons } = await getPokemonsByTypeApi(type);
        if (pokemons.length) {
          state.pokemonsByType.set(name, pokemons);
          const index = state.allTypes.findIndex((t) => t === type);
          state.allTypes[index] = name;
          return;
        }
        const index = state.allTypes.findIndex((t) => t === type);
        state.allTypes.splice(index, 1);
      })
    );
  },

  async getAllColors() {
    const allColors = await getAllColorsApi();
    state.allColors = allColors;
    await Promise.all(
      allColors.map(async (color) => {
        const { name, pokemons } = await getPokemonsByColorApi(color);
        if (pokemons.length) {
          state.pokemonsByColor.set(name, pokemons);
          const index = state.allColors.findIndex((c) => c === color);
          state.allColors[index] = name;
          return;
        }
        const index = state.allColors.findIndex((c) => c === color);
        state.allColors.splice(index, 1);
      })
    );
  },

  async getAllShapes() {
    const allShapes = await getAllShapesApi();
    state.allShapes = allShapes;
    await Promise.all(
      allShapes.map(async (shape) => {
        const { name, pokemons } = await getPokemonsByShapeApi(shape);
        if (pokemons.length) {
          state.pokemonsByShape.set(name, pokemons);
          const index = state.allShapes.findIndex((s) => s === shape);
          state.allShapes[index] = name;
          return;
        }
        const index = state.allShapes.findIndex((s) => s === shape);
        state.allShapes.splice(index, 1);
      })
    );
  },

  toggleTypeFilter(type) {
    if (state.search.types.includes(type)) {
      const index = state.search.types.findIndex((t) => type === t);
      state.search.types.splice(index, 1);
      return;
    }
    state.search.types.push(type);
  },

  toggleColorFilter(color) {
    state.search.color = color;
  },

  toggleShapeFilter(shape) {
    state.search.shape = shape;
  },

  async getAllCharacteristicsDescriptions() {
    state.allCharacteristics = await getAllCharacteristicsDescriptionsApi();
  },

  clearFilters() {
    this.clearTypeFilters();
    this.clearColorFilters();
    this.clearShapeFilters();
    clearFilters();
  },

  clearTypeFilters() {
    state.search.types = [];
  },

  clearColorFilters() {
    state.search.color = '';
  },

  clearShapeFilters() {
    state.search.shape = '';
  },

  clearPokemon() {
    state.pokemon = new Map();
  },

  async clearPokemonListAndRefresh() {
    state.scroll.pokemons = [];
    await this.getPokemons();
  },
};

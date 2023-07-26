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
} from '@/api/colors';
import {
  getAllShapes as getAllShapesApi,
  getPokemonsByShape as getPokemonsByShapeApi,
} from '@/api/shapes';
import {
  getAllGenerations as getAllGenerationsApi,
  getPokemonsByGeneration as getPokemonsByGenerationApi,
} from '@/api/generations';
import { getAllCharacteristicsDescriptions as getAllCharacteristicsDescriptionsApi } from '@/api/characteristics';
import {
  isDarkModeEnabled,
  toggleDarkMode as toggleDarkModeInLocalStorage,
} from '@/lib/localStorage';

const state = Vue.observable({
  storeHasLoaded: false,
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
    color: '',
    shape: '',
    generation: '',
  },
  allTypes: [],
  pokemonsByType: new Map(),
  allColors: [],
  pokemonsByColor: new Map(),
  allShapes: [],
  pokemonsByShape: new Map(),
  allGenerations: [],
  pokemonsByGeneration: new Map(),
  allCharacteristics: new Map(),
});

export default {
  get state() {
    return state;
  },

  async initializeStore() {
    await Promise.all([
      this.getAllPokemons(),
      this.getAllTypes(),
      this.getAllColors(),
      this.getAllShapes(),
      this.getAllGenerations(),
      this.getAllCharacteristicsDescriptions(),
    ]);
    state.storeHasLoaded = true;
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
      state.allPokemons = allPokemons.map((pokemon) => ({
        id: Number(
          pokemon.url
            .replace(process.env.VUE_APP_POKEAPI_URL, '')
            .replace('pokemon/', '')
            .replace('/', '')
        ),
        name: pokemon.name,
      }));
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
    const { flavorTexts, color, shape, generation, habitat } = pokemon.species
      .url
      ? await getSpeciesDataApi(pokemon.species.url)
      : [];
    let highestStatName = '';
    let highestStatValue = 0;
    const stats = pokemon.stats.map((s) => {
      if (s.base_stat > highestStatValue) {
        highestStatName = s.stat.name;
        highestStatValue = s.base_stat;
      }
      return { name: s.stat.name, value: s.base_stat };
    });
    let characteristic = '';
    (state.allCharacteristics.get(highestStatName) ?? []).map((c) => {
      if (c.possibleValues.includes(Math.floor(highestStatValue / 5))) {
        characteristic = c.description;
      }
    });
    const image = pokemon.sprites.other.dream_world.front_default;
    const smallImage = pokemon.sprites.front_default;
    const types = pokemon.types.map((t) => t.type.name);
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
      color,
      shape,
      generation,
      habitat,
    });
  },

  async getRandomPokemons(amountOfRandomPokemons) {
    state.randomPokemons = [];
    [...Array(amountOfRandomPokemons)].forEach(async () =>
      state.randomPokemons.push(await this.getNewRandomPokemon())
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
      !state.pokemonsByShape.size
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
    } else if (state.search.generation.length) {
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
      .get(state.search.generation)
      .filter((pokemon) => pokemon.includes(searchTermLowerCase));

    state.search.isSearchingPokemon = false;
    state.search.results = filteredPokemonNamesByGeneration;
  },

  clearSearchResults() {
    state.search.results = [];
  },

  async getNewMysteryPokemon() {
    const newMysteryPokemon = await this.getNewRandomPokemon();
    state.game = newMysteryPokemon;
  },

  async getAllTypes() {
    const allTypes = await getAllTypesApi();
    state.allTypes = allTypes;
    await Promise.all(
      allTypes.map(async (type) => {
        const pokemons = await getPokemonsByTypeApi(type);
        if (pokemons.length) {
          state.pokemonsByType.set(type, pokemons);
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
        const pokemons = await getPokemonsByColorApi(color);
        if (pokemons.length) {
          state.pokemonsByColor.set(color, pokemons);
          return;
        }
        const index = state.allColors.findIndex((t) => t === color);
        state.allColors.splice(index, 1);
      })
    );
  },

  async getAllShapes() {
    const allShapes = await getAllShapesApi();
    state.allShapes = allShapes;
    await Promise.all(
      allShapes.map(async (shape) => {
        const pokemons = await getPokemonsByShapeApi(shape);
        if (pokemons.length) {
          state.pokemonsByShape.set(shape, pokemons);
          return;
        }
        const index = state.allShapes.findIndex((s) => s === shape);
        state.allShapes.splice(index, 1);
      })
    );
  },

  async getAllGenerations() {
    const allGenerations = await getAllGenerationsApi();
    state.allGenerations = allGenerations;
    await Promise.all(
      allGenerations.map(async (generation) => {
        const pokemons = await getPokemonsByGenerationApi(generation);
        if (pokemons.length) {
          state.pokemonsByGeneration.set(generation, pokemons);
          return;
        }
        const index = state.allGenerations.findIndex((g) => g === generation);
        state.allGenerations.splice(index, 1);
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

  toggleGenerationFilter(generation) {
    state.search.generation = generation;
  },

  async getAllCharacteristicsDescriptions() {
    state.allCharacteristics = await getAllCharacteristicsDescriptionsApi();
  },

  clearFilters() {
    this.clearTypeFilters();
    this.clearColorFilters();
    this.clearShapeFilters();
    this.clearGenerationFilters();
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

  clearGenerationFilters() {
    state.search.generation = '';
  },

  toggleDarkMode() {
    state.isDarkModeEnabled = !state.isDarkModeEnabled;
    toggleDarkModeInLocalStorage();
  },
};

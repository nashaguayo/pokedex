import {
  clearFilters as clearFiltersGenerations,
  getPokemonsSize as getPokemonsSizeGeneration,
  searchPokemonsByGeneration,
  thereIsAFilterActive as thereIsAGenerationFilterActive,
} from '@/store/mutations/generations';
import {
  clearFilters as clearFiltersShape,
  getPokemonsSize as getPokemonsSizeShape,
  searchPokemonsByShape,
  thereIsAFilterActive as thereIsAShapeFilterActive,
} from '@/store/mutations/shapes';
import {
  clearFilters as clearFilterColor,
  getPokemonsSize as getPokemonsSizeColor,
  searchPokemonsByColor,
  thereIsAFilterActive as thereIsAColorFilterActive,
} from '@/store/mutations/colors';
import {
  searchPokemonsByTypes,
  getPokemonsSize as getPokemonsSizeTypes,
  clearFilters as clearTypeFilters,
  getAmountOfFilters as getAmountOfFiltersTypes,
} from '@/store/mutations/types';
import store from '@/lib/store';
import search from '@/store/state/search';

export async function searchPokemons(searchTerm) {
  if (
    search.getIsSearching() ||
    !state.allPokemons.length ||
    !getPokemonsSizeTypes() ||
    !getPokemonsSizeColor() ||
    !getPokemonsSizeShape() ||
    !getPokemonsSizeGeneration()
  ) {
    return;
  }

  search.setIsSearching(true);
  const searchTermLowerCase = searchTerm.toLowerCase();

  if (getAmountOfFiltersTypes()) {
    searchByTypes(searchTermLowerCase);
  } else if (thereIsAColorFilterActive()) {
    searchByColor(searchTermLowerCase);
  } else if (thereIsAShapeFilterActive()) {
    searchByShape(searchTermLowerCase);
  } else if (thereIsAGenerationFilterActive()) {
    searchByGeneration(searchTermLowerCase);
  } else {
    searchJustByTerm(searchTermLowerCase);
  }

  search.setIsSearching(false);
}

function searchJustByTerm(searchTermLowerCase) {
  const results = store
    .getAllPokemonsReplace()
    .filter((pokemon) => pokemon.name.includes(searchTermLowerCase));
  search.setResults(results.map((pokemon) => pokemon.name));
}

function searchByTypes(searchTermLowerCase) {
  search.setResults(searchPokemonsByTypes(searchTermLowerCase));
}

function searchByColor(searchTermLowerCase) {
  search.setResults(searchPokemonsByColor(searchTermLowerCase));
}

function searchByShape(searchTermLowerCase) {
  search.setResults(searchPokemonsByShape(searchTermLowerCase));
}

function searchByGeneration(searchTermLowerCase) {
  search.setResults(searchPokemonsByGeneration(searchTermLowerCase));
}

export function clearSearchResults() {
  search.setResults([]);
}

export function clearFilters() {
  clearTypeFilters();
  clearFilterColor();
  clearFiltersShape();
  clearFiltersGenerations();
}

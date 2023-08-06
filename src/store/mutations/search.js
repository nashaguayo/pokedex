import {
  clearFilters as clearFiltersGenerations,
  searchPokemonsByGeneration,
  thereIsAFilterActive as thereIsAGenerationFilterActive,
} from '@/store/mutations/generations';
import {
  clearFilters as clearFiltersShape,
  searchPokemonsByShape,
  thereIsAFilterActive as thereIsAShapeFilterActive,
} from '@/store/mutations/shapes';
import {
  clearFilters as clearFilterColor,
  searchPokemonsByColor,
  thereIsAFilterActive as thereIsAColorFilterActive,
} from '@/store/mutations/colors';
import {
  searchPokemonsByTypes,
  clearFilters as clearFiltersType,
  getAmountOfFilters as getAmountOfFiltersTypes,
} from '@/store/mutations/types';
import store from '@/lib/store';
import search from '@/store/state/search';

export function searchPokemons(searchTerm) {
  if (search.getIsSearching()) {
    return;
  }

  search.setIsSearching(true);
  const searchTermLowerCase = searchTerm.toLowerCase();

  if (getAmountOfFiltersTypes()) {
    search.setResults(searchPokemonsByTypes(searchTermLowerCase));
  } else if (thereIsAColorFilterActive()) {
    search.setResults(searchPokemonsByColor(searchTermLowerCase));
  } else if (thereIsAShapeFilterActive()) {
    search.setResults(searchPokemonsByShape(searchTermLowerCase));
  } else if (thereIsAGenerationFilterActive()) {
    search.setResults(searchPokemonsByGeneration(searchTermLowerCase));
  } else {
    const results = store
      .getAllPokemonsReplace()
      .filter((pokemon) => pokemon.name.includes(searchTermLowerCase));
    search.setResults(results.map((pokemon) => pokemon.name));
  }

  search.setIsSearching(false);
}

export function clearSearchResults() {
  search.setResults([]);
}

export function clearFilters() {
  clearFiltersType();
  clearFilterColor();
  clearFiltersShape();
  clearFiltersGenerations();
}

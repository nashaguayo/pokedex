import { searchPokemons } from '@/store/mutations/search';
import * as generations from '@/store/mutations/generations';
import * as shapes from '@/store/mutations/shapes';
import * as colors from '@/store/mutations/colors';
import * as types from '@/store/mutations/types';
import store from '@/lib/store';
import search from '@/store/state/search';

jest.mock('@/store/state/search', () => ({
  getIsSearching: jest.fn(),
  setIsSearching: jest.fn(),
  setResults: jest.fn(),
}));

jest.mock('@/store/mutations/types', () => ({
  getAmountOfFilters: jest.fn(),
  searchPokemonsByTypes: jest.fn(),
}));

jest.mock('@/store/mutations/colors', () => ({
  thereIsAFilterActive: jest.fn(),
  searchPokemonsByColor: jest.fn(),
}));

jest.mock('@/store/mutations/shapes', () => ({
  thereIsAFilterActive: jest.fn(),
  searchPokemonsByShape: jest.fn(),
}));

jest.mock('@/store/mutations/generations', () => ({
  thereIsAFilterActive: jest.fn(),
  searchPokemonsByGeneration: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  getAllPokemonsReplace: jest.fn(),
}));

const spyGetIsSearching = jest.spyOn(search, 'getIsSearching');
const spySetIsSearching = jest.spyOn(search, 'setIsSearching');
const spySetResults = jest.spyOn(search, 'setResults');

const spyGetAmountOfFiltersTypes = jest.spyOn(types, 'getAmountOfFilters');
const spySearchPokemonsByTypes = jest.spyOn(types, 'searchPokemonsByTypes');
const spyThereIsAColorFilterActive = jest.spyOn(colors, 'thereIsAFilterActive');
const spySearchPokemonsByColor = jest.spyOn(colors, 'searchPokemonsByColor');
const spyThereIsAShapeFilterActive = jest.spyOn(shapes, 'thereIsAFilterActive');
const spySearchPokemonsByShape = jest.spyOn(shapes, 'searchPokemonsByShape');
const spyThereIsAGenerationFilterActive = jest.spyOn(
  generations,
  'thereIsAFilterActive'
);
const spySearchPokemonsByGeneration = jest.spyOn(
  generations,
  'searchPokemonsByGeneration'
);

const spyGetAllPokemonsReplace = jest.spyOn(store, 'getAllPokemonsReplace');

describe('searchPokemons', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should not search when theres already a search underway', () => {
    spyGetIsSearching.mockReturnValue(true);
    searchPokemons('pikachu');
    expect(spyGetIsSearching).toHaveBeenCalled();
    expect(spySetIsSearching).not.toHaveBeenCalled();
  });

  it('should search pokemons just by term', () => {
    spyGetIsSearching.mockReturnValue(false);
    spyGetAllPokemonsReplace.mockReturnValue([
      { name: 'pikachu' },
      { name: 'charmander' },
      { name: 'squirtle' },
    ]);
    searchPokemons('PIK');
    expect(spySetIsSearching).toHaveBeenCalledTimes(2);
    expect(spySetIsSearching.mock.calls[0][0]).toBeTruthy();
    expect(spySetIsSearching.mock.calls[1][0]).toBeFalsy();
    expect(spyGetAmountOfFiltersTypes).toHaveBeenCalled();
    expect(spySearchPokemonsByTypes).not.toHaveBeenCalled();
    expect(spyThereIsAColorFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spyThereIsAShapeFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spyThereIsAGenerationFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySetResults).toHaveBeenCalledWith(['pikachu']);
  });

  it('should search pokemons by types filter', () => {
    spyGetIsSearching.mockReturnValue(false);
    spySearchPokemonsByTypes.mockReturnValue(['pikachu']);
    spyGetAmountOfFiltersTypes.mockReturnValue(1);
    searchPokemons('PIK');
    expect(spySetIsSearching).toHaveBeenCalledTimes(2);
    expect(spySetIsSearching.mock.calls[0][0]).toBeTruthy();
    expect(spySetIsSearching.mock.calls[1][0]).toBeFalsy();
    expect(spyGetAmountOfFiltersTypes).toHaveBeenCalled();
    expect(spySearchPokemonsByTypes).toHaveBeenCalled();
    expect(spyThereIsAColorFilterActive).not.toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySetResults).toHaveBeenCalledWith(['pikachu']);
  });

  it('should search pokemons by colors', () => {
    spyGetIsSearching.mockReturnValue(false);
    spySearchPokemonsByColor.mockReturnValue(['pikachu']);
    spyGetAmountOfFiltersTypes.mockReturnValue(0);
    spyThereIsAColorFilterActive.mockReturnValue(true);
    searchPokemons('PIK');
    expect(spySetIsSearching).toHaveBeenCalledTimes(2);
    expect(spySetIsSearching.mock.calls[0][0]).toBeTruthy();
    expect(spySetIsSearching.mock.calls[1][0]).toBeFalsy();
    expect(spyGetAmountOfFiltersTypes).toHaveBeenCalled();
    expect(spySearchPokemonsByTypes).not.toHaveBeenCalled();
    expect(spyThereIsAColorFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByColor).toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySetResults).toHaveBeenCalledWith(['pikachu']);
  });

  it('should search pokemons by shapes', () => {
    spyGetIsSearching.mockReturnValue(false);
    spySearchPokemonsByShape.mockReturnValue(['pikachu']);
    spyGetAmountOfFiltersTypes.mockReturnValue(0);
    spyThereIsAColorFilterActive.mockReturnValue(false);
    spyThereIsAShapeFilterActive.mockReturnValue(true);
    searchPokemons('PIK');
    expect(spySetIsSearching).toHaveBeenCalledTimes(2);
    expect(spySetIsSearching.mock.calls[0][0]).toBeTruthy();
    expect(spySetIsSearching.mock.calls[1][0]).toBeFalsy();
    expect(spyGetAmountOfFiltersTypes).toHaveBeenCalled();
    expect(spySearchPokemonsByTypes).not.toHaveBeenCalled();
    expect(spyThereIsAColorFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spyThereIsAShapeFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByShape).toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).not.toHaveBeenCalled();
    expect(spySetResults).toHaveBeenCalledWith(['pikachu']);
  });

  it('should search pokemons by generations', () => {
    spyGetIsSearching.mockReturnValue(false);
    spySearchPokemonsByGeneration.mockReturnValue(['pikachu']);
    spyGetAmountOfFiltersTypes.mockReturnValue(0);
    spyThereIsAColorFilterActive.mockReturnValue(false);
    spyThereIsAShapeFilterActive.mockReturnValue(false);
    spyThereIsAGenerationFilterActive.mockReturnValue(true);
    searchPokemons('PIK');
    expect(spySetIsSearching).toHaveBeenCalledTimes(2);
    expect(spySetIsSearching.mock.calls[0][0]).toBeTruthy();
    expect(spySetIsSearching.mock.calls[1][0]).toBeFalsy();
    expect(spyGetAmountOfFiltersTypes).toHaveBeenCalled();
    expect(spySearchPokemonsByTypes).not.toHaveBeenCalled();
    expect(spyThereIsAColorFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByColor).not.toHaveBeenCalled();
    expect(spyThereIsAShapeFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByShape).not.toHaveBeenCalled();
    expect(spyThereIsAGenerationFilterActive).toHaveBeenCalled();
    expect(spySearchPokemonsByGeneration).toHaveBeenCalled();
    expect(spySetResults).toHaveBeenCalledWith(['pikachu']);
  });
});

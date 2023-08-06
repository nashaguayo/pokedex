import {
  clearFilters,
  getAll,
  getPokemonsSize,
  searchPokemonsByTypes,
  toggleFilter,
} from '@/store/mutations/types';
import types from '@/store/state/types';
import * as typesApi from '@/api/types';

jest.mock('@/store/state/types', () => ({
  getFilters: jest.fn(),
  addFilter: jest.fn(),
  removeFilter: jest.fn(),
  clearFilters: jest.fn(),
  setAll: jest.fn(),
  setPokemonsByType: jest.fn(),
  replaceTranslation: jest.fn(),
  remove: jest.fn(),
  getPokemons: jest.fn(),
}));

jest.mock('@/api/types', () => ({
  getAllTypes: jest.fn(),
  getPokemonsByType: jest.fn(),
}));

const spyGetFilters = jest.spyOn(types, 'getFilters');
const spyAddFilter = jest.spyOn(types, 'addFilter');
const spyRemoveFilter = jest.spyOn(types, 'removeFilter');
const spyClearFilters = jest.spyOn(types, 'clearFilters');
const spySetAll = jest.spyOn(types, 'setAll');
const spySetPokemonsByType = jest.spyOn(types, 'setPokemonsByType');
const spyReplaceTranslation = jest.spyOn(types, 'replaceTranslation');
const spyRemove = jest.spyOn(types, 'remove');
const spyGetPokemons = jest.spyOn(types, 'getPokemons');

const spyGetAllTypes = jest.spyOn(typesApi, 'getAllTypes');
const spyGetPokemonsByType = jest.spyOn(typesApi, 'getPokemonsByType');

describe('toggleFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should turn off the filter if its already present', () => {
    const types = ['grass', 'poison'];
    spyGetFilters.mockReturnValue(types);
    toggleFilter('grass');
    expect(spyGetFilters).toHaveBeenCalled();
    expect(spyRemoveFilter).toHaveBeenCalled();
    expect(spyAddFilter).not.toHaveBeenCalled();
  });

  it('should add filter if its not present', () => {
    const types = ['grass', 'poison'];
    spyGetFilters.mockReturnValue(types);
    toggleFilter('normal');
    expect(spyGetFilters).toHaveBeenCalled();
    expect(spyRemoveFilter).not.toHaveBeenCalled();
    expect(spyAddFilter).toHaveBeenCalledWith('normal');
  });
});

describe('clearFilters', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should clear filters in store', () => {
    expect(spyClearFilters).not.toHaveBeenCalled();
    clearFilters();
    expect(spyClearFilters).toHaveBeenCalled();
  });
});

describe('getAll', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get all pokemons by type', async () => {
    const types = ['grass', 'normal', 'poison'];
    const pokemons1 = ['pikachu', 'charmander', 'squirtle'];
    const pokemons2 = [];
    const pokemons3 = ['charizard', 'bulbasaur', 'jigglypuff'];
    spyGetAllTypes.mockResolvedValue(types);
    spyGetPokemonsByType
      .mockResolvedValueOnce({
        name: types[0],
        pokemons: pokemons1,
      })
      .mockResolvedValueOnce({
        name: types[1],
        pokemons: pokemons2,
      })
      .mockResolvedValueOnce({
        name: types[2],
        pokemons: pokemons3,
      });
    await getAll();
    expect(spyGetAllTypes).toHaveBeenCalled();
    expect(spySetAll).toHaveBeenCalledWith(types);
    expect(spyGetPokemonsByType).toHaveBeenCalledTimes(3);
    expect(spySetPokemonsByType.mock.calls[0][0]).toBe(types[0]);
    expect(spySetPokemonsByType.mock.calls[0][1]).toBe(pokemons1);
    expect(spySetPokemonsByType.mock.calls[1][0]).toBe(types[2]);
    expect(spySetPokemonsByType.mock.calls[1][1]).toBe(pokemons3);
    expect(spyReplaceTranslation.mock.calls[0][0]).toBe(types[0]);
    expect(spyReplaceTranslation.mock.calls[0][1]).toBe(types[0]);
    expect(spyReplaceTranslation.mock.calls[1][0]).toBe(types[2]);
    expect(spyReplaceTranslation.mock.calls[1][1]).toBe(types[2]);
    expect(spyRemove).toHaveBeenCalledWith(types[1]);
  });
});

describe('getPokemonsSize', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should return the amount of pokemons per type', () => {
    expect(spyGetPokemons).not.toHaveBeenCalled();
    spyGetPokemons.mockReturnValue(['pikachu', 'charmander', 'squirtle']);
    getPokemonsSize();
    expect(spyGetPokemons).toHaveBeenCalled();
  });
});

describe('searchPokemonsByTypes', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should search for several filters when more than one is activated', () => {
    const types = ['grass', 'normal', 'poison'];
    const filters = ['grass', 'poison'];
    const pokemons1 = ['pikachu', 'charmander', 'bulbasaur'];
    const pokemons2 = [];
    const pokemons3 = ['charizard', 'bulbasaur', 'squirtle'];
    spyGetFilters.mockReturnValue(filters);
    spyGetPokemons.mockReturnValue(
      new Map([
        [types[0], pokemons1],
        [types[1], pokemons2],
        [types[2], pokemons3],
      ])
    );
    const results = searchPokemonsByTypes('bul');
    expect(spyGetFilters).toHaveBeenCalledTimes(3);
    expect(spyGetPokemons).toHaveBeenCalledTimes(2);
    expect(results).toStrictEqual(['bulbasaur']);
  });

  it('should search for several filters when more than one is activated', () => {
    const types = ['grass', 'normal', 'poison'];
    const filters = ['grass'];
    const pokemons1 = ['pikachu', 'charmander', 'bulbasaur'];
    const pokemons2 = [];
    const pokemons3 = ['charizard', 'jigglypuff', 'squirtle'];
    spyGetFilters.mockReturnValue(filters);
    spyGetPokemons.mockReturnValue(
      new Map([
        [types[0], pokemons1],
        [types[1], pokemons2],
        [types[2], pokemons3],
      ])
    );
    const results = searchPokemonsByTypes('pik');
    expect(spyGetFilters).toHaveBeenCalledTimes(2);
    expect(spyGetPokemons).toHaveBeenCalledTimes(1);
    expect(results).toStrictEqual(['pikachu']);
  });
});

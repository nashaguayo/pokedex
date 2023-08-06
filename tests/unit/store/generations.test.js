import {
  toggleFilter,
  clearFilters,
  getAll,
  getPokemonsSize,
  searchPokemonsByGeneration,
  thereIsAFilterActive,
} from '@/store/mutations/generations';
import generations from '@/store/state/generations';
import * as generationsApi from '@/api/generations';

jest.mock('@/store/state/generations', () => ({
  setFilter: jest.fn(),
  getFilter: jest.fn(),
  setAll: jest.fn(),
  getPokemons: jest.fn(),
  setPokemons: jest.fn(),
  getAll: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('@/api/generations', () => ({
  getAllGenerations: jest.fn(),
  getPokemonsByGeneration: jest.fn(),
}));

const spySetFilter = jest.spyOn(generations, 'setFilter');
const spyGetFilter = jest.spyOn(generations, 'getFilter');
const spySetAll = jest.spyOn(generations, 'setAll');
const spyGetPokemons = jest.spyOn(generations, 'getPokemons');
const spySetPokemons = jest.spyOn(generations, 'setPokemons');
const spyGetAll = jest.spyOn(generations, 'getAll');
const spyRemove = jest.spyOn(generations, 'remove');

const spyGetAllGenerations = jest.spyOn(generationsApi, 'getAllGenerations');
const spyGetPokemonsByGeneration = jest.spyOn(
  generationsApi,
  'getPokemonsByGeneration'
);

describe('toggleFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should toggle the generation filter in the store', async () => {
    const generation = 'ii';
    spyGetFilter.mockReturnValueOnce('i');
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(generation);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith(generation);
  });

  it('should remove filter when toggle is already active', async () => {
    const generation = 'i';
    spyGetFilter.mockReturnValueOnce(generation);
    expect(spyGetFilter).not.toHaveBeenCalled();
    expect(spySetFilter).not.toHaveBeenCalled();
    toggleFilter(generation);
    expect(spyGetFilter).toHaveBeenCalled();
    expect(spySetFilter).toHaveBeenCalledWith('');
  });
});

describe('clearFilters', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should clear filters in store', () => {
    expect(spySetFilter).not.toHaveBeenCalled();
    clearFilters();
    expect(spySetFilter).toHaveBeenCalledWith('');
  });
});

describe('getAll', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get all pokemons per generation', async () => {
    const generations = ['i', 'ii', 'iii'];
    const pokemons1 = ['pikachu', 'charmander', 'squirtle'];
    const pokemons2 = [];
    const pokemons3 = ['bulbasaur', 'meteorite', 'pichu'];
    spyGetAllGenerations.mockResolvedValue(generations);
    spyGetAll.mockReturnValue(generations);
    spyGetPokemonsByGeneration
      .mockResolvedValueOnce(pokemons1)
      .mockResolvedValueOnce(pokemons2)
      .mockResolvedValueOnce(pokemons3);
    await getAll();
    expect(spyGetAllGenerations).toHaveBeenCalled();
    expect(spySetAll).toHaveBeenCalled();
    expect(spySetPokemons).toHaveBeenCalledTimes(2);

    expect(spySetPokemons.mock.calls[0][0]).toBe(generations[0]);
    expect(spySetPokemons.mock.calls[0][1]).toBe(pokemons1);
    expect(spySetPokemons.mock.calls[1][0]).toBe(generations[2]);
    expect(spySetPokemons.mock.calls[1][1]).toBe(pokemons3);
    expect(spyGetPokemonsByGeneration).toHaveBeenCalledTimes(
      generations.length
    );
    expect(spyRemove).toHaveBeenCalledWith('ii');
  });
});

describe('getPokemonsSize', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should get all pokemons by generation size', () => {
    const pokemonsByGeneration = new Map([
      ['i', ['pikachu', 'squirtle'], ['ii', ['charmander', 'bulbasaur']]],
    ]);
    spyGetPokemons.mockReturnValue(pokemonsByGeneration);
    const result = getPokemonsSize();
    expect(result).toBe(pokemonsByGeneration.size);
  });

  it('should get all pokemons by generation size when its zero', () => {
    const pokemonsByGeneration = new Map();
    spyGetPokemons.mockReturnValue(pokemonsByGeneration);
    const result = getPokemonsSize();
    expect(result).toBe(pokemonsByGeneration.size);
  });

  it('should return the right pokemons for the right generation', () => {
    const pokemonsByGeneration = new Map([
      ['ii', ['pikachu', 'squirtle'], ['i', ['charmander', 'bulbasaur']]],
    ]);
    const filter = 'ii';
    spyGetPokemons.mockReturnValue(pokemonsByGeneration);
    spyGetFilter.mockReturnValue(filter);
    const result = searchPokemonsByGeneration('pik');
    expect(result).toStrictEqual(['pikachu']);
  });

  it('should return empty string when it cant find any pokemons', () => {
    const pokemonsByGeneration = new Map([
      ['ii', ['pikachu', 'squirtle'], ['i', ['charmander', 'bulbasaur']]],
    ]);
    const filter = 'ii';
    spyGetPokemons.mockReturnValue(pokemonsByGeneration);
    spyGetFilter.mockReturnValue(filter);
    const result = searchPokemonsByGeneration('asd');
    expect(result).toStrictEqual([]);
  });
});

describe('thereIsAFilterActive', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should tell you if there is an active generation filter', () => {
    spyGetFilter.mockReturnValueOnce('').mockReturnValueOnce('i');
    expect(thereIsAFilterActive()).toBeFalsy();
    expect(thereIsAFilterActive()).toBeTruthy();
    expect(spyGetFilter).toHaveBeenCalledTimes(2);
  });
});
